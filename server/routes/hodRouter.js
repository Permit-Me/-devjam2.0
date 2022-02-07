const router = require('express').Router()
const hodCtrl = require('../controllers/hodCtrl')
const auth = require('../middleware/auth')

const GatePass = require('../models/gatePassModel')
const EventPass = require('../models/eventPassModel')
const SickPass = require('../models/sickPassModel')
const OtherPass = require('../models/otherPassModel')
const Leave = require('../models/leaveModel')

const Student = require('../models/studentModel')
const Faculty = require('../models/facultyModel')
const Incharge = require('../models/inchargeModel')
const Hod = require('../models/hodModel')


router.post('/get/faculty', hodCtrl.getFaculty)
router.post('/approve/faculty', hodCtrl.approveFaculty)

//gatepass
router.post("/gatepass",(req,res)=>{
    var filter = {}
    if(req.body.hod_year>1){
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:{$gte:2},
            department:hodDepartment
        }
    }
    else{
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:1,
        }  
    }
    console.log(filter);
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});
router.post("/approve/gatepass",(req,res)=>{
    var filter = {}
    if(req.body.year===1){
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:1
        }
    }
    else{
        filter = {
            _id:id,
            markedForReview:true,
            year:{$gte:2},
            department:req.body.department,
            acceptedByHod:null
        }
    }

    Hod.findOne(
        {
        email:req.body.hodEmail,
        department:req.body.department
        },(err,hod)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(hod){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            var filter = {};
                if(req.body.year===1){
                    filter = {
                        _id:req.body.id,
                        markedForReview:true,
                        acceptedByHod:null,
                        status:"pending",
                        year:1
                    }
                }
                else{
                    filter = {
                        _id:req.body.id,
                        markedForReview:true,
                        acceptedByHod:null,
                        status:"pending",
                        department:req.body.department,
                        year:{$gte:2}
                    }
                }
                var update = {

                }
                if(req.body.permitted===true){
                    update = {
                        acceptedByHod:true,
                        status:"accepted"
                    }
                }
                else{
                    update = {
                        acceptedByHod:false,
                        status:"rejected"
                    }
                }
                GatePass.findOneAndUpdate(filter,update,(error)=>{
                    if(error){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(req.body.permitted){
                            hod.gatePassesss+=1;
                            student.gatePassesss+=1;
                            student.save();
                            hod.save();
                        }
                        res.status(200).json({updated:true});
                    }
                })
                        }
                        else{
                            res.status(200).json({student_found:false});
                        }
                    }
                })
            }
            else{
                res.status(200).json({hod_found:false});
            }
        }
    });
});

router.post("/history/gatepass",(req,res)=>{
    var filter ={};
    if(req.body.year===1){
        filter = {
           year:1,
           $or:[
               {accepted_by_hod:false},
               {accepted_by_hod:true}
           ],
        }
    }
    else{
        filter = {
            year:{$gte:2},
            $or:[
                {accepted_by_hod:false},
                {accepted_by_hod:true}
            ],
            department:req.body.department
        }
    }
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

//event pass
router.post("/approve/eventpass",(req,res)=>{
    var filter = {}
    if(req.body.year===1){
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:1
        }
    }
    else{
        filter = {
            _id:id,
            markedForReview:true,
            year:{$gte:2},
            department:req.body.department,
            acceptedByHod:null
        }
    }

    Hod.findOne(
        {
        email:req.body.hodEmail,
        department:req.body.department
        },(err,hod)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(hod){
                Student.findOne({rollNo:req.body.rollno},(er,student)=>{
                    if(er){
                        res.status(200).json({error:true});
                    }
                    else{
                        if(student){
               
                var update = {

                }
                if(req.body.permitted===true){
                    update = {
                        acceptedByHod:true,
                        status:"accepted"
                    }
                }
                else{
                    update = {
                        acceptedByHod:false,
                        status:"rejected"
                    }
                }
                EventPass.findOneAndUpdate(filter,update,(err)=>{
                    if(err){
                        res.status(200).json({error:true});
                    }
                    else{
                        if(req.body.permitted){
                            hod.eventPasses+=1;
                            student.eventPassess+=1;
                            student.save();
                            hod.save();
                        }
                        res.status(200).json({updated:true});
                    }
                })
            }
            else{
                res.status(200).json({student_found:false});
            }
        }
    })
            }
            else{
                res.status(200).json({hod_found:false});
            }
        }
    });
})

