const mongoose = require('mongoose')

const vendedorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usuario: {
        username: String,
        password: String
    }
})

const Vendedor = mongoose.model('Vendedor', vendedorSchema)

module.exports = Vendedor