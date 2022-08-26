const express = require('express');
const { Like } = require('../models/Like');
const router = express.Router();


router.post('/projectlikeNumber',(req,res)=>{
    Like.find({"projectId" : req.body.projectId})
        .exec((err, info)=>{
            if(err){return res.status(400).send(err)}
            res.status(200).json({success:true, LikeNumber : info.length})
        })
})

router.post('/dreameelikeNumber',(req,res)=>{
    Like.find({"dreameeId" : req.body.dreameeId,})
        .exec((err, info)=>{
            if(err){return res.status(400).send(err)}
            console.log(info)
            res.status(200).json({success:true, LikeNumber : info.length})
        })
})

router.post('/projectliked',(req,res)=>{
        Like.find({"projectId" : req.body.projectId, 
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

router.post('/dreameeliked',(req,res)=>{
    Like.find({"dreameeId" : req.body.dreameeId, 
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

router.post('/projectremovefromLike',(req,res)=>{
    Like.findOneAndDelete({"projectId":req.body.projectId, "userFrom": req.body.userFrom })
        .exec((err,doc)=>{
            if(err){return res.status(400).send(err)}
            return res.status(200).json({success:true,doc})
        })
})

router.post('/dreameeremovefromLike',(req,res)=>{
    Like.findOneAndDelete({"dreameeId":req.body.dreameeId, "userFrom": req.body.userFrom })
        .exec((err,doc)=>{
            if(err){return res.status(400).send(err)}
            return res.status(200).json({success:true,doc})
        })
})

router.post('/projectaddToLike',(req,res)=>{
    const like = new Like(req.body)
    like.save((err,doc)=>{
        if(err){return res.status(400).send(err)}
        return res.status(200).json({success:true})
    })
})

router.post('/dreameeaddToLike',(req,res)=>{
    console.log(req.body)
    const like = new Like(req.body)
    like.save((err,doc)=>{
        if(err){return res.status(400).send(err)}
        return res.status(200).json({success:true})
    })
})


module.exports = router;