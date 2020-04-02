const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes')

//Initiliaztions
const app = express()
app.use(cors())
app.use(express.json())

//Routers
app.use(routes)

//Celebrate Erros
app.use(errors())

//Run Server
//app.listen(3333, () => {
    //console.log('Servidor Rodando')
//})

module.exports = app;
