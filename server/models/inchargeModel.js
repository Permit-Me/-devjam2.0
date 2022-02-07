const mongoose = require('mongoose')

const Incharge = mongoose.Schema({
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
    eventPasses:Number,
    gatePassesss:Number,
    otherPassess:Number,
    sickPasses:Number,
    leavePassess:Number
});


module.exports = mongoose.model('Incharge',Incharge);