const mongoose = require('mongoose')

const EventPass = mongoose.Schema({
    studentRollNo:String,
    genDate:Date,
    poster:String,
    eventName:String,
    venue:String,
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
    markedForReview:Boolean,
    startDate : String,
    sentBy:String,
    endDate:String,
    status:String
});

module.exports = mongoose.model('EventPass',EventPass);