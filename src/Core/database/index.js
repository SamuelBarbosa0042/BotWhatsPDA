const knex = require('knex')
const knexfile = require('../../../knexfile')
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.NODE_ENV)

const config = knex(knexfile[process.env.NODE_ENV])



module.exports = config 
