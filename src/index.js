// const dotenv = require('dotenv')

const libwts = require('./Core/wweb/Libwts.js')
require('./Core/Events/client.js')
require('./Core/Events/messages.js')


//console.log(process.env)

// const { default:welcome} = require('./dialogs/welcome.js')


// welcome.execute("","")

const Inicializador = 
async () => {
    await libwts.client.initialize();
 
    }
 
Inicializador()    


