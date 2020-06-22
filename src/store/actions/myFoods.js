import {
    SET_FILTERS, 
    SET_SUGGESTIONS, 
    UPDATE_FOOD_TYPE, 
    SET_FOOD_TYPES, 
    UPDATE_FOOD_FILTER, 
    SET_ALL_FOODS, 
    SET_FOODS_TO_DISPLAY, 
    SET_SEARCH_VALUE, 
    SET_FOOD_ERROR, 
    CLEAR_FOODS
} from '../actionTypes'
import axios from 'axios'
import {app_config} from '../../config'

export const setFilters = (foodFilters) => ({
    type: SET_FILTERS,
    foodFilters
})

export const setSuggestions = (suggestions) => ({
    type: SET_SUGGESTIONS,
    suggestions
})

export const setFoodTypes = () => ({
    type: SET_FOOD_TYPES
})

export const updateFoodType = (id) => ({
    type: UPDATE_FOOD_TYPE,
    id
});

export const updateFoodFilter = (id) => ({
    type: UPDATE_FOOD_FILTER,
    id
});

export const setAllFoods = (foods) => ({
    type: SET_ALL_FOODS,
    foods
});

export const setFoodsToDisplay = () => ({
    type: SET_FOODS_TO_DISPLAY
});

export const setSearchValue = (searchValue) => ({
    type: SET_SEARCH_VALUE,
    searchValue
});

export const setFoodError = (foodError) => ({
    type: SET_FOOD_ERROR,
    foodError
})

export const clearFoods = () => ({
    type: CLEAR_FOODS
})

export const handleSetFilters = (translate) => {
    return dispatch => {
        const foodFilters = [
            {
                id: 0,
                filterTitle: translate('mF-good'),
                rank: 'iyi',
                shortcut: translate('mF-good')[0],
                isActive: false
            },
            {
                id: 1,
                filterTitle: translate('mF-average'),
                rank: 'orta',
                shortcut: translate('mF-average')[0],
                isActive: false
            },
            {
                id: 2,
                filterTitle: translate('mF-bad'),
                rank: 'kotu',
                shortcut: translate('mF-bad')[0],
                isActive: false
            }
        ]
        dispatch(setFilters(foodFilters));
    }
}

export const handleGetSuggestions = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/suggestion?kit_code=${kitCode}`)
                .then(res => {
                    // console.log(res);
                    dispatch(setSuggestions(res.data.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data);
                    reject(err.response.data.errors);
                })
        })
    }
}

export const handleGetAllFoods = (kitCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.userToken}`;
            axios.defaults.headers.common['Content-Language'] = localStorage.lang;
            return axios.get(`${app_config.api_url}/user/kit/food?kit_code=${kitCode}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(res => {
                    dispatch(setFoodError(''))
                    dispatch(setAllFoods(res.data.data));
                    dispatch(setFoodTypes());
                    dispatch(setFoodsToDisplay());
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data);
                    const errData = err.response.data.errors;
                    if(errData){
                        dispatch(setFoodError(errData.kit_code));
                    }
                    reject(errData);
                })
        })
    }
}