const database = require('../Core/database/index.js')
const template = require('./templates.js')


class ponto
{
    async execute(message) {
        const option = parseInt(message.body);
        
        switch(option){

            // adicionar hora
            case 1: {
                await database.table('pda_tb_interacao').update({ dialogo: 'adicionarhora' }).where({ numeroTelefone: message.from });
                await message.reply(template.ponto());
                
                console.log(template.ponto())    

                break;
            }
            
            // excluir
            case 2: {
                await database.table('pda_tb_interacao').update({dialogo : 'excluirhora'}).where({numeroTelefone : message.from});
                await message.reply(template.excluir())
                break;
            }

            // ver as horas extras
            case 3: {
                await database.table('pda_tb_interacao').update({ dialogo: 'verhoras' }).where({ numeroTelefone: message.from });
                await message.reply('aperta uma tecla ai:')
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