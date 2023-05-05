const { client } = require('../wweb/Libwts');
const database = require('../database')





client.on('message', async (message) => {
    
    //client.sendMessage('5511982645275@c.us', "I'm alive");
    const user = await database('pda_tb_usuario').select('*').where({
        numero:message.from        
    })
    const menus = await database('pda_tb_menu').select('Codigo_Menu','Menu')
    if(!user.length){
        await database('pda_tb_usuario').insert({usuario: message._data.notifyName, numero:message.from})
        const menus = await database('pda_tb_menu').select('Codigo_Menu','Menu')
        return
    }
    await message.reply(JSON.stringify(menus))



});


    