const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usuario: {
        email: {
            type: String,
            required: true
        },
        password: String
    }
})

const Cliente = mongoose.model('Cliente', clienteSchema)

module.exports = Cliente