const express = require ('express')
const Cliente = require ('../db/schemas/cliente')

const clienteRouter = express.Router()

clienteRouter.get('/', async (request, response)=>{
   let cliente = await Cliente.find()
   
   if(cliente.length > 0){
    response.status(200).json({message: 'acessou'})
   }
   else{
       response.status(404).json({message: 'not found'})
   }
})

clienteRouter.get('/:username', async (request, response)=>{
    let username = request.params.username
    let cliente = await Cliente.findOne({'user.username': username})

    if(cliente.length >0){
        response.status(200).json(cliente)
    
    }else{
        response.status(404).json({message: 'usuario não encontrado'})
    }
})

clienteRouter.post('/', async(request, response)=>{
    const clienteBody = request.body
    if(clienteBody != undefined && clienteBody != null){
        const cliente = new Cliente(clienteBody)
        cliente.save()
        .then(()=>{
            response.status(200).json(cliente)
        })
        .catch(error => {
            response.status(500).json({message: error.message})
        })
    }
    response.status(400).json({message: 'Dados Incorretos'})
})

clienteRouter.put('/', async(request, response)=>{
    const clienteBody = request.body
    const id = request.params.id
    if(clienteBody != null && clienteBody != undefined && Object.keys(clienteBody).length > 0){
        let documentUpdate = await Cliente.updateOne({_id: id}, clienteBody)
        
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

clienteRouter.delete('/:id', async (request, response)=>{
    const id = request.params.id
    let documentDeleted = await Cliente.deleteOne({_id: id})

    if(documentDeleted.deletedCount >0){
        response.status(200).json({message: 'documento deletado'})

    }else {
        response.status(500).json({message: 'não foi possivel deletar.'})
    }
})

module.exports = clienteRouter