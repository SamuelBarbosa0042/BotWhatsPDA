const database = require('../Core/database/index.js')
const template = require('./templates.js')
const { MessageMedia, MessageAck } = require('whatsapp-web.js');
const {enviaEmail} = require('../Core/Events/app.js');
const { relatorio } = require('../dialogs/relatorio.js')


class ponto {
    async execute(message) {
        const option = parseInt(message.body);

        switch (option) {

            // adicionar hora
            case 1: {
                await database.table('pda_tb_interacao').update({ dialogo: 'adicionarhora' }).where({ numeroTelefone: message.from });
                await message.reply(template.ponto());

                console.log(template.ponto())

                break;
            }

            // excluir
            case 2: {
                await database.table('pda_tb_interacao').update({ dialogo: 'excluirhora' }).where({ numeroTelefone: message.from });
                await message.reply(template.excluir())
                break;
            }

            // ver as horas extras
            case 3: {
                //recebe relatório pelo whats
                
                const { default: { execute } } = require(`./relatorio`);
                const nomeArquivo = await execute(message);
                
                const media = MessageMedia.fromFilePath(nomeArquivo.path);
                console.log(media)
//              

                
                await message.reply(media)
                

                break;
            }
            case 4:{
                //enviar relatorio por e-mail
                const { default: { execute } } = require(`./relatorio`);
                const nomeArquivo = await execute(message);
                
                const sendmail = new enviaEmail()
                
                const head = await database('pda_tb_usuario').select('codigo_head').first().whereLike('numero',`%${message.from}%`)

                let emailHead = await database('pda_tb_usuario').select('email').first().whereLike('usuario',`%${head}%`) || await database('pda_tb_usuario').select('email').first().whereLike('numero',`%${message.from}%`)



                //envia e-mail pro HEAD da area

                sendmail.enviaIsso('sbarbosa@pdasolucoes.com.br',emailHead,'assunto', nomeArquivo)

                //sendmail.sendMail('sbarbosa@pdasolucoes.com.br','sbarbosa@pdasolucoes.com.br','assunto', nomeArquivo)

                break;
            }
            case 5: {
                //voltar
                // update no banco
                break;
            }

            // Encerrar atendimento
            case 0: {
                await database('pda_tb_interacao').where('numeroTelefone', message.from).delete();
                await message.reply('Sessão encerrada')
                break;
            }
            default: {

            }
        }
    }
}
exports.default = new ponto();