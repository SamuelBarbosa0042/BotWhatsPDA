const template = require('../dialogs/templates')
const database = require('../Core/database')
const { MessageMedia, MessageAck } = require('whatsapp-web.js');
const {enviaEmail} = require('../Core/Events/app');



class cadastro {
    
    async verificaConta(message){
        const usuario = await database('pda_tb_usuario').select('usuario').first().where({numero:message.from})

        console.log(await usuario)
        if(await usuario.length > 0){
            return 0
        }
        else{
            return 1
        }

    }

    async verificaEmail(message){
        const email = await database('pda_tb_usuario').select('email').where({numero:message.from})

        if(await email.email == null){
            return 0
        }
        else{
            return 1
        }
    }
    async verificaHead(message){
        const head = await database('pda_tb_usuario').select('emaiLHEAD').where({numero:message.from})
       
        if(await head.head == null){
            return 0
        }
        else{
            return 1
        }
    }
   
}
module.exports = {cadastro}

