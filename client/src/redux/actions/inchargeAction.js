import ACTIONS from "./index";

export const loadIncharge = (res) => {
    return {
        type: ACTIONS.LOAD_INCHARGE,
        payload: res
    }
}
