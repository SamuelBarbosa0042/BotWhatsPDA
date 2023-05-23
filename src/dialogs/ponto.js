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

                break;
            }

            // excluir
            case 2: {

                const horas = await database('pda_tb_hora').select('codigo_hora','quantidade_horas','data','comentario').where({numeroTelefone:message.from})

                console.log(horas)

                horas.forEach((hora => message.reply(` codigo : ${hora.codigo_hora}\nHora : ${hora.quantidade_horas}\nData : ${hora.data}\ncomentario : ${hora.comentario}`)))


                await database.table('pda_tb_interacao').update({ dialogo: 'excluirhora' }).where({ numeroTelefone: message.from });
                await message.reply(template.excluir())
                break;
            }

            // ver as horas extras
            case 3: {
                //recebe relatório pelo whats
                
                const { default: { execute } } = require(`./relatorio`);
                const nomeArquivo = await execute(message,false,false);
                
                const media = MessageMedia.fromFilePath(nomeArquivo.path);
                
                await message.reply(media)
                

                break;
            }
            case 4:{
                //enviar relatorio por e-mail
                const { default: { execute } } = require(`./relatorio`);
                const nomeArquivo = await execute(message,false,false);
                
                const sendmail = new enviaEmail()
                

                let usuario = await database('pda_tb_usuario').select('*').where({numero:message.from}).first()
                let mes = await database('pda_tb_hora').select('data').where({numeroTelefone:message.from}).first().orderBy('data','desc')
                
                let hora = await database('pda_tb_hora').sum({total:'quantidade_horas'}).where({numeroTelefone:message.from}).where({checkHead:false}).where({checkFinanceiro:false})
                
                
               let month = String(mes.data).split('/')

               let data = new Date(month[2],month[1],month[0])
                
               //await database('pda_tb_horas').update({checkHead:true}).where({numeroTelefone:message.from})

                let assunto = template.assunto(usuario.usuario, data.toLocaleString([],{month:'long'}))
                let corpo = template.body(hora[0].total,usuario.usuario)
                // //envia e-mail pro HEAD da area
                if(usuario.emailHead != null){
                    sendmail.enviaIsso('sbarbosa@pdasolucoes.com.br',usuario.emailHead,assunto, nomeArquivo,corpo)
                    //database('pda_tb_horas').update({check:'s'}).where({numero:usuario.numero})
                }
                else{
                    sendmail.enviaIsso('sbarbosa@pdasolucoes.com.br',usuario.email,assunto, nomeArquivo,corpo)
                }

                break;
            }
            case 5: {
                //voltar


                const { default: { execute } } = require(`./relatorio`);
                const nomeArquivo = await execute(message,true,false);
                
                const sendmail = new enviaEmail()

                //envia relatório pro financeiro com for, todos os funcionários
                //UPDATE CHECKFINANCEIRO DAS HORAS
                
                if(usuario.emailHead != null){
                    sendmail.enviaIsso('sbarbosa@pdasolucoes.com.br',usuario.emailHead,assunto, nomeArquivo,corpo)
                    //database('pda_tb_horas').update({check:'s'}).where({numero:usuario.numero})
                }
                else{
                    sendmail.enviaIsso('sbarbosa@pdasolucoes.com.br',usuario.email,assunto, nomeArquivo,corpo)
                }


                // update no banco
                break;
            }
            case 6 :{
                // head envia os relatórios pro rodrigo (validar horas)
                // envia pra tela de analise de horas e envio pro rodrigo tela : analiseHoras.js
                // somente enviar o relatório caso seja HEAD
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