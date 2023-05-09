const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')

class verhoras
{
    async execute(message) {
        //mostrar todas as horas separadas por datas
        if(message.body == '0'){
            await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
            return
        }


        const teste = await database('pda_tb_hora').select('*').where({numeroTelefone:message.from})
        let quantidade_hora = 0;

        for(let i = 0; i < teste.length;i++){
            message.reply(`${teste[i].codigo_hora}\n\nchamado :${teste[i].chamado}\nData : ${teste[i].data}\nQuantidade de horas : ${teste[i].quantidade_horas}\nComentario :${teste[i].comentario}`);
            quantidade_hora += teste[i].quantidade_horas
        }   
        
        await message.reply(`Quantidade total de hora : ${quantidade_hora}`)

        await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
    }
}
exports.default = new verhoras()   