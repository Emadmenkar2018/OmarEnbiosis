import {SET_ACTIVE_SIDE_ITEM, SHOW_SIDE_NAVBAR} from '../actionTypes'

const INITIAL_STATE = {
    activeItem: 'home',
    showSideNavbar: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case SET_ACTIVE_SIDE_ITEM:
            return {
                ...state,
                activeItem: action.activeItem
            }
        case SHOW_SIDE_NAVBAR:
            return {
                ...state,
                showSideNavbar: action.showSideNavbar
            }
        default:
            return state
    }
}