import axios from 'axios';
import {SET_CURRENT_USER, SET_ACTIVE_KIT} from '../actionTypes'
import {app_config} from '../../config'
import {clearResults} from './myResults'
import {clearFoods} from './myFoods'
import {setSurvey} from './survey'
import { setError, removeError, setSuccess } from './messages';

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
})

export const setActiveKit = (activeKit) => ({
    type: SET_ACTIVE_KIT,
    activeKit
});

export const authUser = (userData) => {
    const {email, password} = userData;
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/login?email=${email}&password=${password}`)
                .then(res => {
                    const {token, user} = res.data.data;
                    localStorage.setItem('userToken', token);
                    localStorage.setItem('activeKit', JSON.stringify(user.kits[0]));
                    dispatch(removeError('login'));
                    dispatch(setCurrentUser(user));
                    dispatch(setActiveKit(user.kits[0]));
                    resolve(user);
                })
                .catch(err => {
                    // console.log(err.response);
                    dispatch(setError('login', err.response.data.errors));
                    reject();
                })
        });
    }
}

export const handleSendVerificationCode = () => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
        axios.defaults.headers.common['Content-Language'] = localStorage.lang;
        return axios.post(`${app_config.api_url}/user/email`)
            .then(res => {
                // console.log(res);
                resolve();
            })
            .catch(err => {
                // console.log(err.response);
                reject();
            });
    })
}

export const handleCheckVerificationCode = (verifyCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/user/email/verify?verify_code=${verifyCode}`)
                .then(res => {
                    // console.log(res);
                    dispatch(removeError('verifyCode'));
                    dispatch(setCurrentUser(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    if(err.response !== undefined){
                        dispatch(setError('verifyCode', err.response.data.errors.verify_code));
                    }
                    reject();
                })
        })
    }
}

export const getUser = (token) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user`)
                .then(res => {
                    const user = res.data.data;
                    const kit_code = JSON.parse(localStorage.activeKit).kit_code;
                    const activeKit = user.kits.find(kit => kit.kit_code === kit_code);
                    localStorage.setItem('activeKit', JSON.stringify(activeKit));
                    dispatch(setCurrentUser(user));
                    dispatch(setActiveKit(activeKit));
                    resolve(user);
                })
                .catch(err => {
                    // console.log(err.response);
                    reject();
                })
        });
    }
}

export const handleSetActiveKit = (activeKit) => {
    return dispatch => {
        localStorage.setItem('activeKit', JSON.stringify(activeKit));
        dispatch(setActiveKit(activeKit));
        dispatch(clearResults());
        dispatch(clearFoods());
        dispatch(setSurvey({}));
    }
}

export const handleResetPasswordCheckEmail = (email) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/password/reset?email=${email}`)
                .then(res => {
                    dispatch(removeError('email'));
                    dispatch(setSuccess(res.data.message));
                    resolve();                
                })
                .catch(err => {
                    if(err.response !== undefined){
                        dispatch(setError('email', err.response.data.errors.email));
                    }
                    reject();
                })
        })
    }
}

export const handleResetPassword = (password, passwordRe, token) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.api_url}/password/checkAndReset?password=${password}&password_confirmation=${passwordRe}&token=${token}`)
                .then(res => {
                    // console.log(res);
                    dispatch(removeError('token'));
                    dispatch(setSuccess('Şifreniz Başarıyla Değiştirildi.'));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    if(err.response){
                        dispatch(setError('token', err.response.data.errors[0]));
                    }
                    reject();
                })
        })
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('activeKit');
        dispatch(setCurrentUser({}));
        dispatch(clearResults());
        dispatch(clearFoods());
        dispatch(setSurvey({}));
    }
}