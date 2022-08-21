const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applySchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    Acceptornot: {
        type: Boolean,
    },

},{timestamps: true})

const Apply = mongoose.model('Apply', applySchema)
module.exports = { Apply }