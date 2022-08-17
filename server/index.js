const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended:true}));
//클라이언트에서 보내주는 정보를 가져올수있게해줌
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use('/api/users', require("./routes/users"))
app.use('/api/project', require("./routes/project"))
app.use('/api/dreamee', require("./routes/dreamee"))
app.use('/api/comment', require("./routes/comment"))
app.use('/api/like', require("./routes/like"))
app.use('/api/apply', require("./routes/apply"))

app.use('/uploads', express.static('uploads'));

const {auth} = require('./middleware/auth')
const {User} = require('./models/User')

mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB connected'))
  .catch(err => console.log(err))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))