import axios from "axios";
import ACTIONS from "./index";

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor',{
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser =  (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.user,
            iam: res.iam,
            accType: res?.user?.role
        }
    }
}
export const updateAvatarAction = (res) => {
    return {
            trype: ACTIONS.UPDATE_AVATAR,
            payload: res
    }
} 