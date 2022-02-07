import ACTIONS from "../actions";
const initialState = {
    incharge: {},
    loaded: false
}
const inchargeReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOAD_INCHARGE:
                return {
                    ...state,
                    incharge: action.payload,
                    loaded: true
                }
        default:
                return state
    }
}
export default inchargeReducer