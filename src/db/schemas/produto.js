const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    TipoProduto: {
        type: String,
        required: true
    }
})

const Produto = mongoose.model('Produto', produtoSchema)

module.exports = Produto