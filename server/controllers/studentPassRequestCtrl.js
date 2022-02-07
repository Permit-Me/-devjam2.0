const GatePass = require('../models/gatePassModel')
const EventPass = require('../models/eventPassModel')
const SickPass = require('../models/sickPassModel')
const OtherPass = require('../models/otherPassModel')
const Leave = require('../models/leaveModel')
const sendMail = require('./sendMail')


const studentPassRequestCtrl = {
    gatePass: async(req,res) => {
        console.log("GatePass: ")
        try {
            const {studentRollNo, reason, facultyName, facultyMail, inchargeName,
                inchargeEmail, studentYear, department} = req.body
            const newGatePass = new GatePass({
                studentRollNo,
                reason,
                genDate:new Date().toDateString(),
                faculty:{
                    name:facultyName,
                    email:facultyMail,
                    permitted:null
                },
                incharge:{
                    name:inchargeName,
                    email:inchargeEmail,
                    permitted:null
                },
                year:studentYear,
                acceptedByHod:null,
                markedForReview:null,
                sentBy:null,
                department,
                status:"pending",
            });
            await newGatePass.save();
            return res.json({msg: "GatePass Request sent"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
    eventPass: async(req,res) => {
        console.log("EventPass: ")
        try {
            const {studentRollNo, poster, facultyName, facultyMail, inchargeName,
                inchargeEmail,eventName, venue, startDate, endDate } = req.body
            const newEventPass = new EventPass({
                studentRollNo,
                genDate:new Date().toDateString(),
                poster,
                eventName,
                venue,
                faculty:{
                    name:facultyName,
                    email:facultyMail,
                    permitted:null
                },
                incharge:{
                    name:inchargeName,
                    email:inchargeEmail,
                    permitted:null
                },
                acceptedByHod:null,
                markedForReview:null,
                startDate,
                endDate,
                sentBy:null,
                status:"pending",
            });
            await newEventPass.save();
            return res.json({msg: "EventPass Request sent"})
            
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
    sickPass: async(req,res) => {
        console.log("SickPass: ")
        try {
            const {studentRollNo, reason, gender, facultyName, facultyMail, 
            studentYear, department } = req.body
            const newSickPass = new SickPass({
                studentRollNo,
                gender,
                reason,
                genDate:new Date().toDateString(),
                faculty:{
                    name:facultyName,
                    email:facultyMail,
                    permitted:null
                },
                year: studentYear,
                department,
                status:"pending",
            });
            await newSickPass.save();
            return res.json({msg: "SickPass Request sent"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
    otherPass: async(req,res) => {
        console.log("OtherPass: ")
        try {
            const {studentRollNo, title,reason, facultyName, facultyMail, inchargeName,
                inchargeEmail, studentYear, department } = req.body
                const newOtherPass = new OtherPass({
                    studentRollNo,
                    reason,
                    title,
                    genDate:new Date().toDateString(),
                    faculty:{
                        name:facultyName,
                        email:facultyMail,
                        permitted:null
                    },
                    incharge:{
                        name:inchargeName,
                        email:inchargeEmail,
                        permitted:null
                    },
                    acceptedByHod:null,
                    year: studentYear,
                    markedForReview:null,
                    department,
                    sentBy:null,
                    status:"pending",
                });
                await newOtherPass.save();
                return res.json({msg: "OtherPass Request sent"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
    leave: async(req,res) => {
        console.log("Leave: ")
        try {
            const {studentRollNo, subject, body, startDate, endDate, facultyName, facultyMail, inchargeName,
                inchargeEmail, studentYear, department } = req.body
                const newLeave = new Leave({
                    studentRollNo,
                    subject,
                    body,
                    genDate:new Date().toDateString(),
                    startDate,
                    endDate,
                    faculty:{
                        name:facultyName,
                        email:facultyMail,
                        permitted:null
                    },
                    incharge:{
                        name:inchargeName,
                        email:inchargeEmail,
                        permitted:null
                    },
                    acceptedByHod:null,
                    year: studentYear,
                    markedForReview:null,
                    department,
                    sentBy:null,
                    status:"pending",
                });
                await newLeave.save();
                return res.json({msg: "Leave Request sent"})
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    }
}

module.exports = studentPassRequestCtrl

