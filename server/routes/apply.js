const express = require('express')
const { Apply } = require('../models/Apply')
const router = express.Router()

router.post('/acceptedornot', (req, res) => {
  Apply.find({
    projectId: req.body.projectid,
    userFrom: req.body.DreameeUserFrom
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Apply.find({ projectId: id }).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

router.post('/applied', (req, res) => {
  Apply.find({
    projectId: req.body.projectId,
    userFrom: req.body.userFrom
  }).exec((err, info) => {
    if (err) {
      return res.status(400).send(err)
    }

    let result = false
    if (info.length !== 0) {
      result = true
    }
    res.status(200).json({ success: true, applied: result, info: info })
  })
})

router.post('/removefromApply', (req, res) => {
  Apply.findOneAndDelete({
    projectId: req.body.projectId,
    userFrom: req.body.userFrom
  }).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

router.post('/addToApply', (req, res) => {
  const apply = new Apply(req.body)
  apply.save((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true })
  })
})

router.post('/accept', (req, res) => {
  Apply.findOneAndUpdate(
    { projectId: req.body.projectid, userFrom: req.body.dreameeUserId },
    { $set: { Acceptornot: true } }
  ).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

router.post('/deny', (req, res) => {
  Apply.findOneAndUpdate(
    { projectId: req.body.projectid, userFrom: req.body.dreameeUserId },
    { $set: { Acceptornot: false } }
  ).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

module.exports = router
