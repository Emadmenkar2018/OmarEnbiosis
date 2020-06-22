import axios from 'axios'
import {app_config} from '../../config'
import {SET_RESOURCES} from '../actionTypes'

export const setResources = (resources) => ({
    type: SET_RESOURCES,
    resources
})

export const handleGetResources = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/resources`)
                .then(res => {
                    // console.log(res);
                    dispatch(setResources(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    reject(err.response.data.errors);
                })
        })
    }
}