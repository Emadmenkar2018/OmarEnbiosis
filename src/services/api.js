import axios from 'axios'
import {app_config} from '../config'
import {setMicroTestResult, setAllScores, setAllScoresPDF, setCloseProfiles, setTaxForPDF} from '../store/actions/myResults'
import {setAllFoods, setFoodTypes, setFoodsToDisplay} from '../store/actions/myFoods'
import {setSuccess} from '../store/actions/messages'

export const handleGetAnalizeData = (kitCode, isPDF) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            const getMicroTestResult = axios.get(`${app_config.api_url}/user/kit/Age-Range?kit_code=${kitCode}`);
            const url = isPDF ? `${app_config.api_url}/user/kit/all-scores/pdf?kit_code=${kitCode}` : 
                `${app_config.api_url}/user/kit/all-scores?kit_code=${kitCode}`;
            const getAllScores = axios.get(url);
            const getCloseProfiles = axios.get(`${app_config.api_url}/user/kit/close-profle?kit_code=${kitCode}`);
            Promise.all([getMicroTestResult, getAllScores, getCloseProfiles])
                .then(values => {
                    const microTestResult = values[0].data.data;
                    const allScores = values[1].data.data;
                    const closeProfiles = values[2].data.data;
                    dispatch(setMicroTestResult(microTestResult));
                    isPDF ? dispatch(setAllScoresPDF(allScores)) : dispatch(setAllScores(allScores));
                    dispatch(setCloseProfiles(closeProfiles));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetTaxForPDF = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/taksonomik/asort?kit_code=${kitCode}`)
                .then(res => {
                    // console.log(res);
                    dispatch(setTaxForPDF(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetTestData = (lang) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = lang;
            return axios.get(`${app_config.api_url}/testKit`)
                .then(res => {
                    const {foods, closeProfle, ageRange, allScores} = res.data.data;
                    dispatch(setMicroTestResult(ageRange));
                    dispatch(setAllScores(allScores));
                    dispatch(setCloseProfiles(closeProfle));
                    dispatch(setAllFoods(foods));
                    dispatch(setFoodTypes());
                    dispatch(setFoodsToDisplay());
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response);
                    reject(err.response.data);
                })
        })
    }
}

// export const svgToPng = (svg, width, height) => {

//     return new Promise((resolve, reject) => {

//         let canvas = document.createElement('canvas');
//         canvas.width = width;
//         canvas.height = height;
//         let ctx = canvas.getContext('2d');

//         // Set background to white
//         ctx.fillStyle = '#ffffff';
//         ctx.fillRect(0, 0, width, height);

//         let xml = new XMLSerializer().serializeToString(svg);
//         let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
//         let img = new Image(width, height);

//         img.onload = () => {
//             ctx.drawImage(img, 0, 0);
//             let imageData = canvas.toDataURL('image/png', 1.0);
//             resolve(imageData)
//         }

//         img.onerror = () => reject();

//         img.src = dataUrl;
//     });
// };

export const sendPDFReport = (pdfData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.post(`${app_config.pdf_api}/pdf/generate`, {isBase64: false, token: localStorage.userToken, ...pdfData}, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => {
                    // console.log(res.data);
                    const {message} = res.data;
                    dispatch(setSuccess(message))
                    resolve(res.data);
                })
                .catch(err => {
                    // console.log(err.response);
                    // err.response && console.log(err.response.data);
                    reject();
                });
        })
    }
}