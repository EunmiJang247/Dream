const mongoose = require('mongoose')
const dreameeSchema = mongoose.Schema({
    nickname : {
        type: String,
    },
    position : {
        type: String,
    },
    tech : {
        type: String,
    },
})

const Dreamee = mongoose.model('Dreamee', dreameeSchema)
module.exports = { Dreamee }


