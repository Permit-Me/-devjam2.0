const mongoose = require('mongoose')
const Student = mongoose.Schema({
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/pranaykumar/image/upload/v1630863775/avatar/user_avatar_cqwtmb.jpg"
    },
    name:String,
    rollNo:String,
    email:String,
    password:String,
    year:Number,
    gender:String,
    department:String,
    contactNo:String,
    eventPassess:Number,
    gatePassesss:Number,
    otherPassess:Number,
    sickPasses:Number,
    leavePass:Number
});

module.exports = mongoose.model('Student',Student);