const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { auth } = require('../middleware/auth')
const bcrypt = require('bcrypt')
const saltRounds = 10

// register라우터 만들 예정
router.post('/register', (req, res) => {
  // 회원가입할때필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.status(200).json({
      success: true
    })
  })
})

// 비밀번호 변경 라우터
router.post('/changepassword', async (req, res) => {
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(req.body.ChangePassword, salt)

  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: hashedPassword } }
  ).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.status(200).json({ success: true, doc })
  })
})

// 로그인라우터 만들예정
router.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다'
      })
    }
    // 요청한 이메일이 있다면 비밀번호가 같은지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // User.js모델에 메소드가 만들어져있다.
      // req.body.password는 가입할 때 쓴 퓨어 패스워드.

      // isMatch가 없다는 것은 에러가났다는것.
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '이메일에 해당하는 유저가 있으나 비밀번호가 다릅니다'
        })
      }

      // 비밀번호까지 맞다면 이제 로그인만 하면 되기때문에 Token을 생성한다.
      user.generateToken((err, user) => {
        // 토큰생성하는 메소드를 또 만드는것 User Model에 있음.
        // jsonwebtoken이라는 npm을 install했음.
        if (err) {
          return res.status(400).send(err)
        }
        // 토큰을 쿠키에 저장한다. npm install cookie-parser했음
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// auth기능
router.get('/auth', auth, (req, res) => {
  // auth라는 미들웨어를 추가했다. 루트 디렉토리에 middleware에있음
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Auth : true라는말.
  // req.user = user; 를 auth에서 절달했다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.status(200).send({ success: true })
  })
})

module.exports = router
