import ACTIONS from "../actions";
const initialState = {
    user: [],
    iam:"",
    isLogged: false,
    accType: "0"
}
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
                return {
                    ...state,
                    isLogged: true
                }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                iam: action.payload.iam,
                accType: action.payload.accType
            }
        case ACTIONS.UPDATE_AVATAR:
            return {
                ...state,
                user: state.user['avatar'] = action.payload 
            } 
        default:
                return state
    }
}
export default authReducer