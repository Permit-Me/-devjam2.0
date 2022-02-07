const mongoose = require('mongoose')

const SickPass = mongoose.Schema({
    studentRollNo:String,
    gender:String,
    reason:String,
    genDate:Date,
    faculty:{
        name:String,
        email:String,
        permitted:Boolean 
    },
    year:Number,
    department:String,
    status:String
})

module.exports = mongoose.model('SickPass',SickPass);