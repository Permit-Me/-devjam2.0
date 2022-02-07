require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
})
  
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))
//Routes
app.use('/api/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api/request', require('./routes/studentPassRequestRouter'))
app.use('/api/hod', require('./routes/hodRouter'))
app.use('/api/incharge', require('./routes/inchargeRouter'))
app.use('/api/faculty', require('./routes/FacultyRouter'))


//app.use('/api', require('./routes/upload'))

// app.use('/', (req, res, next) => {
//     res.json({ msg: "You Hacker 😆"})
//     next()
// })
//Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) console.log("Error: ",err);
    console.log("Connected to mongodb")
})

app.listen(PORT, () =>{
    console.log('Server is running on port ', PORT);
});