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

//gatepass
router.post("/get/gatepass",(req,res)=>{
    const filter = {
        genDate:new Date().toDateString(),
        'faculty.email':req.body.facultyEmail,
        'faculty.permitted':null,
        'incharge.permitted':null,
        status:"pending",
        markedForReview:null
    }
    console.log(filter);
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else
        {
            console.log("this is result ",result);
            res.status(200).json(result);
        }
    });
});

router.post("/forward/hod/gate",(req,res)=>{
    var filter = {};
    const id = req.body.id;
    if(req.body.year===1){
        filter = {
            _id:id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:req.body.year
        }
    }
    else{
        filter = {
            _id:id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            department:req.body.department,
            year:{$gte:2}
        }
    }
    GatePass.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({err:true});
        }
        else{
            if(result){
                result.sentBy = result.faculty.name;
                result.markedForReview = true;
                result.save();
                res.status(200).json({marked:true});
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/accept/gatepass",(req,res)=>{
    console.log("request");
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:req.body.id, 
            markedForReview:null,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:1
        }
    }
    else{
        filter = {
            _id:req.body.id,
            markedForReview:null,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            department:req.body.facultyDepartment,
            year:{$gte:2}
        }
    }
    GatePass.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(result){ 
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(200).json({error:true});
                    }
                    else{
                        if(student){
                            Faculty.findOne({email:req.body.facultyEmail},(error,faculty)=>{
                                if(error){
                                    res.status(200).json({updated:false});
                                }
                                else{
                                    if(faculty){
                                        faculty.gate_passesss+=1;

                                        result.faculty.name = req.body.facultyName;
                                        result.faculty.email = req.body.facultyEmail;
                                        result.faculty.permitted=true;
                                        result.status = "accepted";
                                        
                                        student.gatePassesss+=1;
                                        faculty.gatePassesss+=1;

                                        faculty.save();
                                        result.save();
                                        student.save();
                                        res.status(200).json(result)
                                    }
                                    else{
                                        res.status(200).json({found_1:false});
                                    }
                                }
                            });
                        }
                        else{
                            res.status(200).json({found_2:false});
                        }
                    }
                });
            }
            else{
                res.status(200).json({found_3:false});
            }
        }
    });
});

router.post("/reject/gatepass",(req,res)=>{
    GatePass.findOne({_id:req.body.id,markedForReview:null},(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(result){
                result.faculty.permitted=false;
                result.status = "rejected";
                result.save();
                res.status(200).json(result);
            }
            else{
                res.status(200).json({found:false});
            }
        }
    });
});

router.post("/history/gatepass",(req,res)=>{
    const filter = {
        'faculty.email':req.body.facultyEmail,
        $or:[
            {'faculty.permitted':false},
            {'faculty.permitted':true},
            
        ],
        $or:[
            {status:'accepted'},
            {status:'rejected'}
        ]
    }
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else
        { 
            res.status(200).json(result);
        }
    });
});

//eventpass

router.post("/get/eventPass",(req,res)=>{
    const filter = {
        endDate:{$gte:req.body.date},
        'faculty.email':req.body.facultyEmail,
        'faculty.permitted':null,
        'incharge.permitted':null,
        status:"pending",
        markedForReview:null,
        status:"pending"
    }
    EventPass.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else
        {
            res.status(200).json(result);
        }
    })
});


router.post("/approve/eventpass",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permitted;
    Faculty.findOne({email:req.body.email},(err,faculty)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(faculty){
                Student.fidnOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            EventPass.findOne({_id:id},(error,result)=>{
                                if(error){
                                    res.status(400).json({error:true});
                                }
                                else{
                                    if(result){
                                        if(permitted){
                                            result.faculty.permitted = true;
                                            result.status = "accepted";

                                            student.eventPassess+=1;

                                            faculty.eventPassess+=1;

                                            result.save();
                                            student.save();
                                            faculty.save();
                                            res.status(200).json({permitted:true});
                                        }
                                        else{
                                            result.faculty.permitted = false;
                                            result.status = "rejected";
                                            result.save();
                                            res.status(200).json({permitted:false});
                                        }
                                    }
                                    else{
                                        res.status(200).json({passfound:false});
                                    }
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
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/history/eventpass",(req,res)=>{
    const filter = {
        'faculty.email':req.body.facultyEmail,
        $or:[
            {'faculty.permitted':true},
            {'faculty.permitted':false}
        ]
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
router.post("/forward/hod/eventpass",(req,res)=>{
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:req.body.id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:req.body.year, 
        }
    }
    else{
        filter = {
            _id:req.body.id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForreview:null,
            status:'pending',
            department:req.body.department,
            year:{$gte:2},
        }
    }
    EventPass.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({err:true});
        }
        else{
            if(result){
                result.sentBy = result.faculty.name;
                result.markedForReview = true;
                result.save();
                res.status(200).json({marked:true});
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })

});

/*sick pass */
router.post("/get/sickpass",(req,res)=>{
    var filter = {};

    if(req.body.year===1){
        filter = {
            gender:req.body.studentGender,
            hodApproved:true,
            year:1
        } 
    }
    else
    {
        filter = {
            gender:req.body.studentGender,
            hodApproved:true,
            department:req.body.department,
            year:{$gte:2}    
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

router.post("/accept/sickpass",(req,res)=>{
    const filter = {
        _id:req.body.id,
        
    }
    Faculty.findOne({email:req.body.email},(err,faculty)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                if(er){
                    res.status(400).json({error:true});
                }
                else
                {
                    if(student){
                        SickPass.findOne(filter,(err,sickpass)=>{
                            if(err){
                                res.status(200).json({error:true});
                            }
                            else
                            {
                                sickpass.faculty.permitted = true
                                sickpass.status = "accepted"
                               
                                faculty.sickPassess+=1;
                                student.sickPassess+=1;
                                
                                student.save();
                                sickpass.save();
                                faculty.save();
                                res.status(200).json({updated:true});
                            }
                        })
                    }
                    else{
                        res.status(200).json({found:false});
                    }
                }
            })
            
        }
    })
});

router.post("/reject/sickpass",(req,res)=>{
    const filter = {
        _id:req.body.id
    }
    Sick.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            result.faculty.permitted= false;
            result.status = "rejected";
            result.save();
            res.status(200).json({updated:true});
        }
    })
});

router.post("/history/sick",(req,res)=>{
    const filter = {
        'faculty.email':req.body.facultyEmail,
        $or:[
            {'faculty.permitted':true},
            {'faculty.permitted':false},
        ],
    }
    Faculty.findOne(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else
        {
            res.status(200).json(result);
        }
    })
});

