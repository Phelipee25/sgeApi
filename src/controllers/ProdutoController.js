const express = require ('express')
const Produto = require ('../db/schemas/produto')

const produtoRouter = express.Router()

produtoRouter.get('/', async (request, response)=>{
   let produto = await Produto.find()
   
   if(produto.length > 0){
    response.status(200).json({message: 'acessou'})
   }
   else{
       response.status(404).json({message: 'not found'})
   }
})

produtoRouter.get('/:username', async (request, response)=>{
    let username = request.params.username
    let produto = await Produto.findOne({'user.username': username})

    if(produto.length >0){
        response.status(200).json(produto)
    
    }else{
        response.status(404).json({message: 'usuario não encontrado'})
    }
})

produtoRouter.post('/', async(request, response)=>{
    const produtoBody = request.body
    if(produtoBody != undefined && produtoBody != null){
        const produto = new Produto(produtoBody)
        produto.save()
        .then(()=>{
            response.status(200).json(produto)
        })
        .catch(error => {
            response.status(500).json({message: error.message})
        })
    }
    response.status(400).json({message: 'Dados Incorretos'})
})

produtoRouter.put('/', async(request, response)=>{
    const produtoBody = request.body
    const id = request.params.id
    if(produtoBody != null && produtoBody != undefined && Object.keys(produtoBody).length > 0){
        let documentUpdate = await Produto.updateOne({_id: id}, produtoBody)
        
        if(documentUpdate.nModified > 0){
            response.status(200).json({message: 'documento atualizado com sucesso'})
        }
        else{
            response.status(400).json({message: 'não foi possivel atualizar'})
        }
    }else{
        response.status(400).json({message: 'faltou o body'})
    }
})

produtoRouter.delete('/:id', async (request, response)=>{
    const id = request.params.id
    let documentDeleted = await Produto.deleteOne({_id: id})

    if(documentDeleted.deletedCount >0){
        response.status(200).json({message: 'documento deletado'})

    }else {
        response.status(500).json({message: 'não foi possivel deletar.'})
    }
})

module.exports = produtoRouter