class template{
    static menu(opcoes){
        console.log(opcoes)
        return `Olá, eu sou \`\`\`Manuel\`\`\`, por favor selecione \n\n${opcoes.map(opcoes => `*${opcoes.Codigo_Menu}* - ${opcoes.Menu}\n`)}`
    }
    static ponto(){
        return 'insira no formato, separando por asteriscos *\n\n  comentario*quantidade_de_horas*numero_chamado(card)*data(DD/MM/YYYY)\n\n exemplo : \n\ncomentario*2*3333*08/05/2023'
    }
    static excluir(){
        return 'Informe qual hora você deseja excluir'
    }
    static help(){

    }
    static perfil(perfil){
        return `${perfil.map(perfil => ` Usuario: *${perfil.usuario}*\n\nNumero *${perfil.numero}*\n\nE-mail : ${perfil.email}`)}`
    }
    static assunto(nome,mes){
        const assunto = `Relatório horas extras ${mes} - ${nome}` // inserir mês
        return assunto
    }
    static body(horas,nome){
        
        let corpo = `<p>Prezados,</p>\n` +
                    `<p>Segue anexo as informações a respeito das horas extras no mes em questão</p>\n`+
                    `<p>funcionário : ${nome}</p>\n\n`+
                    `<p>Total de horas : ${horas}</p>\n\n\n\n`+
                    `<p>Atenciosamente,\n</p>`+
                    `<p>BotPDA</p>`
                    
        
        return corpo
    }
    static welcome(){
        let welcome = `Selecione uma das opções:\n\n`+
                      `*1* - Cadastrar hora extra.\n`+
                      `*2* - excluir hora extra.\n`+
                      `*3* - ver horas extras\n`+
                      `*4* - enviar horas extras ao HEAD.\n`+
                      `*5* - enviar horas aprovadas ao financeiro.`+
                      `*0* - finaliza o atendimento`

        return welcome
    }
}


module.exports = template