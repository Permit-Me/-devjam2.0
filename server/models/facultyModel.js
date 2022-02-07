
const mongoose = require('mongoose')
const Faculty = mongoose.Schema({
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/pranaykumar/image/upload/v1630863775/avatar/user_avatar_cqwtmb.jpg"
    },
    name:String,
    email:String,
    password:String,
    department:String,
    year:Number,
    contactNo:String,
    eventPassess:Number,
    hodApproved:Boolean,
    gatePassesss:Number,
    otherPassess:Number,
    sickPassess:Number,
    leavePass:Number
});

module.exports = mongoose.model('Faculty',Faculty);