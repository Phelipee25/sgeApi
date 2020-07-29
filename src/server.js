const express = require ('express')
require ('./db/dbConnect')
const app = express();

app.use(require('./routes'))

app.get('/', ()=>{
    console.log('HEllo World!')
})

app.listen(3000, ()=>{
    console.log('servidor conectado com sucesso!')
})

