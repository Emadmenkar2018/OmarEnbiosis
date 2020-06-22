import {SET_REGISTER_STAGE, SET_KIT_ID, SET_USER_DATA} from '../actionTypes'

const INITIAL_STATE = {
    currentStage: 1,
    kitId: '',
    userData: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_REGISTER_STAGE:
            return {
                ...state,
                currentStage: action.stage
            }
        case SET_KIT_ID:
            return {
                ...state,
                kitId: action.kitId
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state;
    }
}