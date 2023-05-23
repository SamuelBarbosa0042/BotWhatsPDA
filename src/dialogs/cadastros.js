const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')
const {cadastro} = require('../functions/cadastro.js')

class cadastros
{
    async execute(message) {
        
        const cad = new cadastro
        
        const cadastrado = await database('pda_tb_usuario').select('*').first().where({numero:message.from})


        console.log(await cadastrado)   

        if(!cadastrado){
            await database('pda_tb_usuario').insert({usuario:message._data.notifyName,numero:message.from})


            message.reply('informe seu email')

            return
        }
        if( await cadastrado.email == null && await cadastrado.emailHead == null){
            let eMail = message.body
            await database('pda_tb_usuario').update({email:eMail}).where({numero:message.from})

            message.reply('informe o email do seu head ou insira 0 caso voce for o head:')

            return
        }
        if(await cadastrado.email != null && await cadastrado.emailHead == null){
            //insere gestor ou não
            if(message.body == 'head'){
                await database('pda_tb_usuario').update({emailHead:'true'}).where({numero:message.from})
            }
            else{
                await database('pda_tb_usuario').update({emailHead:message.body}).where({numero:message.from})
            }  
            await database('pda_tb_interacao').update({dialogo:'welcome'}).where({numeroTelefone:message.from})
            return message.reply('Usuario cadastrado com sucesso!!')
        }

        


        return

    }
}
exports.default = new cadastros()   