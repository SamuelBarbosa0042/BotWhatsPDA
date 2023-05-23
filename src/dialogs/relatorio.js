const database = require('../Core/database/index.js')
const { MessageMedia} = require('whatsapp-web.js')
const Exceljs = require('exceljs')
const path = require('path')

class relatorio
{
    async execute(message,head,financeiro) {
        const remetente = message.from

        const workbook = new Exceljs.Workbook();

        let relatorio = await database('pda_tb_hora')
                                .join('pda_tb_usuario','pda_tb_hora.numeroTelefone','=','pda_tb_usuario.numero')
                                .select('pda_tb_usuario.usuario','chamado','quantidade_horas','comentario','data')
                                .where({numeroTelefone:remetente}).andWhere({checkHead:head}).andWhere({checkFinanceiro:financeiro})
                                .orderBy('data','asc')

                                
        

        const sheet = workbook.addWorksheet('relatorio');
        sheet.columns = [
            {header:'Data',key:'data',width:15,bold:true},
            {header:'Nome', key :'Nome',width:15,bold:true},
            {header:'chamado', key :'chamado',width:12,bold:true},
            {header:'horas', key :'horas',width:5,bold:true},
            {header:'comentario', key :'comentario',width:30,bold:true}
        ]
        
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
        
        const nomeArquivo = `Relatorio_horas_${message.timestamp}.xlsx`
        await workbook.xlsx.writeFile(path.resolve(__dirname,'../../arquivos',nomeArquivo))


        
        
        return {name:nomeArquivo,path:path.resolve(__dirname,'../../arquivos',nomeArquivo)}


    }

}
//module.exports = {relatorio}
exports.default = new relatorio();
