import {SET_VEGETARIAN_STATUS} from '../actionTypes'

export const setVegStatus = (checked) => ({
    type: SET_VEGETARIAN_STATUS,
    checked
})