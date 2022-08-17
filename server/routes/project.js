const express = require('express');
const router = express.Router();
const { Project } = require('../models/Project');

//모든프로젝트 조회
router.post('/',(req,res)=>{
let limit = req.body.limit ? parseInt(req.body.limit) : 3;
//parseInt : string인경우 숫자로
let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
let term = req.body.searchTerm

    Project.find()
    .skip(skip)
    .limit(limit)
    .exec((err, projectInfo)=>{
        if(err){return res.status(400).json({success: false, err})}
        return res.status(200).json({
            success:true, projectInfo,
            postSize: projectInfo.length
        })
    })
})

//특정프로젝트 조회
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Project.findOne({
        _id : req.params.id },
        ).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.send(err);
    });
});

//프로젝트등록
router.post('/post',(req,res)=>{
    const project = new Project(req.body)
    project.save((err)=>{
        if(err){return res.status(400).json({success:false, err})}
        return res.status(200).json({success:true})
    })
})


module.exports = router;