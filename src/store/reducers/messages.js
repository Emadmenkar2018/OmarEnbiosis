import {SET_SUCCESS, SET_ERROR, REMOVE_SUCCESS, REMOVE_ERROR} from '../actionTypes'

const INITIAL_STATE = {
    success: '',
    error: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_SUCCESS:
            return {
                ...state,
                success: action.message
            };
        case SET_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    [action.errType]: action.message
                }
            };
        case REMOVE_SUCCESS:
            return {
                ...state,
                success: ''
            }
        case REMOVE_ERROR:
            let error = {...state.error}
            delete error[action.errType]
            return {
                ...state,
                error
            }
        default:
            return state;
    }
}