import axios from 'axios'
import React ,{useState}from 'react'
import { useParams } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { isLength, isMatch } from '../../utils/validation/Validation'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams() 
    const {password, cf_password, err, success }= data

    const handleChangeInput =  e =>{
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})
        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        try{
            const res = await axios.post('/user/reset', { password} , {
                headers: {Authorization: token}
            })

            setData({...data, err:'', success: res.data.msg})

        }catch(err){
            err.response.data.msg &&
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="container-fluid">
            
            <div className="row justify-content-center pt-5">
            <div className="col-10 col-md-5">
                <h2 className="text-center">Reset Your Password</h2>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <div className="pb-3 pt-4">
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-control form-control-lg" type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />
                </div>
                <div className="pb-3">
                <label className="form-label" htmlFor="cf_password">Confirm Password</label>
                <input className="form-control form-control-lg" type="password" name="cf_password" id="cf_password" value={cf_password}
                    onChange={handleChangeInput} />
                </div>
                <div className="pb-3">
                <button className="btn btn-info btn-lg btn-block" onClick={handleResetPass}>Reset Password</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ResetPassword
