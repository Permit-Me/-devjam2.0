import ACTIONS from "../actions";
const initialState = {
    faculty: [],
    loaded: false
}
const facultyReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOAD_FACULTY:
                return {
                    ...state,
                    faculty: action.payload.faculty,
                    loaded: true
                }
        case ACTIONS.ADD_FACULTY:
            return {
                ...state,
                faculty: [state.faculty.filter(fac => { if(fac._id === action.payload.res){
                        fac.hodApproved = 'true'
                    }
                    return fac}
                )]
            }
        case ACTIONS.REMOVE_FACULTY:
                return {
                    ...state,
                    faculty: [state.faculty.filter(fac => { if(fac._id === action.payload.res){
                        fac.hodApproved = 'false'
                    }
                    return fac})]
                }
        case ACTIONS.CLEAR_FACULTY:
                return {
                    ...state,
                    faculty: [],
                    loaded: false
                }
        default:
                return state
    }
}
export default facultyReducer