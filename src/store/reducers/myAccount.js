import {SET_VEGETARIAN_STATUS} from '../actionTypes'

const INITIAL_STATE = {
    isVeg: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_VEGETARIAN_STATUS:
            return {
                isVeg: action.checked
            }
        default:
            return state;
    }
}