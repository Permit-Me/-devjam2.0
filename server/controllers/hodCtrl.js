const GatePass = require('../models/gatePassModel')
const EventPass = require('../models/eventPassModel')
const SickPass = require('../models/sickPassModel')
const OtherPass = require('../models/otherPassModel')
const Leave = require('../models/leaveModel')

const Student = require('../models/studentModel')
const Faculty = require('../models/facultyModel')
const Incharge = require('../models/inchargeModel')
const Hod = require('../models/hodModel')
const sendMail = require('./sendMail')


const hodCtrl = {
    getFaculty: async(req,res) => {
        //hodYear,department
        console.log("getFaculty: ")
        try {
            var filter ={};
            if(req.body.hodYear===1){
                filter = {
                    year:req.body.hodYear,
                }
            }
            else{
                filter = {
                    year:{$gte:2},
                    department:req.body.department
                }
            }
            Faculty.find(filter,(err,result)=>{
                if(err){
                    res.status(500).json({msg:"Error: "+err});
                }
                else{
                    res.status(200).json(result);
                }
            });
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    },
    approveFaculty: async(req,res) => {
        console.log("approveFaculty: ")
        //id, permitted, 
        try {
            const id = req.body.id;
            const permission = req.body.permitted;
            Faculty.findOne({_id:id},(err,result)=>{
                if(err){
                    res.status(500).json({msg:"Error= "+err});
                }
                else{
                    if(result){
                    result.hodApproved = permission;
                    result.save(); 
                    }
                    else{
                        res.status(400).json({msg:"Faculty not found"});
                    }
                }
            })
            
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    }
}

module.exports = hodCtrl