router.post("/eventpass",(req,res)=>{
    var filter = {};
    if(req.body.hod_year>1){
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:{$gte:2},
            department:hodDepartment
        }
    }
    else{
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:1,
            department:hodDepartment
        }  
    }
    EventPass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post("/history/eventpass",(req,res)=>{
    var filter ={};
    if(req.body.year===1){
        filter = {
           year:1,
           $or:[
               {acceptedByHod:false},
               {acceptedByHod:true}
           ],
        }
    }
    else{
        filter = {
            year:{$gte:2},
            $or:[
                {acceptedByHod:false},
                {acceptedByHod:true}
            ],
            department:req.body.department,
        }
    }
    EventPass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

//otherpass
router.post("/otherpass",(req,res)=>{
    var filter = {};
    if(req.body.hodYear>1){
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:{$gte:2},
            department:hodDepartment
        }
    }
    else{
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:1,
            department:hodDepartment
        }  
    }
    OtherPass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{   
            res.status(200).json(result);
        }
    });
});
router.post("/approve/otherpass",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permission;
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:1
        }
    }
    else
    {
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:{$gte:2},
            department:req.body.department
        }
    }
    Hod.findOne({email:req.body.email},(err,hod)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(hod){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            OtherPass.findOne(filter,(error,result)=>{
                                if(error){
                                    res.status(400).json({error:true});
                                }
                                else{
                                    if(result){
                                        if(permitted){
                                            result.acceptedByHod = true;
                                            result.status = "accepted";
                                            result.save();

                                            hod.otherPass+=1;
                                            hod.save();

                                            student.otherPassess+=1;

                                            student.save();
                                            res.status(200).json({permitted:true});

                                        }
                                        else{
                                            result.acceptedByHod = false;
                                            result.status = "pending";
                                            result.save();
                                            res.status(200).json({permitted:false});
                                        }
                                    }
                                    else
                                    {
                                        res.status(200).json({found:false});
                                    }
                                }
                            })
                        }
                        else{
                            res.status(200).json({found:false});
                        }
                    }
                })
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/history/otherpass",(req,res)=>{
    var filter ={};
    if(req.body.year===1){
        filter = {
           year:1,
           $or:[
               {acceptedByHod:false},
               {acceptedByHod:true}
           ]
        }
    }
    else{
        filter = {
            year:{$gte:2},
            $or:[
                {acceptedByHod:false},
                {acceptedByHod:true}
            ],
            department:req.body.department,
        }
    }
    OtherPass.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

//leavepass

router.post("/get/leavepass",(req,res)=>{
    var filter = {}
    if(req.body.hodYear>1){
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:{$gte:2},
            department:hodDepartment
        }
    }
    else{
        filter = {
            acceptedByHod:null,
            markedForReview:true,
            year:1,
        }  
    }
    console.log(filter);
    Leave.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});

router.post("/approve/leavepass",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permission;
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:1
        }
    }
    else
    {
        filter = {
            _id:id,
            markedForReview:true,
            acceptedByHod:null,
            year:{$gte:2},
            department:req.body.department
        }
    }
    Hod.findOne({department:req.body.department,email:req.body.email},(err,hod)=>{
        if(err){
            res.status(400).json(({error:true}));
        }
        else{
            if(hod){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            Leave.findOne(filter,(error,leave)=>{
                                if(error){
                                    res.status(200).json({error:true});
                                }
                                else{
                                    if(leave){
                                        if(permitted){
                                            leave.acceptedByHod = true;
                                            leave.status = "accepted";

                                            hod.leavePass+=1;

                                            student.leavePass+=1;

                                            hod.save();
                                            student.save();
                                            leave.save();
                                            res.status(200).json({permitted:true});
                                        }
                                        else{
                                            leave.acceptedByHod =false;
                                            leave.status = "rejected";
                                            leave.save();
                                            res.status(200).json({permitted:false});
                                        }
                                    }
                                    else{
                                        res.status(200).json({found:false});
                                    }
                                }
                            })
                        }
                        else
                        {
                            res.status(200).json({found:false});
                        }
                    }
                })
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});


router.post("/history/leavepass",(req,res)=>{
    var filter ={};
    if(req.body.year===1){
        filter = {
           year:1,
           $or:[
               {acceptedByHod:false},
               {acceptedByHod:true}
           ],
        }
    }
    else{
        filter = {
            year:{$gte:2},
            $or:[
                {acceptedByHod:false},
                {acceptedByHod:true}
            ],
            department:req.body.department,
        }
    }
    Leave.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post("/getfaculty",(req,res)=>{
    var filter ={};
    if(req.body.hod_year===1){
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
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});

router.get("/statistics",(req,res)=>{
    Hod.find({},(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

module.exports = router