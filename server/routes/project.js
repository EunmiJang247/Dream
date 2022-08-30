const express = require('express')
const router = express.Router()
const { Project } = require('../models/Project')
const { Apply } = require('../models/Apply')

// 모든프로젝트 조회
router.post('/', (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 3
  // parseInt : string인경우 숫자로
  const skip = req.body.skip ? parseInt(req.body.skip) : 0

  Project.find({ duedate: { $gt: new Date() } })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, projectInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err })
      }
      return res.status(200).json({
        success: true,
        projectInfo,
        postSize: projectInfo.length
      })
    })
})

// 특정프로젝트 조회
router.get('/:id', (req, res, next) => {
  // 조회수 올리는 기능..
  Project.updateOne({ _id: req.params.id }, { $inc: { views: 1 } })
    .then(() => {
      Project.findOne({
        _id: req.params.id
      })
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          res.send(err)
        })
    })
    .catch((err) => {
      res.send(err)
    })
})

// 프로젝트등록
router.post('/post', (req, res) => {
  const project = new Project(req.body)
  project.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
  })
})

// 내가올린 프로젝트 조회
router.post('/mypost/:id', (req, res, next) => {
  const id = req.params.id
  const limit = req.body.limit ? parseInt(req.body.limit) : 20
  const skip = req.body.skip ? parseInt(req.body.skip) : 0

  Project.find({
    writer: id
  })
    .skip(skip)
    .limit(limit)
    .exec((err, projectInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err })
      }
      return res.status(200).json({
        success: true,
        projectInfo,
        postSize: projectInfo.length
      })
    })
})

// 내가 지원한 프로젝트 조회
router.post('/myapply/:id', (req, res, next) => {
  const id = req.params.id

  Apply.find({ userFrom: id })
    .populate('projectId')
    .exec((err, projectInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err })
      }
      return res.status(200).json({
        success: true,
        projectInfo
      })
    })
})

// 내가 올린프로젝트 수정하기
router.post('/mypost/modify/:id', (req, res, next) => {
  Project.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        purpose: req.body.purpose,
        meetingcycle: req.body.meetingcycle,
        projectdesc: req.body.projectdesc,
        projectcontent: req.body.projectcontent,
        servicecate: req.body.servicecate,
        kakaoaddress: req.body.kakaoaddress,
        mentoring: req.body.mentoring,
        teamname: req.body.teamname,
        position: req.body.position,
        duedate: req.body.duedate,
        dreameeInfo: req.body.dreameeInfo
      }
    },
    { new: true }
  )
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = router
