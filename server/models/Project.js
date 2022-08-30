const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    purpose: {
      type: String
    },
    meetingcycle: {
      type: String
    },
    projectdesc: {
      type: String // 짧은설명
    },
    projectcontent: {
      type: String // 긴설명
    },
    servicecate: {
      type: String
    },
    kakaoaddress: {
      type: String
    },
    mentoring: {
      type: String
    },
    teamname: {
      type: String
    },
    position: {
      type: String
    },
    duedate: {
      type: Date
    },
    regidate: {
      type: String
    },
    dreameeInfo: {
      type: Array
    },
    views: {
      type: Number
    }
  },
  { timestamps: true }
)

const Project = mongoose.model('Project', projectSchema)
module.exports = { Project }
