const mongoose = require('mongoose')

const OtherPass = mongoose.Schema({
    studentRollNo:String,
    reason:String,
    title:String,
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
    department:String,
    status:String,
    sentBy:String
})




module.exports = mongoose.model('OtherPass',OtherPass);
