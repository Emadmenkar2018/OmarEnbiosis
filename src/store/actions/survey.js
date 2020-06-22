import axios from 'axios'
import {SET_SURVEY, SET_ANSWER} from '../actionTypes'
import {app_config} from '../../config'
import {getUser} from './auth'

export const setSurvey = (survey) => ({
    type: SET_SURVEY,
    survey
});

export const setAnswer = (sIndex, qIndex, answer) => ({
    type: SET_ANSWER,
    sIndex,
    qIndex,
    answer
});

export const handleGetSurvey = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/survey/${kitCode}`)
                .then(res => {
                    dispatch(setSurvey(res.data.data))
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    reject();
                })
        })
    }
}

export const handleSetQuestionAnswer = (sIndex, qIndex, answer) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            return axios.post(`${app_config.api_url}/user/survey/answers`, answer)
                .then(res => {
                    // console.log(res);
                    dispatch(setAnswer(sIndex, qIndex, answer));
                    if(answer.end){
                        dispatch(getUser(localStorage.userToken));
                    }
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    reject();
                })
        })
    }
}