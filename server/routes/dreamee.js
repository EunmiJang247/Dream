const express = require('express')
const { Dreamee } = require('../models/Dreamee')

const multer = require('multer')
const router = express.Router()

// s3관련코드
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
require('dotenv').config()

router.post('/', (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 4
  const skip = req.body.skip ? parseInt(req.body.skip) : 0
  // let term = req.body.searchTerm
  Dreamee.find()
    .populate('userFrom')
    .skip(skip)
    .limit(limit)
    .exec((err, dreameeInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err })
      }
      return res.status(200).json({
        success: true,
        dreameeInfo,
        postSize: dreameeInfo.length
      })
    })
})

// 특정드림이 조회
router.get('/:id', (req, res, next) => {
  Dreamee.findOne({
    _id: req.params.id
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

// 드림이 신규등록
router.post('/post', (req, res) => {
  const dreamee = new Dreamee(req.body)
  dreamee.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
  })
})

// userid로 특정드림이 조회
router.get('/mydreamee/:userid', (req, res, next) => {
  Dreamee.findOne({
    userFrom: req.params.userid
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.post('/finddreamee', (req, res, next) => {
  Dreamee.find({
    userFrom: { $in: req.body }
  })
    .then((result) => {
      res.json({ success: true, result })
    })
    .catch((err) => {
      res.send(err)
    })
})

router.put('/:dreamid', (req, res, next) => {
  Dreamee.findOneAndUpdate(
    { _id: req.params.dreamid },
    {
      $set: {
        nickname: req.body.nickname,
        position: req.body.position,
        tech: req.body.tech,
        introduce: req.body.introduce,
        portfolio: req.body.portfolio,
        kakao: req.body.kakao,
        Images: req.body.Images
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

const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey
})

var profileupload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fileName: file.fieldname })
    },
    key: function (req, file, cb) {
      var filename = file.originalname
      var ext = file.mimetype.split('/')[1]
      if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
        return cb(new Error('Only images are allowed'))
      }
      cb(null, Date.now().toString() + filename)
    }
  })
}).single('file')

// 이미지를 업로드하는 라우트
router.post('/image', async (req, res, next) => {
  profileupload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err })
    }
    if (!res.req.file.location) {
      return res.send('Please upload a file')
    }
    return res.json({
      success: true,
      filePath: res.req.file.location,
      fileName: res.req.file.originalname
    })
  })
})

module.exports = router
