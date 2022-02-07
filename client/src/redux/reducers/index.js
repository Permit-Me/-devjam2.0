import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import error from './errorReducer'
import faculty from './facultyReducer'
import incharge from './inchargeReducer'
import request from './requestReducer'
export default combineReducers({
    auth,
    token,
    users,
    error,
    faculty,
    incharge,
    request
})