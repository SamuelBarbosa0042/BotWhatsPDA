const { MessageAck } = require('whatsapp-web.js')
const database = require('../Core/database/index.js')

class ponto
{
    async execute(message) {
        //tratar o adicionamento de ponto
        let string = message.body.split(' ')
        
        await message.reply('viu como ta funcionando!')
        return
    }
}