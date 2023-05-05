// const dotenv = require('dotenv')

const libwts = require('./Core/wweb/Libwts.js')
require('./Core/Events/client.js')

//console.log(process.env)

// const { default:welcome} = require('./dialogs/welcome.js')


// welcome.execute("","")

const Inicializador = 
async () => {
    console.log('start')
    await libwts.client.initialize();
    console.log('end')
    }
 
Inicializador()    


