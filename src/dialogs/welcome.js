const database = require('../Core/database/index.js')

class Welcome
{
    async execute(message) {
        const option = parseInt(message.body);
        console.log({option})
        switch(option){

            // Horas Extras
            case 1: {
                //await database.table('pda_tb_interacao').update({ dialogo: 'Menus' }).where({ numeroTelefone: message.from });
                await message.reply('Selecione uma das opções:\n\n*1* - Cadastrar hora extra.\n*2* - excluir hora extra.\n*3* - editar hora extra\n*4* - Voltar ao menu anterior.\n*0* - Encerrar atendimento.');
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

            // Encerrar atendimento
            case 0: {
                await database('pda_tb_interacao').where('numeroTelefone',message.from).delete();
                break;
            }
        }
    }
}
exports.default = new Welcome();