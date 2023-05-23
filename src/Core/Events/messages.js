const { client } = require('../wweb/Libwts');
const database = require('../database')
const  template = require('../../dialogs/templates')
const { relatorio } = require('../../dialogs/relatorio')
const ExcelJS = require('exceljs');
const { MessageMedia, MessageAck } = require('whatsapp-web.js');
const {enviaEmail} = require('../Events/app');




client.on('message', async (message) => {

    //client.sendMessage('5511982645275@c.us', "I'm alive");
    if (message.isGroupMsg) return;
    const user = await database('pda_tb_usuario')
                        .select('*')
                        .where({numero: message.from})
    
    if (!user.length) {
        
        
        if(message.body == '/cadastrar' ){
            const valida = await database('pda_tb_interacao').select('DataInicio','dialogo').first().where('numeroTelefone',message.from).orderBy('DataInicio','desc')
            if(!valida){
                await database('pda_tb_interacao').insert({'numeroTelefone':message.from,'dialogo':'cadastros','DataInicio':new Date()})
               
            }    
            

            const { default: { execute } } = require(`../../dialogs/cadastros`);
            execute(message);
            
            return
        }


        return

    }

    if(message.body == '/apagarcadastro'){ ///attcadastro email@email.com head
        
        const cad = new cadastro

        await database('pda_tb_usuario').delete().where({numero:message.from})
        await database('pda_tb_interacao').delete().where({numeroTelefone:message.from})

        return
        
    }
    

    if(message.body == '/help'){
        
        const { default: { execute } } = require(`../../dialogs/help`);
        execute(message);

        return 
    }

    if(message.body == '/relatorio'){
        
        const { default: { execute } } = require(`../../dialogs/relatorio`);
        const nomeArquivo = await execute(message);
        
        const media = MessageMedia.fromFilePath(nomeArquivo.path);
        console.log(media)


        message.reply(media)
        return 
    }


    if(message.body == '/enviarelatorio'){
        const { default: { execute } } = require(`../../dialogs/relatorio`);
        const nomeArquivo = await execute(message); 
        const sendmail = new enviaEmail() 
        const templates = new template()
        let usuario = await database('pda_tb_usuario').select('*').where({numero:message.from})
        let mes = await database('pda_tb_horas').select('*').where({numero:message.from})



        const assunto = templates.assunto(usuario.nome,'agosto' )


        sendmail.sendMail('sbarbosa@pdasolucoes.com.br',usuario.emailHead,assunto, nomeArquivo)
        
        return
    }



    if(message.body == '/perfil'){
        const perfil = await database('pda_tb_usuario').select('usuario','numero','email').where({numero:message.from})
        
        await message.reply(template.perfil(perfil))

        return 
    }

    const valida = await database('pda_tb_interacao').select('DataInicio','dialogo').first().where('numeroTelefone',message.from).orderBy('DataInicio','desc')

    if(!valida){
        const menus = await database('pda_tb_menu').select('Codigo_Menu', 'Menu')
        await database('pda_tb_interacao').insert({'numeroTelefone':message.from,'dialogo':'welcome','DataInicio':new Date()})
        console.log(menus)
        await message.reply(template.menu(menus))
        console.log('novo dialogo')
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

        return
    }    

    const { default: { execute } } = require(`../../dialogs/${valida.dialogo}`);
    execute(message);

});


