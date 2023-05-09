const database = require('../Core/database/index.js')
const { MessageMedia} = require('whatsapp-web.js')
const exceljs = require('exceljs')

class relatorio
{
    async execute(message) {
        const remetente = message.from

        let relatorio = await database('pda_tb_hora').select('*').where({numeroTelefone:numero})

        const sheet = workbook.addWorksheet('relatorio');
        sheet.columns = [
            {header:'numeroTelefone', key :'numeroTelefone',width:10},
            {header:'chamado', key :'chamado',width:10},
            {header:'horas', key :'horas',width:10},
            {header:'comentario', key :'comentario',width:10}
        ]

        for(let i = 0;i<relatorio.length;i++){
            row = sheet.addRow = [
                relatorio[i].numeroTelefone,
                relatorio[i].chamado,
                relatorio[i].quantidade_horas,
                relatorio[i].Comentario
            ]
        }

        const workbook = new ExcelJS.Workbook();

        return workbook;        
        
        message.sendMessage(message.from,relatorio)

    }

}
exports.default = new relatorio();
// exports.geraRelatorio = new relatorio.geraRelatorio();
//module.exports = { relatorio  }