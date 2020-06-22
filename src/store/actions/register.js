import axios from 'axios'
import {app_config} from '../../config'
import {SET_REGISTER_STAGE, SET_KIT_ID, SET_USER_DATA} from '../actionTypes'
import {setError, removeError} from './messages'
import {setCurrentUser, setActiveKit} from './auth'

export const setRegisterStage = (stage) => ({
    type: SET_REGISTER_STAGE,
    stage
})

export const setKitId = (kitId) => ({
    type: SET_KIT_ID,
    kitId
})

export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData
})

export const handleCheckKitId = (kitId) => {
    return dispatch => {
        axios.defaults.headers.common['Content-Language'] = localStorage.lang;
        return axios.post(`${app_config.api_url}/registerKit?kit_code=${kitId}`)
            .then(res => {
                dispatch(setRegisterStage(2));
                dispatch(removeError('kitCode'));
            })
            .catch(err => {
                dispatch(setError('kitCode', `${err.response.data.errors[0]}.`))
            })
    }
}

export const handleValidateUser = (userData) => {
    const {name, email, phone, gender, date_of_birth, kit_code, password, password_confirmation} = userData;
    return dispatch => {
        axios.defaults.headers.common['Content-Language'] = localStorage.lang;
        return axios.post(`${app_config.api_url}/validatregisterUser?
            name=${name}&email=${email}&phone=${phone}&gender=${gender}&date_of_birth=${date_of_birth}&kit_code=${kit_code}&password=${password}&password_confirmation=${password_confirmation}`)
            .then(res => {
                // console.log(res);
                dispatch(removeError('email'));
                dispatch(setUserData(userData));
                dispatch(setRegisterStage(3));
            })
            .catch(err => {
                // console.log(err.response);
                dispatch(setError('email', err.response.data.errors.email[0]));
            })
    }
}

export const handleCreateUser = (userData) => {
    const {name, email, phone, gender, date_of_birth, kit_code, password, password_confirmation} = userData;
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/registerUser?
                name=${name}&email=${email}&phone=${phone}&gender=${gender}&date_of_birth=${date_of_birth}&kit_code=${kit_code}&password=${password}&password_confirmation=${password_confirmation}`)
                .then(res => {
                    const {token, user} = res.data.data;
                    dispatch(removeError('login'));
                    dispatch(setRegisterStage(1));
                    dispatch(setUserData({}));
                    dispatch(setKitId(''));
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('activeKit', JSON.stringify(user.kits[0]));
                    dispatch(setCurrentUser(user));
                    dispatch(setActiveKit(user.kits[0]));
                    resolve(user);
                })
                .catch(err => {
                    // console.log(err.response);
                    reject();
                })
        });
    }
}


export const handleKitLogin = (email, password, kitId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/loginkituser?email=${email}&password=${password}&kit_code=${kitId}`)
                .then(res => {
                    const {token, user} = res.data.data;
                    dispatch(removeError('error'));
                    dispatch(setRegisterStage(1));
                    dispatch(setKitId(''));
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('activeKit', JSON.stringify(user.kits[0]));
                    dispatch(setCurrentUser(user));
                    dispatch(setActiveKit(user.kits[0]));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    dispatch(setError('error', err.response.data.errors));
                    reject();
                })
        })
    }
}