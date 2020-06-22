import {SET_SUCCESS, SET_ERROR, REMOVE_SUCCESS, REMOVE_ERROR} from '../actionTypes'

export const setSuccess = message => ({
    type: SET_SUCCESS,
    message
});

export const setError = (errType, message) => ({
    type: SET_ERROR,
    errType,
    message
});

export const removeSuccess = () => ({
    type: REMOVE_SUCCESS
});

export const removeError = (errType) => ({
    type: REMOVE_ERROR,
    errType
});