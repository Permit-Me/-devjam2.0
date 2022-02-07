const router = require('express').Router()
const inchargeCtrl = require('../controllers/inchargeCtrl')
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


router.post('/data', inchargeCtrl.getIncharge)

//shivasai 
/*gatepass */
router.post("/get/gatepass",(req,res)=>{
    var filter = {};
    if(req.body.year===1){
        filter = {
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:"pending",
            year:req.body.year,
        }
    }
    else{  
        filter = {
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:"pending",
            department:req.body.inchargeDepartment,
            year:req.body.year,
        }
    }
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            console.log(result);
            res.status(200).json(result);
        }
    })
});
router.post("/accept/gatepass",(req,res)=>{
    const id = req.body.id;
    var filter = {};
    if(req.body.year===1){
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:req.body.year,
        } 
    }
    else{
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            department:req.body.inchargeDepartment,
            year:req.body.year,
        }
    }
    GatePass.findOne(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else
        {
            if(result){
                Student.findOne({rollNo:req.body.rollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else
                    {
                        if(student){    
                            Incharge.findOne({email:req.body.inchargeEmail},(error,incharge)=>{
                                if(error){
                                    res.status(400).json({error:false});
                                }
                                else{
                                    if(incharge){
                                        result.incharge.name=req.body.inchargeName;
                                        result.incharge.email=req.body.inchargeEmail;
                                        result.incharge.permitted=true;
                                        result.status="accepted";

                                        student.gatePassesss+=1;
                                        incharge.gatePassesss+=1;
                                        student.save();
                                        incharge.save();
                                        result.save();
                                        res.status(200).json({updated:true});
                                    }
                                    else
                                    {
                                        res.status(200).json({found:false});
                                    }
                                }
                            });
                        }
                    }
                });  
            }
            else
            {
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/reject/gatepass",(req,res)=>{
    const id = req.body.id;
    const filter = {
        _id:id,
        'incharge.email':req.body.inchargeEmail,
        'incharge.permitted':null,
        'faculty.permitted':null,
        markedForReview:null,
        status:'pending',
        department:req.body.inchargeDepartment,
        year:req.body.inchargeYear,
    }
    GatePass.findOne(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else
        {
            if(result){
                result.incharge.name=req.body.inchargeName;
                result.incharge.email=req.body.inchargeEmail;
                result.incharge.permitted=false;
                result.status="rejected";
                result.save();
                res.status(200).json({updated:true});
            }
            else
            {
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/forward/hod/gate",(req,res)=>{
    const id = req.body.id;
    const year = req.body.year;
    var filter = {};
    if(year===1){
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:1,
        }
    }
    else{
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            department:req.body.department,
            year:{$gte:2},
        }
    }
    GatePass.findOne(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(result){
                result.markedForReview = true;
                result.sentBy = result.incharge.name;
                result.save();
                res.status(200).json({forward:true});
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/history/gatepass",(req,res)=>{
    const filter = {
        'incharge.email': req.body.inchargeEmail,
        $or:[
            {'incharge.permitted':true},
            {'incharge.permitted':false}, 
        ],
        $or:[
            {status:"accepted"},
            {status:"rejected"}
        ]
    }
    GatePass.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });
});

/*otherpass */

router.post("/get/otherpass",(req,res)=>{
    const year = req.body.year;
    var filter={};
    if(year===1){
        filter = {
            genDate:new Date().toDateString(),
            'faculty.permitted':null,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            year:1,
            status:"pending"
        }
    }
    else{
        filter = {
            genDate:new Date().toDateString(),
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            year:req.body.year,
            department:req.body.inchargeDepartment,
            status:"pending"
        }
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

router.post("/accept/otherpass",(req,res)=>{
    const id = req.body.id;
    Incharge.findOne({email:req.body.inchargeEmail},(er,incharge)=>{
        if(er){
            res.status(400).json({error:true});
        }
        else{
            if(incharge){
                Student.findOne({rollNo:req.body.studentRollno},(err,student)=>{
                    if(err){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            Other.findOne({_id:id},(error,result)=>{
                                if(error){
                                    res.status(400).json({error:true});
                                }
                                else{
                                    if(result){
                                        result.incharge.permitted = true;
                                        result.status = "accepted";

                                        student.otherPassess+=1;

                                        incharge.otherPassess+=1;

                                        result.save();
                                        student.save();
                                        incharge.save();

                                        res.status(200).json({updated:true});
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
            else
            {
                res.status(200).json({inchargeFound:false});
            }
        }
    })
});

router.post("/reject/otherpass",(req,res)=>{
    const id = body.req.id;
    OtherPass.findOne({_id:id},(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{

            if(result){
                result.incharge.permitted = false;
                result.status = "rejected";
                result.save();
                res.status(200).json({rejected:true});
            }
            else{
                res.status(200).json({passfound:false});
            }
        }
    })
});

router.post("/forward/hod/otherpass",(re,res)=>{
    var filter = {};
    const id = req.body.id;
    if(req.body.year===1){
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:1, 
        }
    }
    else{
        filter = {
            _id:id,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            markedForReview:null,
            status:'pending',
            year:req.body.year,
        }
    }
    OtherPass.findOne(filter,(err,result)=>{
        if(err){
            res.status(200).json({error:true});
        }
        else{
            if(result){
                result.markedForReview = true;
                result.sentBy = result.incharge.name;
                result.save();
                res.status(200).json({forwarded:true});
            }
            else{
                res.status(200).json({passFound:false});
            }
        }
    })

});

router.post("/history/otherpass",(req,res)=>{  
    const filter = {
        'incharge.email': req.body.inchargeEmail,
        $or:[
            {'incharge.permitted':true},
            {'incharge.permitted':false}, 
        ],
    }
    OtherPass.findOne(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
});

/* leave pass */

router.post("/get/leave",(req,res)=>{
    var filter={};
    if(year===1){
        filter = {
            genDate:new Date().toDateString(),
            'faculty.permitted':null,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            year:1,
            status:"pending"
        }
    }
    else{
        filter = {
            gen_date:new Date().toDateString(),
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            year:req.body.year,
            department:req.body.department,
            status:"pending"
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

router.post("/approve/leavepass",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permission;
    Incharge({email:req.body.inchargeEmail},(err,incharge)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(incharge){
                Student.findOne({rollNo:req.body.studentRollNo},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            Leave({_id:id},(error,result)=>{
                                if(error){
                                    res.status(400).json({error:true});
                                }
                                else{
                                    if(result){
                                        if(permitted){
                                            result.incharge.permitted = true;
                                            result.status = "accepted";

                                            student.leavePass+=1;

                                            incharge.leavePassess+=1;

                                            result.save();
                                            student.save();
                                            incharge.save();
                                            res.status(200).json({permitted:true});
                                        }
                                        else{
                                            result.incharge.permitted = false;
                                            result.status = "rejected";

                                            result.save();
                                            res.status(200).json({permitted:false});
                                        }
                                    }
                                    else{
                                        res.status(200).json({found:true});
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

router.post("/forward/hod/leave",(req,res)=>{
    const id = req.body.id;
    Leave.findOne({_id:id},(err,leave)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(leave){
                leave.markedForReview = true;
                leave.sentBy =req.body.sentBy;
                leave.save();
                res.status(200).json({forward:true});
            }
            else{
                res.status(200).json({found:false});
            }
        }
    })
});

router.post("/history/leave",(req,res)=>{
    const filter = {
        'incharge.email': req.body.inchargeEmail,
        $or:[
            {'incharge.permitted':true},
            {'incharge.permitted':false}, 
        ]
    }
    Leave.find(filter,(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    });   
})

/*Event pass */
router.post("/get/eventpass",(req,res)=>{
    var filter={};
    if(req.body.year===1){
        filter = {
            genDate:new Date().toDateString(),
            'faculty.permitted':null,
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            year:1,
            status:"pending"
        }
    }
    else{
        filter = {
            gen_date:new Date().toDateString(),
            'incharge.email':req.body.inchargeEmail,
            'incharge.permitted':null,
            'faculty.permitted':null,
            year:req.body.year,
            department:req.body.department,
            status:"pending"
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

router.post("/approve/event",(req,res)=>{
    const id = req.body.id;
    const permitted = req.body.permitted;
    Incharge.findOne({email:req.body.inchargeEmail},(err,incharge)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            if(incharge){
                Student.fidnOne({rollNo:req.body.rollno},(er,student)=>{
                    if(er){
                        res.status(400).json({error:true});
                    }
                    else{
                        if(student){
                            Event.findOne({_id:id},(error,result)=>{
                                if(error){
                                    res.status(400).json({error:true});
                                }
                                else{
                                    if(result){
                                        if(permitted){
                                            result.incharge.permitted = true;
                                            result.status = "accepted";

                                            student.eventPassess+=1;

                                            incharge.eventPassess+=1;

                                            result.save();
                                            student.save();
                                            incharge.save();
                                            res.status(200).json({permitted:true});
                                        }
                                        else{
                                            result.incharge.permitted = false;
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

router.post("/forward/hod",(req,res)=>{
    const id = req.body.id;
    EventPass.findOne({_id:id},(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            result.markedForReview = true;
            result.sentBy = result.incharge.name,
            result.save();
            res.status(200).json({marked:true})
        }   
    })
});

router.post("/history/eventpass",(req,res)=>{
    const filter = {
        'incharge.email':req.body.inchargeEmail,
        $or:[
            {'incharge.permitted':true},
            {'incharge.permitted':false},
        ],
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

router.get("/statistics",(req,res)=>{
    Incharge.find({},(err,result)=>{
        if(err){
            res.status(400).json({error:true});
        }
        else{
            res.status(200).json(result);
        }
    })
})

module.exports = router