class template{
    static menu(opcoes){
        return `Olá, eu sou \`\`\`Manuel\`\`\`, por favor selecione \n\n${opcoes.map(opcao => `*${opcao.Codigo_Menu}* - ${opcao.Menu}\n`)}`
    }
}


module.exports = template