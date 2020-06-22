import axios from 'axios'
import {app_config} from '../../config'
import {
    SET_MICRO_TEST_RESULT, 
    SET_ALL_SCORES, 
    SET_ALL_SCORES_PDF, 
    SET_TAXONOMIC_RESULT, 
    SET_TAX_FOR_PDF, 
    SET_CLOSE_PROFILES, 
    SET_IMPORTANT_MICROS, 
    CLEAR_RESULTS
} from '../actionTypes'

export const setMicroTestResult = (microTestResult) => ({
    type: SET_MICRO_TEST_RESULT,
    microTestResult
})

export const setAllScores = (allScores) => ({
    type: SET_ALL_SCORES,
    allScores
})

export const setAllScoresPDF = (allScoresPDF) => ({
    type: SET_ALL_SCORES_PDF,
    allScoresPDF
})

export const setTaxonomicResult = (taxonomicResult) => ({
    type: SET_TAXONOMIC_RESULT,
    taxonomicResult
})

export const setTaxForPDF = (taxForPDF) => ({
    type: SET_TAX_FOR_PDF,
    taxForPDF
})

export const setCloseProfiles = (closeProfiles) => ({
    type: SET_CLOSE_PROFILES,
    closeProfiles
})

export const setImportantMicros = (importantMicros) => ({
    type: SET_IMPORTANT_MICROS,
    importantMicros
})

export const clearResults = () => ({
    type: CLEAR_RESULTS
})

export const handleGetAllScores = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/all-scores?kit_code=${kitCode}`)
                .then(res => {
                    // console.log(res);
                    dispatch(setAllScores(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetTaxonomicResult = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/taksonomik?kit_code=${kitCode}`)
                .then(res => {
                    // console.log(res);
                    dispatch(setTaxonomicResult(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetCloseProfiles = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/close-profle?kit_code=${kitCode}`)
                .then(res => {
                    dispatch(setCloseProfiles(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetImportantMicros = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/bacteria?kit_code=${kitCode}`)
                .then(res => {
                    dispatch(setImportantMicros(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    reject(err.response.data.errors);
                })
        })
    }
}