const express = require('express')
const vendedorController = require ('./controllers/VendedorController')
const routes = express.Router();
const clienteController = require ('./controllers/ClienteController');
const produtoController = require('./controllers/ProdutoController')

routes.use('/vendedor', vendedorController)
routes.use('/cliente', clienteController)
routes.use('/produto', produtoController)

module.exports = routes;