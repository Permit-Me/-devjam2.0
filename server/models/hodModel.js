const mongoose = require('mongoose')
const Hod = mongoose.Schema({
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/pranaykumar/image/upload/v1630863775/avatar/user_avatar_cqwtmb.jpg"
    },
    name:String,
    email:String,
    password:String,
    department:String,
    contactNo:String,
    eventPasses:Number,
    gatePassesss:Number,
    leavePass:Number,
    otherPass:Number,
    year:Number
});
module.exports = mongoose.model('Hod',Hod);
