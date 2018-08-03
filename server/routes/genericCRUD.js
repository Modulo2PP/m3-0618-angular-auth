const express = require('express');
const _ = require('lodash');
const User = require('../models/User');
const Group = require('../models/group');
const Favor = require('../models/favors')
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
        console.log(req.params.id)
        var id = req.params.id
        Group.find({ members: { $in : [id]}})
            .then( objList => {
                console.log(objList)
               return  res.status(200).json(objList)
               
            })

            .catch(e => next(e))
    })

    router.get('/mygroup/:id',(req,res,next) => {
        const id = req.params.id;
        console.log(id)
        Group.find({_id : id})
        .populate('members')
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
        console.log(object)
        Favor.create(object)
            .then( obj => res.status(200).json(obj))
            .catch(e => next(e))
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


