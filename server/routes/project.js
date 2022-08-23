const express = require('express');
const router = express.Router();
const { Project } = require('../models/Project');
const { Apply } = require('../models/Apply');

//모든프로젝트 조회
router.post('/',(req,res)=>{
let limit = req.body.limit ? parseInt(req.body.limit) : 3;
//parseInt : string인경우 숫자로
let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
let term = req.body.searchTerm

    let today = new Date();
    Project.find({duedate : { $gt: new Date()}})
    .sort({_id:-1})
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
    // console.log(id)
    
    // 조회수 올리는 기능.. 
    // Project.updateOne({ _id : req.params.id }
    //     ,{$inc:
    //         {"views":1},
    //     })
    // .then((result) => {
    //     res.json(result);
    // }).catch((err) => {
    //     res.send(err);
    // });

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
    // console.log(req.body)
    const project = new Project(req.body)
    project.save((err)=>{
        if(err){return res.status(400).json({success:false, err})}
        return res.status(200).json({success:true})
    })
})

//내가올린 프로젝트 조회 
router.post('/mypost/:id', (req, res, next) => {
    const id = req.params.id;
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;

    Project.find({
        writer : id })
    .skip(skip)
    .limit(limit)
    .exec((err, projectInfo)=>{
        if(err){return res.status(400).json({success: false, err})}
        return res.status(200).json({
            success:true, projectInfo,
            postSize: projectInfo.length
        })
    })
});

//내가 지원한 프로젝트 조회 
router.post('/myapply/:id', (req, res, next) => {
    const id = req.params.id;

    Apply.find({userFrom : id })
    .populate('projectId')
    .exec((err, projectInfo)=>{
        if(err){return res.status(400).json({success: false, err})}
        return res.status(200).json({
            success:true, projectInfo,
        })
    })
});



module.exports = router;