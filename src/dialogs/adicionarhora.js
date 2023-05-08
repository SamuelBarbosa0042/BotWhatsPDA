const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')

class adicionarhora
{
    async execute(message) {
        //tratar o adicionamento de ponto
        if(message.body == '0'){
            await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
            return
        }
        
        let extra = message.body.split('*') //Comentario*Quantidade de horas*Chamado*[opcional:data] 
        
        if(extra.length < 4 ){ //incluindo sem a data
            var Hoje = new Date().toLocaleDateString('pt-BR')
            extra.push(Hoje)
        }


        if(extra.length == 4){
            await database('pda_tb_hora').insert({comentario:extra[0]
                                                 ,quantidade_horas:extra[1]
                                                 ,chamado:extra[2]
                                                 ,data:extra[3]
                                                 ,numeroTelefone:message.from}) //inserir: quantidade de horas//comentario//telefone//nome//data
        }


        await message.reply('horas armazenadas!')

        await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
        return
    }
}
exports.default = new adicionarhora()   