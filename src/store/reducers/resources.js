import {SET_RESOURCES} from '../actionTypes'

export default (state=[], action) => {
    switch(action.type){
        case SET_RESOURCES:
            return [...action.resources]
        default:
            return state;
    }
}