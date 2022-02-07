import ACTIONS from "./index";
// LOAD_REQUESTS
export const loadGatePassAct = (res) => {
    return {
        type: ACTIONS.LOAD_GATEPASS,
        payload: {res}
    }
}
export const loadSickPassAct = (res) => {
    return {
        type: ACTIONS.LOAD_SICKPASS,
        payload: {res}
    }
}
export const loadEventPassAct = (res) => {
    return {
        type: ACTIONS.LOAD_EVENTPASS,
        payload: {res}
    }
}
export const loadOtherPassAct = (res) => {
    return {
        type: ACTIONS.LOAD_OTHERPASS,
        payload: {res}
    }
}
export const loadLeaveAct = (res) => {
    return {
        type: ACTIONS.LOAD_LEAVE,
        payload: {res}
    }
}
export const updateGatePassAct = (id, data) => {
    return {
        type: ACTIONS.UPDATE_GATEPASS,
        payload: {id, data}
    }
}

export const updateSickPassAct = (id, data) => {
    return {
        type: ACTIONS.UPDATE_SICKASS,
        payload: {id, data}
    }
}

export const updateEventPassAct = (id, data) => {
    return {
        type: ACTIONS.UPDATE_EVENTPASS,
        payload: {id, data}
    }
}

export const updateOtherPassAct = (id, data) => {
    return {
        type: ACTIONS.UPDATE_OTHERPASS,
        payload: {id, data}
    }
}

export const updateLeaveAct = (id, data) => {
    return {
        type: ACTIONS.UPDATE_LEAVE,
        payload: {id, data}
    }
}

