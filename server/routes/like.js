const express = require('express');
const { Like } = require('../models/Like');
const router = express.Router();


router.post('/likeNumber',(req,res)=>{
    Like.find({"projectId" : req.body.projectId})
        .exec((err, info)=>{
            if(err){return res.status(400).send(err)}
            res.status(200).json({success:true, LikeNumber : info.length})
        })
})

router.post('/liked',(req,res)=>{
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

router.post('/removefromLike',(req,res)=>{
    Like.findOneAndDelete({"projectId":req.body.projectId, "userFrom": req.body.userFrom })
        .exec((err,doc)=>{
            if(err){return res.status(400).send(err)}
            return res.status(200).json({success:true,doc})
        })
})

router.post('/addToLike',(req,res)=>{
    const like = new Like(req.body)
    like.save((err,doc)=>{
        if(err){return res.status(400).send(err)}
        return res.status(200).json({success:true})
    })
})


module.exports = router;