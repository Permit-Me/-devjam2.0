import ACTIONS from "./index";
// RETURN ERRORS
export const loadFaculty = (res) => {
    console.log(res)
    return {
        type: ACTIONS.LOAD_FACULTY,
        payload: { faculty: res }
    }
}

export const addFacultyAct = (res) => {
    return {
        type: ACTIONS.ADD_FACULTY,
        payload: { res }
    }
}
export const removeFacultyAct = (res) => {
    return {
        type: ACTIONS.REMOVE_FACULTY,
        payload: { res }
    }
}

export const clearFacultyAct = (res) => {
    return {
        type: ACTIONS.CLEAR_FACULTY
    }
}
