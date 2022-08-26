const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    dreameeId: {
        type: Schema.Types.ObjectId,
        ref: 'Dreamee'
    },

},{timestamps: true})

const Like = mongoose.model('Like', likeSchema)
module.exports = { Like }