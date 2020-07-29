const express = require ('express')
const Vendedor = require ('../db/schemas/vendedor')

const vendedorRouter = express.Router()

vendedorRouter.get('/', async (request, response)=>{
   let vendedor = await Vendedor.find()
   
   if(vendedor.length > 0){
    response.status(200).json({message: 'acessou'})
   }
   else{
       response.status(404).json({message: 'not found'})
   }
})

vendedorRouter.get('/:username', async (request, response)=>{
    let username = request.params.username
    let vendedor = await Vendedor.findOne({'user.username': username})

    if(vendedor.length >0){
        response.status(200).json(vendedor)
    
    }else{
        response.status(404).json({message: 'usuario não encontrado'})
    }
})

vendedorRouter.post('/', async(request, response)=>{
    const vendedorBody = request.body
    if(vendedorBody != undefined && vendedorBody != null){
        const vendedor = new Vendedor(vendedorBody)
        vendedor.save()
        .then(()=>{
            response.status(200).json(vendedor)
        })
        .catch(error => {
            response.status(500).json({message: error.message})
        })
    }
    response.status(400).json({message: 'Dados Incorretos'})
})

vendedorRouter.put('/', async(request, response)=>{
    const vendedorBody = request.body
    const id = request.params.id
    if(vendedorBody != null && vendedorBody != undefined && Object.keys(vendedorBody).length > 0){
        let documentUpdate = await Vendedor.updateOne({_id: id}, vendedorBody)
        
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

vendedorRouter.delete('/:id', async (request, response)=>{
    const id = request.params.id
    let documentDeleted = await Vendedor.deleteOne({_id: id})

    if(documentDeleted.deletedCount >0){
        response.status(200).json({message: 'documento deletado'})

    }else {
        response.status(500).json({message: 'não foi possivel deletar.'})
    }
})

module.exports = vendedorRouter