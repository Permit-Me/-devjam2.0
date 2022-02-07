const mongoose = require('mongoose')

const GatePass = mongoose.Schema({
    studentRollNo:String,
    reason:String,
    genDate:Date,
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
    sentBy:String,
    department:String,
    status:String,
});

module.exports = mongoose.model('GatePass',GatePass);