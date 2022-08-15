const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email: {
        type: String,
        time: true, //띄어쓰기 없애주는것. 
        unique:1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        //토큰유효기간 / 832-1117 
        type: Number
    }
})

userSchema.pre('save',function(next){
//몽구스의 스키마로, save라고 하면 유저모델에 유저정보를저장하기전에
//무엇을 한다고 선언해주는 것이다.
//이게 끝나면 index의 save로 들어간다. 
//next를 넣어줘서 함수가 끝나면 실행이 되로록 해야한다. 

//비밀번호를 암호화 시키는 모든 코드이다.
    var user = this;
    //위에 유저를 가리킴
    if(user.isModified('password')){
        //password변경될때만 실행하겠다
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err){ return next(err) }
            bcrypt.hash(user.password, salt, function(err,hash){
                //여기서 hash는 암호화된 번호
                if(err){return next(err)}
                user.password = hash
                //암호화를 만드는데 성공했다면 암호화된 번호로 바꿔준다
                next()
            })
        })
    }else{
        //비밀번호가 아니라 다른것은 바꿀때 역시 next로해줘야한다.
        //없으면 여기서 머물게됨
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //client가 보낸비밀번호도 암호화를 한다음 비교할 것이다. 
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err){return cb(err)}
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
//이제 jsonwebtoken을 이용해 토큰생성하는 코드를 짜겠다.
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secretToken')
    user.token = token
    user.save(function(err,user){
        if(err){return cb(err)}
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //가져온 토큰을 id로 변환하기위해 푼다.
    //두번째 인자는 우리가 토큰만들때 넣었던 글자. 
    jwt.verify(token,'secretToken', function(err, decoded){
     //유저아이디를 이용해서 유저를 찾은다음에 클라이언트에서 가져온토큰과
     //데이터베이스에 보관된 토큰이 일치하는지 확인
        User.findOne({"_id": decoded, "token": token}, function(err,user){
            if(err){return cb(err)}
            //만약 에러가 없다면 유저정보를 전달해준다
            cb(null, user)
        })   
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User }