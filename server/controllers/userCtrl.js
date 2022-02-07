//const {Student, Faculty,Incharge,Hod} = require('../models/usersModel')
const Student = require('../models/studentModel')
const Faculty = require('../models/facultyModel')
const Incharge = require('../models/inchargeModel')
const Hod = require('../models/hodModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const CLIENT_URL = process.env.CLIENT_URL
const userCtrl ={
    register: async (req, res) => {
        console.log("request---:");
        try{
            const {iam, name, rollNo, email, password, contactNo, year, gender, dept} = req.body
            //console.log(req.body)
            if(iam !=="student" && !validateEmail(email)){
                return res.status(400).json({ msg: "Invalid email."}) 
            }
            /*
            1-student
            2-Faculty
            3-Incharge
            4-Hod
            */
           //console.log("----")
           var user ;
            if(iam === "student"){
                 user = await Student.findOne({rollNo}) 
                 if(user) return res.status(400).json({msg: "This Roll Number already exists."})
            }else if(iam ==="faculty"){
                 user = await Faculty.findOne({email}) 
            }else if(iam ==="incharge"){
                 user = await Incharge.findOne({email}) 
            }else if(iam === "hod"){
                 user = await Hod.findOne({email}) 
            }
            console.log("end")
            if(user) return res.status(400).json({msg: "This email already exists."})
            if(password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters."})


            //const passwordHash = await bcrypt.hash(password, 12)
            const passwordHash = password
            let email1='';
            if(iam === 'student'){
                email1 = rollNo +"@cmrcet.ac.in";
            }else{
                email1 = email;
            }
            const newUser ={ 
                iam, name, rollNo, email1, password, contactNo, year, gender, dept
             }

             const activation_token = createActivationToken(newUser)

             const url = `${CLIENT_URL}/user/activate/${activation_token}`
             sendMail(email1, url, "Verify your email address")
             

            res.json({msg: "Register Success! Please activate your email to start. Activation Link sent to your email. Note: Check SPAM"})
        }catch(err){
            return res.status(500).json({msg: `Mail service error try later : ${err}`})

            //return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try{
            const { activation_token} = req.body
            const userinfo = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { iam, name, rollNo, email1, password, contactNo, year, gender, dept} = userinfo
            const email = email1
            var user;
            if(iam === "student"){
                 user = await Student.findOne({rollNo}) 
            }else if(iam ==="faculty"){
                 user = await Faculty.findOne({email}) 
            }else if(iam ==="incharge"){
                 user = await Incharge.findOne({email}) 
            }else if(iam === "hod"){
                 user = await Hod.findOne({email}) 
            }
            if(user) return res.status(400).json({msg: "This email already exists."})

            var newUser ;
            if(iam === "student"){
                //email = email+"@cmrcet.ac.in"
                newUser = new Student({
                    name, rollNo, email, password, contactNo, year, gender, department:dept
                })
           }else if(iam ==="faculty"){
                newUser = new Faculty({
                    name, email, password, contactNo, year, gender, department:dept
                })
           }else if(iam ==="incharge"){
                newUser = new Incharge({
                    name, email, password, contactNo, year, gender, department:dept
                })
           }else if(iam === "hod"){
                newUser = new Hod({
                    name, email, password, contactNo, year, gender, department:dept
                })
           }
            
            await newUser.save()

            res.json({msg: "Account has been activated!"})
        }catch(err){
            return res.status(500).json({msg: err.message + " ACTIVATION"})
        }
    },
    login: async (req, res) => {
        try{
            console.log(req.body)
            const {iam, rollNo, email, password} = req.body

            var user;
            if(iam === "student"){
                 user = await Student.findOne({rollNo}) 
                 if(!user) return res.status(400).json({msg: "This Roll Number does not exist."})
            }else if(iam ==="faculty"){
                 user = await Faculty.findOne({email}) 
            }else if(iam ==="incharge"){
                 user = await Incharge.findOne({email}) 
            }else if(iam === "hod"){
                 user = await Hod.findOne({email}) 
            }

            if(!user) return res.status(400).json({msg: "This email does not exist."})

            //const isMatch = await bcrypt.compare(password, user.password)
            const isMatch = (password === user.password)
            if(!isMatch) return res.status(400).json({ msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            console.log(refresh_token)
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7days
            })

            res.json({msg: "Login success!", refreshtoken:refresh_token, iam })
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            //console.log("accestoken ------------")
            //console.log(req.body.refreshtoken)
            //const rf_token = req.cookies.refreshtoken
            //console.log(rf_token)
            const rf_token = req.body.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
                if(err) return res.status(400).json({msg: "Please login now!"})
                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
            
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        console.log(req.body)
        try{
            const {iam, email} = req.body
            var user;
            if(iam === "student"){
                 user = await Student.findOne({email}) 
                 if(!user) return res.status(400).json({msg: "This Roll Number does not exist."})
            }else if(iam ==="faculty"){
                 user = await Faculty.findOne({email}) 
            }else if(iam ==="incharge"){
                 user = await Incharge.findOne({email}) 
            }else if(iam === "hod"){
                 user = await Hod.findOne({email}) 
            }
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url =`${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Password reset link has been sent to your email."})
        }catch(err){
            return res.status(500).json({msg: "Mail service error try later", err})
            
            //return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try{
            const {iam, password} = req.body
            //const passwordHash = await bcrypt.hash(password, 12)
            const passwordHash = password
            
            if(iam === "student"){
                await Student.findOneAndUpdate({ _id: req.user.id}, {
                    password: passwordHash
                })
            }else if(iam ==="faculty"){
                await Faculty.findOneAndUpdate({ _id: req.user.id}, {
                    password: passwordHash
                }) 
            }else if(iam ==="incharge"){
                await Incharge.findOneAndUpdate({ _id: req.user.id}, {
                    password: passwordHash
                }) 
            }else if(iam === "hod"){
                await Hod.findOneAndUpdate({ _id: req.user.id}, {
                    password: passwordHash
                }) 
            }
            res.json({msg: "Password successfully changed!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try{
            const {id} = req.user
            const {iam} = req.body 
            console.log("getUserInfo: ")
            var user;
            if(iam === "student"){
                console.log("student = "+id)
                 user = await Student.findById({_id: id}).select('-password')
            }else if(iam ==="faculty"){
                 user = await Faculty.findById({_id:id}).select('-password') 
            }else if(iam ==="incharge"){
                 user = await Incharge.findById({_id:id}).select('-password') 
            }else if(iam === "hod"){
                 user = await Hod.findById({_id:id}).select('-password') 
            }
            
            console.log(user)
            res.json({user,iam})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try{
            const students = await Student.find().select('-password')
            const faculty = await Faculty.find().select('-password')
            const incharge = await Incharge.find().select('-password')
            const hod = await Hod.find().select('-password')
            res.json({students, faculty, incharge, hod})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out."})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try{
            const {iam, avatar, contactNo} = req.body
            console.log(req.user)
            const id = req.user.id;
            console.log("Upload : "+id)
            var user;
            if(iam === "student"){
                console.log("student = "+id)
                 await Student.findOneAndUpdate({_id: id}, {
                    avatar, contactNo
                })
            }else if(iam ==="faculty"){
                await Faculty.findOneAndUpdate({_id: id}, {
                    avatar, contactNo
                }) 
            }else if(iam ==="incharge"){
                await Incharge.findOneAndUpdate({_id: id}, {
                    avatar, contactNo
                })
            }else if(iam === "hod"){
                await Hod.findOneAndUpdate({_id: id}, {
                    avatar, contactNo
                })
            }
            res.json({msg: "Update Success!"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },/*
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }*/
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m'})
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d'})
}
module.exports = userCtrl