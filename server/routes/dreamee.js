const express = require('express');
const { Dreamee } = require('../models/Dreamee');
const { Project } = require('../models/Project');
const { User } = require('../models/User');
const router = express.Router();


router.post('/',(req,res)=>{
let limit = req.body.limit ? parseInt(req.body.limit) : 20;
let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
let term = req.body.searchTerm

    // User.find()
    // .exec((err, dreameeInfo)=>{
    //     if(err){return res.status(400).json({success: false, err})}
    //     return res.status(200).json({success:true, dreameeInfo})
    // })

    Dreamee.find()
    .exec((err, projectInfo)=>{
        if(err){return res.status(400).json({success: false, err})}
        return res.status(200).json({success:true, projectInfo})
    })
})


module.exports = router;