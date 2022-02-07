import ACTIONS from "../actions";
const initialState = {
    gatepass: [],
    sickpass: [],
    eventpass:[],
    otherpass:[],
    leave:[]
}
const requestReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOAD_GATEPASS:
                return {
                    ...state,
                    gatepass: action.payload
                }
        case ACTIONS.LOAD_SICKPASS:
            return {
                ...state,
                sickpass: action.payload
            }
        case ACTIONS.LOAD_EVENTPASS:
            return {
                ...state,
                eventpass: action.payload
            }
        case ACTIONS.LOAD_OTHERPASS:
            return {
                ...state,
                otherpass: action.payload
            }
        case ACTIONS.LOAD_LEAVE:
                return {
                    ...state,
                    leave: action.payload
                }
        case ACTIONS.UPDATE_GATEPASS:
            return {
                ...state,
                gatepass: state.gatepass.map((req) => {
                    if(req._id=== action.payload.id){
                        req.status = action.payload.data;
                    }
                    return req;
                })
            }
        case ACTIONS.UPDATE_SICKASS:
            return {
                ...state,
                sickpass: state.sickpass.map((req) => {
                    if(req._id=== action.payload.id){
                        req.status = action.payload.data;
                    }
                    return req;
                })
            }
            case ACTIONS.UPDATE_EVENTPASS:
                return {
                    ...state,
                    eventpass: state.eventpass.map((req) => {
                        if(req._id=== action.payload.id){
                            req.status = action.payload.data;
                        }
                        return req;
                    })
                }
            case ACTIONS.UPDATE_OTHERPASS:
                    return {
                        ...state,
                        otherpass: state.otherpass.map((req) => {
                            if(req._id=== action.payload.id){
                                req.status = action.payload.data;
                            }
                            return req;
                        })
                    }
            case ACTIONS.UPDATE_LEAVE:
                        return {
                            ...state,
                            leave: state.leave.map((req) => {
                                if(req._id=== action.payload.id){
                                    req.status = action.payload.data;
                                }
                                return req;
                            })
                        }
        default:
                return state
    }
}
export default requestReducer