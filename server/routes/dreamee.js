const express = require('express');
const { Dreamee } = require('../models/Dreamee');
const { Project } = require('../models/Project');
const { User } = require('../models/User');
const router = express.Router();


router.post('/',(req,res)=>{
    console.log('여긴옴')
    let limit = req.body.limit ? parseInt(req.body.limit) : 4;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
    // let term = req.body.searchTerm
    Dreamee.find()
    .populate("userFrom")
    .skip(skip)
    .limit(limit)
    .exec((err, dreameeInfo)=>{
        if(err){return res.status(400).json({success: false, err})}
        return res.status(200).json({
            success:true, dreameeInfo,
            postSize: dreameeInfo.length
        })
    })
})

//특정드림이 조회
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Dreamee.findOne({
        _id : req.params.id },
        ).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.send(err);
    });
});

//프로젝트등록
router.post('/post',(req,res)=>{
    const dreamee = new Dreamee(req.body)
    console.log(req.body)
    console.log(dreamee)
    dreamee.save((err)=>{
        if(err){return res.status(400).json({success:false, err})}
        return res.status(200).json({success:true})
    })
})


module.exports = router;