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


const inchargeCtrl = {
    getIncharge: async(req,res) => {
        //hodYear,department
        console.log("GetIncharge: ")
        try {
            var filter ={};
            if(req.body.inchargeYear===1){
                filter = {
                    year:req.body.inchargeYear,
                }
            }
            else{
                filter = {
                    year:{$gte:2},
                    department:req.body.department
                }
            }
            Incharge.find(filter,(err,result)=>{
                if(err){
                    res.status(500).json({msg:"Error: "+err});
                }
                else{
                    console.log(result)
                    res.status(200).json(result);
                }
            });
        } catch (err) {
            return res.status(500).json({msg: err})
        }
    }
   
}

module.exports = inchargeCtrl

