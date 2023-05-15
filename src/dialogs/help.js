const database = require('../Core/database/index.js')
const { MessageMedia} = require('whatsapp-web.js')
const Exceljs = require('exceljs')
const template = require('../dialogs/templates.js')

class help
{
    async execute(message) {
        const comandos = '*/cadastrar* => Cadastra esse numero junto no banco de dados para utilizar o Bot'+
                         ' usar /cadastrar e-mail'+
                         '\n\n/relatorio Recebe o relatorio das horas extras' + 
                         '\n\n/enviarelatorio envia o relatório do mês para rodrigo'
        message.reply(comandos)
        
    }

}
exports.default = new help();
