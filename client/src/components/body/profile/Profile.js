import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'
import { updateAvatarAction } from '../../../redux/actions/authActions'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    address:'',
    contactNo:'',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, iam, accType} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, address, contactNo, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(accType === 1){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, accType, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file){
                setData({...data, err: "No files were uploaded." , success: ''})
                return showErrMsg("No files were uploaded.");
            }

            if(file.size > 1024 * 1024){
                setData({...data, err: "Size too large." , success: ''})
                return showErrMsg("Size too large.")
            }

            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                setData({...data, err: "File format is incorrect." , success: ''})
                return showErrMsg("File format is incorrect.")
            }

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            showErrMsg(err?.response?.data?.msg)
        }
    }

    const updateInfor = async () => {
        try {
            await axios.patch('/user/update', {
                avatar: avatar ? avatar : user.avatar,
                contactNo: contactNo? contactNo : user.contactNo,
                iam
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Update Success!"})
            //dispatch(updateAvatarAction(avatar))
            showSuccessMsg("Update Success!")
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            showErrMsg(err?.response?.data?.msg)
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar || address || contactNo) updateInfor()
        if(password) updatePassword()
    }

    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoading(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const avatarStyle = {
        "height": "150px",
        "width": "150px"
    }
    const userRole = (r) => {
        if(r === 1){
            return <i className="fas fa-user-shield" title="Admin"></i>
        }
        else if(r === 2){ 
            return <i className="fab fa-vuejs" title="Vendor" ></i>
        }
        return <i className="fas fa-users" title="User"></i>
    }
    return (
        <>
        <div>
            {loading && <h3>Loading.....</h3>}
        </div>
        <div className="container-fluid m-1">
            <div className="row">
            <div className={"col-12 "+ (accType === 1? "col-lg-4" : '' ) + " d-flex justify-content-center "}>
                <div className={"col-12 col-sm-6 "+(accType === 1? "col-lg-10":"col-lg-6")}>
                <h2 className="text-center">{accType === 1 ? "Admin Profile": "User Profile"}</h2>

                <div className="avatar mb-2">
                    <img src={avatar ? avatar : user?.avatar} alt="" style={avatarStyle} />
                    <span>
                        <p>Profile Image Change <i className="fas fa-camera"></i></p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} className="form-control form-control-lg" />
                    </span>
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user?.name}
                    placeholder="Your name" onChange={handleChange} className="form-control form-control-lg"/>
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user?.email}
                    placeholder="Your email address" disabled className="form-control form-control-lg" />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} className="form-control form-control-lg" />
                </div>

                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChange} className="form-control form-control-lg"/>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="contactNo">Contact No</label>
                    <input type="text" name="contactNo" id="contactNo" defaultValue={user?.contactNo}
                    placeholder="Your contact No" onChange={handleChange} className="form-control form-control-lg"/>
                </div>

                <div className="mb-2">
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                <button  onClick={handleUpdate} className="btn btn-info btn-lg btn-block mb-3" disabled={loading}>Update</button>
                </div>
            </div>
            {accType === 1 ?
            <div className="col-12 col-lg-8 text-center ">
                <h2>Users</h2>
                <div style={{overflowX: "auto"}}>
                    <table className="table table-bordered customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.users?.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                userRole(user.role)
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            :
            null}
            </div>
        </div>
        </>
    )
}

export default Profile