const { client } = require('../wweb/Libwts');
const database = require('../database')
const template = require('../../dialogs/templates')
const { relatorio } = require('../../dialogs/relatorio')
const ExcelJS = require('exceljs');
const { MessageMedia } = require('whatsapp-web.js');


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

    if(message.body == '/relatorio'){
        //await message.reply('criando relatório')
        
        const remetente = message.from

        const workbook = new ExcelJS.Workbook();

        let relatorio = await database('pda_tb_hora')
                                .join('pda_tb_usuario','pda_tb_hora.numeroTelefone','=','pda_tb_usuario.numero')
                                .select('pda_tb_usuario.usuario','chamado','quantidade_horas','comentario','data')
                                .where({numeroTelefone:remetente})
                                .orderBy('data','asc')
                                  
        const sheet = workbook.addWorksheet('relatorio');
        sheet.columns = [
            {header:'Data',key:'data',width:15},
            {header:'Nome', key :'Nome',width:15},
            {header:'chamado', key :'chamado',width:12},
            {header:'horas', key :'horas',width:5},
            {header:'comentario', key :'comentario',width:30}
        ]
        //console.log(relatorio.length)
        for(let i = 0;i<relatorio.length;i++){
            const row  = [
                relatorio[i].data,
                relatorio[i].usuario,
                relatorio[i].chamado,
                relatorio[i].quantidade_horas,
                relatorio[i].comentario
            ]
            sheet.addRow(row)
        }

        await workbook.xlsx.writeFile(`c:/Estudos/Relatorio_horas_${message.from}_${message.timestamp}.xlsx`)

        const media = MessageMedia.fromFilePath(`c:/Estudos/Relatorio_horas_${message.from}_${message.timestamp}.xlsx`);

        message.reply(media);


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

    if(tomorrow < now){
        await database('pda_tb_interacao').where('numeroTelefone',message.from).delete()
        await client.sendMessage(message.from,'Sessão expirada, tente novamente!')
    }    

        
    const { default: { execute } } = require(`../../dialogs/${valida.dialogo}`);
    execute(message);

});