//other pass
router.post("/get/otherpass",(req,res)=>{
    const year = req.body.year;
    var filter={};
    if(year===1){
        filter = {
            genDate:new Date().toDateString(),
            'faculty.email':req.body.facultyEmail,
            'faculty.permitted':null,
            'incharge.permitted':null,
            markedForReview:null,
            year:1,
            status:"pending"
        }
    }
    else{
        filter = {
            genDate:new Date().toDateString(),
            'faculty.email':req.body.facultyEmail,
            'faculty.permitted':null,
            'incharge.permitted':null,
            year:{$gte:2},
            department:req.body.department,
            markedForReview:null,
            status:"pending"
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

router.post("/accept/otherpass",(req,res)=>{
    const id = req.body.id;
    Faculty.findOne({email:req.body.email},(err,faculty)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(faculty){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        OtherPass.findOne({_id:id},(error,result)=>{
                            if(error){
                                res.status(400).json({error:true});
                            }
                            else
                            {
                                result.faculty.permitted = true;
                                result.status = "accepted";
                                
                                student.otherPassess+=1;

                                faculty.otherPassess+=1;

                                result.save();
                                student.save();
                                faculty.save();
                                res.status(200).json({updated:true});
                            }
                        })
                    }
                })
            }
            else{
                res.status(200).json({faculty_found:false});
            }
        }
    })
});

router.post("/reject/otherpass",(req,res)=>{
    const id = req.body.id;
    OtherPass.findOne({_id:id},(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(result){

                result.faculty.permitted = false;
                result.status = "rejected";
                result.save();
                res.status(200).json({rejected:true});
            }
            else{
                res.status(200).json({passfound:false});
            }
        }
    });
});

router.post("/history/otherpass",(req,res)=>{
    const filter = {
        'faculty.email':req.body.facultyEmail,
        $or:[
            {'faculty.permitted':true},
            {'faculty.permitted':false},
        ]
    }
    OtherPass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post("/forward/hod/otherpass",(req,res)=>{
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:req.body.id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            marked_for_review:null,
            status:'pending',
            year:req.body.year, 
        }
    }
    else{
        filter = {
            _id:req.body.id,
            'faculty.email':req.body.facultyEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            marked_for_review:null,
            status:'pending',
            department:req.body.department,
            year:{$gte:2},
        }
    }
    OtherPass.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(result){
                result.markedForReview = true;
                result.sentBy = result.faculty.name;
                result.save();
            }
            else
            {
                res.status(200).json({found:false});
            }
        }
    })
     
});

//leave

router.post("/get/leave",(req,res)=>{
    var filter = {};
    if(req.body.year===1){
        filter = {
            endDate:{$gte:req.body.date},
            'faculty.email':req.body.facultyEmail,
            'faculty.permitted':null,
            'incharge.permitted':null,
            markedForReview:null,
            acceptedByHod:null,
            status:"pending",
            year:1
        }
    }
    else{
        filter = {
            endDate:{$gte:req.body.date},
            'faculty.email':req.body.facultyEmail,
            'faculty.permitted':null,
            'incharge.permitted':null,
            markedForReview:null,
            acceptedByHod:null,
            status:"pending",
            year:{$gte:2},
            department:req.body.department
        }
    }
    Leave.find(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});

router.post("/approve/leave",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permission;

    Faculty.findOne({email:req.body.email},(err,faculty)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(faculty){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){res.status(400).json({error:true});}
                    else{
                        if(student){
                            Leave.findOne({_id:id},(error,result)=>{
                                if(permitted){
                                    result.faculty.permitted = true;
                                    result.status = "accepted";
                                    
                                    student.leavePass+=1;

                                    faculty.leavePass+=1;

                                    student.save();
                                    result.save();
                                    faculty.save();
                                    res.status(200).json({permitted:true});
                                }
                                else{
                                    result.faculty.permitted = false;
                                    result.status = "rejected";
                                    result.save();
                                    res.status(200).json({permitted:false});
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

router.post("/forward/hod/leave",(req,res)=>{
    const id = req.body.id;
    Leave.findOne({_id:id},(err,leave)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(leave){
                leave.markedForReview = true;
                leave.sentBy =req.body.facultName;
                leave.save();
                res.status(200).json({forward:true});
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/history/leavepass",(req,res)=>{
    const filter = {
        'faculty.email': req.body.facultyEmail,
        $or:[
            {'faculty.permitted':true},
            {'faculty.permitted':false}, 
        ],
    }
    Leave.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
})

router.get("/statistics",(req,res)=>{
    Faculty.find({},(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});



module.exports = router