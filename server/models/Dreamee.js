const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dreameeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nickname : {
        type: String,
    },
    position : {
        type: String,
    },
    tech : {
        type: Array,
    },
    introduce : {
        type: String,
    },
    portfolio : {
        type: String,
    },
    kakao : {
        type: String,
    },
    Images : {
        type: String,
    },
    views : {
        type: Number,
    },
})

const Dreamee = mongoose.model('Dreamee', dreameeSchema)
module.exports = { Dreamee }


