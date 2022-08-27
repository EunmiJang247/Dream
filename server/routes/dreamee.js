const express = require('express')
const { Dreamee } = require('../models/Dreamee')
const { Project } = require('../models/Project')
const { User } = require('../models/User')

const multer = require('multer')
const router = express.Router()
const sharp = require('sharp')
const fs = require('fs')

//s3관련코드
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

//특정드림이 조회
router.get('/:id', (req, res, next) => {
  const id = req.params.id
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
  console.log(dreamee)
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
  // console.log(req.body)
  Dreamee.find({
    userFrom: { $in: req.body }
  })
    .then((result) => {
      // console.log('result:',result)
      res.json(result)
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
      console.log(err)
    })
})

// 이미지 올리는 server part
// multer가이드
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads/') // 업로드라는 폴더(최상단디렉토리)에 저장하겠다
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`) // 파일이름
  }
})

const upload = multer({ storage: storage }).single('file')

// router.post('/image', (req, res, next) => {
//     // 여기서 가져온 이미지를 서버에 저장해주겠다!
//     upload(req,res,err => {
//         if(err){
//             return res.json({success:false,err})
//         }
//         return res.json({success:true,
//                         filePath:res.req.file.path,
//                         fileName: res.req.file.filename})
//         //여기서 filePath: uploads폴더의 어디에 파일이있는지.
//     })
// });

// // 이미지를 업로드하는 라우트
router.post('/image', upload, (req, res, next) => {
  try {
    console.log('파일정보', res.req.file)

    sharp(res.req.file.path)
      .resize({ width: 100, height: 100 })
      .withMetadata()
      .toFile(`uploads/resized_${res.req.file.filename}`, (err, info) => {
        if (err) throw err
        console.log(`info : ${info}`)
        fs.unlink(`uploads/${res.req.file.filename}`, (err) => {
          if (err) throw err
        })
      })
  } catch (err) {
    console.log(err)
  }
  return res.json({
    success: true,
    filePath: `uploads/resized_${res.req.file.filename}`,
    fileName: res.req.file.filename
  })
})

// S3적용한 이미지 저장하는 코드.---------------------------------------------

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// const s3 = new AWS.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: bucketName,
//     key: function (req, file, cb) {
//       var ext = file.mimetype.split("/")[1];
//       if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
//         return cb(new Error("Only images are allowed"));
//       }
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
//   acl: "public-read-write",
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// // 이미지를 업로드하는 라우트
// router.post("/image", upload.single("file"), (req, res, next) => {
//   try {
//     // console.log('파일정보',res.req.file)
//     // sharp(res.req.file.path)
//     //   .resize({ width: 100, height: 100 })
//     //   .withMetadata()
//     //   .toFile(`uploads/resized_${res.req.file.filename}`, (err, info) => {
//     //     if (err) throw err;
//     //     console.log(`info : ${info}`);
//     //     fs.unlink(`uploads/${res.req.file.filename}`, (err) => {
//     //       if (err) throw err;
//     //     });
//     //   });
//   } catch (err) {
//     console.log(err);
//   }
//   return res.json({
//     success: true,
//     filePath: `uploads/resized_${res.req.file.filename}`,
//     fileName: res.req.file.filename,
//   });
// });

module.exports = router
