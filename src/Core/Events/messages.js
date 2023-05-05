const { client } = require('../wweb/Libwts');
const database = require('../database')
const template = require('../../dialogs/templates')



client.on('message', async (message) => {

    //client.sendMessage('5511982645275@c.us', "I'm alive");
    if (message.isGroupMsg) return;
    const user = await database('pda_tb_usuario').select('*').where({
        numero: message.from
    })
    
    if (!user.length) {
        if (message.body == '/cadastrar') {
            await database('pda_tb_usuario').insert({ usuario: message._data.notifyName, numero: message.from })
            await client.sendMessage(message.from, 'Usuario cadastrado com sucesso')
            return
        }

        return
    }
    const valida = await database('pda_tb_interacao').select('DataInicio','dialogo').first().where('numeroTelefone',message.from).orderBy('DataInicio','desc')

    const hoje = new Date()


    
    if(!valida){
        const menus = await database('pda_tb_menu').select('Codigo_Menu', 'Menu')
        await database('pda_tb_interacao').insert({'numeroTelefone':message.from,'dialogo':'welcome','DataInicio':new Date()})
        await message.reply(template.menu(menus))
        return
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      } 
      
      const now = new Date();
      const tomorrow = addDays(valida.DataInicio,1);
      console.log({now,tomorrow,valid: now < tomorrow })

    if(tomorrow < now){
        await database('pda_tb_interacao').where('numeroTelefone',message.from).delete()
        await client.sendMessage(message.from,'Sessão expirada, tente novamente!')
    }    

        
    console.log(valida.DataInicio)

    const { default: { execute } } = require(`../../dialogs/${valida.dialogo}`);
    execute(message);

});


