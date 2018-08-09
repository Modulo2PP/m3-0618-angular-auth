const express = require('express');
const _ = require('lodash');
const User = require('../models/User');
const Group = require('../models/group');
const Favor = require('../models/favors');
const Debt = require('../models/debt')
const simpleCrud = (Model, extensionFn) => {
    let router  = express.Router();

    // Detect paths from model
    let notUsedPaths = ['_id','updated_at','created_at','__v'];
    let paths = Object.keys(Model.schema.paths).filter(e => !notUsedPaths.includes(e));
    
    if(extensionFn){
        router = extensionFn(router);
    }
    // CRUD: RETRIEVE
    router.get('/',(req,res,next) => {
        Model.find()
            .then( objList => res.status(200).json(objList))
            .catch(e => next(e))
    })


    router.get('/search/:pattern',(req,res,next) => {
        const pattern = req.params.pattern;
        const rg = new RegExp(pattern, 'i')
        User.find({username:rg})
            .then( objList => {
               return  res.status(200).json(objList)
               
            })

            .catch(e => next(e))
    })

    router.get('/mygroups/:id',(req,res,next) => {
        var id = req.params.id
        Group.find({ members: { $in : [id]}})
            .then( objList => {
               return  res.status(200).json(objList)
               
            })

            .catch(e => next(e))
    })

    router.get('/mygroup/:id',(req,res,next) => {
        const id = req.params.id;
        Group.findById(id)
        .populate('favors')
        .populate('members')
            .then( objList => {
               return  res.status(200).json(objList)
            })
            .catch(e => console.log(e))
    })


    router.get('/balanceHaberes/:id/:idUsuario',(req,res,next) => {
        const id = req.params.id;
        const idUsuario = req.params.idUsuario
        Group.findById(id)
        .populate({path:'debts', populate: {path: 'deudor'}})

            .then( objList => {
                var haberes = objList.debts.filter(e => e.acreedor[0] == idUsuario)
                return  res.status(200).json(haberes)
            })
            .catch(e => console.log(e))
    })

    router.get('/balanceDeudas/:id/:idUsuario',(req,res,next) => {
        const id = req.params.id;
        const idUsuario = req.params.idUsuario
        Group.findById(id)
        .populate({path:'debts', populate: {path: 'acreedor'}})
            .then( objList => {
                var deudas = objList.debts.filter(e => e.deudor[0] == idUsuario)
               return  res.status(200).json(deudas)
            })
            .catch(e => console.log(e))
    })
    
    router.get('/getprofile/:id',(req,res,next) => {
        const id = req.params.id
        User.findById(id)
            .then( user => res.status(200).json(user))
            .catch(e => next(e))
    })

/*     router.get('/getgroups/:id',(req,res,next) => {
        const id = req.params.id
        Group.find()
            .then( group => {
                
                console.log(retorno)
                res.status(200).json(retorno)
            })
            .catch(e => next(e))
    }) */
 
    router.get('/getall',(req,res,next) => {
        User.find({})
            .then( user => res.status(200).json(user))
            .catch(e => next(e))
    })


    router.get('/buscarhaberes/:id',(req,res,next) => {
        const id = req.params.id;
        const rg = new RegExp(id, 'i')
        Debts.find({acreedor:rg})
            .then( objList => {
                console.log(objList)
               return  res.status(200).json(objList)
               
            })

            .catch(e => next(e))
    })

    
    


    // CRUD: CREATE
    router.post('/',(req,res,next) => {
        const object = _.pickBy(req.body, (e,k) => paths.includes(k));
        Model.create(object)
            .then( obj => res.status(200).json(obj))
            .catch(e => next(e))
    })
    
    router.post('/group',(req,res,next) => {
        const object = req.body
        Group.create(object)
            .then( obj => res.status(200).json(obj))
            .catch(e => next(e))
    })

    router.post('/favor',(req,res,next) => {
        const object = req.body
        Favor.create(object)
            .then( obj => {
                Group.findByIdAndUpdate(object.groupId, {$push:{favors: obj._id}} )
                .then(group =>{
                    return res.status(200).json(group)
                })
            })
            .catch(e => next(e))
    })

    router.post('/debt',(req,res,next) => {
        const object = req.body
        
        Debt.findOneAndUpdate({acreedor: object.acreedor, deudor: object.deudor},{ $inc: { total: object.total } }, {new:true})
        .then(e =>{
            if(!e){
            console.log("esta intentando entrar en el segundo update")
             Debt.findOneAndUpdate({acreedor: object.deudor, deudor: object.acreedor},{ $inc: { total: -object.total}}, {new:true})
            .then(() =>{
                Debt.findOne({acreedor: object.deudor, deudor: object.acreedor})
                .then(e =>{
                    console.log("intentanndo entrar antes del primer div")
                    if(e){
                        if(e.total < 0){
                        object.total = Math.abs(e["total"])
                        Debt.findByIdAndRemove(e._id)
                        .then(()=>{    
                            Debt.create(object)
                            .then(obj =>{ 
                                Group.findByIdAndUpdate(object.groupId, {$push:{debts: obj._id}}, {new:true})
                                .then(obj =>{
                                    return res.status(200).json(obj)
                                })  
                            })
                        })
                    }else if (e.total == 0){
                        console.log("entra en borrar la deuda cuando es 0")
                        Debt.findByIdAndRemove(e._id)
                    }
                    }else{
                        console.log(object, "antes de crear la nueva deuda")
                        Debt.create(object)
                        .then(obj =>{
                            console.log("se esta buscando el grupo al que hay que hacerle el push de la nueva deuda")
                            Group.findByIdAndUpdate(object.groupId, {$push:{debts:obj._id}}, {new:true})
                            .then(obj =>{
                                return res.status(200).json(obj)
                            })
                        })
                    }
                })
            })

            }else{
                return res.status(200).json(e)
            }
        })
            .catch(e => console.log(e))

    })
    
        
    
    // CRUD: UPDATE
    router.patch('/:id',(req,res,next) => {
        const {id} = req.params;
        const object = _.pickBy(req.body, (e,k) => paths.includes(k));
        const updates = _.pickBy(object, _.identity);
        Model.findByIdAndUpdate(id, updates ,{new:true})
            .then( obj => {
                res.status(200).json({status:'updated',obj});
            })
            .catch(e => next(e))
    })

    router.patch('/:id',(req,res,next) => {
        const id = req.params.id;
        const object = _.pickBy(req.body, (e,k) => paths.includes(k));
        const updates = _.pickBy(object, _.identity);
        Group.findByIdAndUpdate(id, updates ,{new:true})
            .then( obj => {
                res.status(200).json({status:'updated',obj});
            })
            .catch(e => next(e))
    })


    
    // CRUD: DELETE
    router.delete('/:id',(req,res,next) => {
        const {id} = req.params;
        Model.findByIdAndRemove(id)
            .then( obj => {
                if(obj){
                    res.status(200).json({status:`Removed from db`});
                }else{
                    throw new Error("Not existing ID");
                }
            })
            .catch(e => next(e))
    })
    
    router.use((err,req,res,next) => {
        res.status(500).json({error:true, message:err.message});
    })

    return router;
}


module.exports = simpleCrud;


