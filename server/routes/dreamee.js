const express = require('express');
const { Dreamee } = require('../models/Dreamee');
const { Project } = require('../models/Project');
const { User } = require('../models/User');
const router = express.Router();


router.post('/',(req,res)=>{
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
    dreamee.save((err)=>{
        if(err){return res.status(400).json({success:false, err})}
        return res.status(200).json({success:true})
    })
})

//userid로 특정드림이 조회
router.get('/mydreamee/:userid', (req, res, next) => {
    console.log(req.params.userid)
    Dreamee.findOne({
        userFrom : req.params.userid },
        ).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.send(err);
    });
});

//드림이 수정
router.put('/:dreamid', (req, res, next) => {
    console.log(req.params.dreamid)
    console.log(req.body)
    // Dreamee.findOne({_id : req.params.dreamid },
    //     {$set:
    //         {   
    //             nickname : req.body.content.servicecate,
    //             position : req.body.content.projecttitle,
    //             tech : req.body.content.projectdesc,
    //             introduce : req.body.content.position,
    //             portfolio : req.body.content.meetingcycle,
    //             kakao : req.body.content.duedate,
    //         },
    //     }).then((result) => {
    // res.json(result);
    // }).catch((err) => {
    //     res.send(err);
    // });
});


module.exports = router;