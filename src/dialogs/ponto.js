const database = require('../Core/database/index.js')

class ponto
{
    async execute(message) {
        const option = parseInt(message.body);
        console.log({option})
        switch(option){

            // adicionar hora
            case 1: {
                await database.table('pda_tb_interacao').update({ dialogo: 'adicionarhora' }).where({ numeroTelefone: message.from });
                await message.reply('responda no formato x');
                //direcionar para dialogo de criação de ponto
                

                break;
            }
            
            // excluir
            case 2: {
                break;
            }

            // editar
            case 3: {
                break;
            }

            // Encerrar atendimento
            case 0: {
                await database('pda_tb_interacao').where('numeroTelefone',message.from).delete();
                await message.reply('Sessão encerrada')
                break;
            }
            default : {

            }
        }
    }
}
exports.default = new ponto();