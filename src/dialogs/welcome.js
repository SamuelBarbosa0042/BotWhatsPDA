const database = require('../Core/database/index.js')
const template = require('./templates.js')

class Welcome
{
    async execute(message) {
        const option = parseInt(message.body);
        switch(option){

            // Horas Extras
            case 1: {
                await database.table('pda_tb_interacao').update({ dialogo: 'ponto' }).where({ numeroTelefone: message.from });
                await message.reply(template.welcome());
                    
                break;
            }
            
            // Nota PJ
            case 2: {
                break;
            }

            // Comercial
            case 3: {
                break;
            }
            case 4: {
                await database.table('pda_tb_interacao').update({ dialogo: 'welcome' }).where({ numeroTelefone: message.from });
                await message.reply('Retornando...')
            }

            // Encerrar atendimento
            case 0: {
                await database('pda_tb_interacao').where('numeroTelefone',message.from).delete();
                await message.reply('Sessão encerrada')
                break;
            }
        }
    }
}
exports.default = new Welcome();