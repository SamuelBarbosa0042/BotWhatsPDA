const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')
const {cadastro} = require('../../src/functions/cadastro.js')

class cadastro
{
    async execute(message) {
        //tratar o adicionamento de ponto
        const cad = new cadastro
        
        const cadastrado = cad.verificaConta(message) //retorna 1 pra cadastrado, 0 pra não cadastrado
        let email = cad.verificaEmail(message) //retorna 1 pra cadastrado, 0 pra não cadastrado
        let head = cad.verificaHead(message) //retorna 1 pra cadastrado, 0 pra não cadastrado
       
        console.log('teste')

        if(!cadastrado){
            message.reply('informe seu email')
  
            return
        }
        if(cadastrado && !email){
            let email = message.body
            await database('pda_tb_usuario').update({email:email}).where({numero:message.from})

            message.reply('informe o email do seu head ou insira 0 caso voce for o head:')

            return
        }
        if(cadastrado && email && !head){
            //insere gestor ou não
            if(message.body == '0'){
                await database('pda_tb_usuario').update({head:'true'}).where({numero:message.from})
            }
            else{
                await database('pda_tb_usuario').update({email:message.body}).where({numero:message.from})
            }  
            
            return message.reply('Usuario cadastrado com sucesso!!')
        }


        




    }
}
exports.default = new cadastro()   