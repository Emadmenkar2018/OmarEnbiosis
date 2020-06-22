import {SET_CURRENT_USER, SET_ACTIVE_KIT} from '../actionTypes'

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    activeKit: localStorage.activeKit ? JSON.parse(localStorage.activeKit) : {}
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        case SET_ACTIVE_KIT:
            return {
                ...state,
                activeKit: {...action.activeKit}
            }
        default:
            return state;
    }
}