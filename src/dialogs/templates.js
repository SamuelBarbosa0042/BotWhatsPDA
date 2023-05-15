class template{
    static menu(opcoes){
        return `Olá, eu sou \`\`\`Manuel\`\`\`, por favor selecione \n\n${opcoes.map(opcao => `*${opcao.Codigo_Menu}* - ${opcao.Menu}\n`)}`
    }
    static ponto(){
        return 'insire no formato, separando por asteriscos *\n\n  comentario*quantidade_de_horas*numero_chamado(card)*data(DD/MM/YYYY)\n\n exemplo : \n\ncomentario*2*3333*0805/2023'
    }
    static excluir(){
        return 'Informe qual hora você deseja excluir'
    }
    static help(){

    }
    static perfil(perfil){
        console.log('entra aqui')
        return `${perfil.map(perfil => ` Usuario: *${perfil.usuario}*\n\nNumero *${perfil.numero}*\n\nE-mail : ${perfil.email}`)}`
    }
    static assunto(assunto){
        return
    }
    static body(body){
        return
    }
}


module.exports = template