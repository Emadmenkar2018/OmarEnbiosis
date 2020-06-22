import {SET_ACTIVE_SIDE_ITEM, SHOW_SIDE_NAVBAR} from '../actionTypes'
import { setActiveLanguage } from 'react-localize-redux'
import { clearResults } from './myResults'
import { clearFoods } from './myFoods'
import { setSurvey } from './survey'

export const setActiveSideItem = (activeItem) => ({
    type: SET_ACTIVE_SIDE_ITEM,
    activeItem
})

export const toggleSideNavbar = (showSideNavbar) => ({
    type: SHOW_SIDE_NAVBAR,
    showSideNavbar
})

export const handleSetLanguage = (lang) => {
    return dispatch => {
        localStorage.setItem('lang', lang)
        dispatch(setActiveLanguage(lang));
        dispatch(clearResults());
        dispatch(clearFoods());
        dispatch(setSurvey({}));
    }
}