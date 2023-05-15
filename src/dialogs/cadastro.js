const template = require('./templates')
const database = require('../../src/Core/database')
const { MessageMedia, MessageAck } = require('whatsapp-web.js');
const {enviaEmail} = require('../../src/Core/Events/app');



class cadastro {
    
    async verificaConta(mensagem, user){

    }
    async criaConta(message){

        let cadastro = ['E-mail','HEAD? digite HEAD se sim, se não, digite o nome']
        let resposta = []

        for(let i = 0; i< cadastro.length;i++){
            message.reply(cadastro[i])

            resposta[i] = message.body

        }
        
        if(resposta[2] == HEAD) resposta[2] = null
        
        await database('pda_tb_usuario')
             .insert({ usuario: message._data.notifyName, numero: message.from, email:resposta[1], codigo_HEAD:resposta[2] })


    }
    async atualizaConta(message){
        let atualiza = ['e-mail','conta']
        let respostas = message.body.split('_') // /cadastrar_email@email.com_vinicius pereira

        for(let j = 0; j < atualiza.length;j++){
            message.reply(atualiza[j])
            console.log(atualiza[j])

            respostas[j] = message.body
        }


        await database('pda_tb_usuario').where('numero','=',message.from).update({email:respostas[1]})
    }
    
    
    
    // if (!user.length) {
        
        
    //     if(mensagem.length == 3 && mensagem[0] == '/cadastrar' ){
            
    //         let head = null
    //         if(mensagem[3].toUpperCase() == 'HEAD'){
    //             head = await database('pda_tb_usuario').select('codigo_usuario').first().wherelike('usuario',`%${mensagem[3]}%`)
    //         }
            
    //         await database('pda_tb_usuario').insert({ usuario: message._data.notifyName, numero: message.from, email:mensagem[1], codigo_HEAD:codigo_head })
    //         await client.sendMessage(message.from, 'Usuario cadastrado com sucesso')
    //         return
    //     }
    
        
    //     return
    
    // }
    
    // if(user.length && user.email != mensagem[1] && mensagem[0] == '/cadastrar'){
    //     console.log(user.length)
    //     await database('pda_tb_usuario').where('numero','=',message.from).update({email:mensagem[1]})
    //     return message.reply('cadastro atualizado!')
    
    // }
}
module.exports = {cadastro}

