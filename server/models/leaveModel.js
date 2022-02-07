const mongoose = require('mongoose')

const Leave = mongoose.Schema({
    studentRollNo:String,
    subject:String,
    body:String,
    genDate:Date,
    startDate:Date,
    endDate:Date,
    faculty:{
        name:String,
        email:String,
        permitted:Boolean
    },
    incharge:{
        name:String,
        email:String,
        permitted:Boolean
    },
    acceptedByHod:Boolean,
    year:Number,
    markedForReview:Boolean,
    department:String,
    status:String,
    sentBy:String
})

module.exports = mongoose.model('Leave',Leave);
