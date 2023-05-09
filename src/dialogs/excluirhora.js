const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')

class excluirhora
{   
    async execute(message) {
        //mostrar todas as horas separadas por datas
        if(message.body == '0'){
            await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
            return
        }
        //excluir a hora desejada usando o ID
        let i = message.body
        let excluir = database.table('pda_tb_hora').select('codigo_hora').where({codigo_hora : message.body, numeroTelefone : message.from})
        if(excluir.length > 0){
            
            await database.table('pda_tb_hora').where({codigo_hora : message.body, numeroTelefone : message.from}).delete()    // apaga a hora
            
            await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from }); // volta pro perfil anterior
        }

    }
}
exports.default = new excluirhora()   