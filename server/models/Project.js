const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    servicecate : {
        type: String,
    },
    projecttitle : {
        type: String,
    },
    projectdesc : {
        type: String,
    },
    projectcontent : {
        type: String,
    },
    position : {
        type: String,
    },
    meetingcycle : {
        type: String,
    },
    duedate : {
        type: String,
    },
    regidate : {
        type: String,
    }    
})

const Project = mongoose.model('Project', projectSchema)
module.exports = { Project }


