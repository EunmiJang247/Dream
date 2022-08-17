const express = require('express');
const { Apply } = require('../models/Apply');
const router = express.Router();

router.post('/applied',(req,res)=>{
    Apply.find({"projectId" : req.body.projectId, 
                   "userFrom" : req.body.userFrom      
        })
            .exec((err, info)=>{
                if(err){return res.status(400).send(err)}

                let result = false;
                if(info.length !== 0){
                    result = true
                }
                res.status(200).json({success:true, liked : result})
            })
})

router.post('/removefromApply',(req,res)=>{
    Apply.findOneAndDelete({"projectId":req.body.projectId, "userFrom": req.body.userFrom })
        .exec((err,doc)=>{
            if(err){return res.status(400).send(err)}
            return res.status(200).json({success:true,doc})
        })
})

router.post('/addToApply',(req,res)=>{
    const apply = new Apply(req.body)
    apply.save((err,doc)=>{
        if(err){return res.status(400).send(err)}
        return res.status(200).json({success:true})
    })
})


module.exports = router;