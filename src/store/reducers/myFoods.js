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

const INITIAL_STATE = {
    suggestions: [],
    foodList: [],
    foodsToDisplay: [],
    activeStatus: {
        foodTypes: [],
        foodFilters: [],
    },
    searchValue: '',
    foodError: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_FILTERS:
            return {
                ...state,
                activeStatus: {
                    ...state.activeStatus,
                    foodFilters: [...action.foodFilters]
                }
            }
        case SET_SUGGESTIONS:
            return {
                ...state,
                suggestions: [...action.suggestions]
            }
        case SET_FOOD_TYPES:
            let foodTypes = state.foodList.map((foods, index) => (
                {
                    id: index,
                    title: foods.foodType,
                    isActive: index === 0
                }
            ));
            return {
                ...state,
                activeStatus: {
                    ...state.activeStatus,
                    foodTypes
                }
            }
        case UPDATE_FOOD_TYPE:
            let updatedFoodTypes = state.activeStatus.foodTypes.map(fType => {
                if(fType.id === action.id){
                    return {
                        ...fType,
                        isActive: true
                    }
                }
                if(fType.isActive){
                    return {
                        ...fType,
                        isActive: false
                    }
                }
                return {...fType}
            });
            return {
                ...state,
                activeStatus: {
                    ...state.activeStatus,
                    foodTypes: updatedFoodTypes
                }
            }
        case UPDATE_FOOD_FILTER:
            let updatedFilters = state.activeStatus.foodFilters.map(filter => {
                if(filter.id === action.id){
                    return {
                        ...filter,
                        isActive: !filter.isActive
                    }
                }
                return {...filter}
            });
            return {
                ...state,
                activeStatus: {
                    ...state.activeStatus,
                    foodFilters: updatedFilters
                }
            }
        case SET_ALL_FOODS:
            return {
                ...state,
                foodList: [...action.foods]
            }
        case SET_FOODS_TO_DISPLAY:
            // ready filters
            const filters = state.activeStatus.foodFilters.filter(filter => 
                filter.isActive === true
            ).map(filter => filter.rank);
            if(state.foodError === '' && state.foodList.length !== 0){
                // ready foods based on foodType
                let selectedFoodType = state.activeStatus.foodTypes.find(fType => fType.isActive === true);
                let foodsToDisplay = state.foodList.filter(food => 
                    food.foodType === selectedFoodType.title
                );
                if(filters.length === 0 ){
                    // adjust foods if there is no filters
                    foodsToDisplay = foodsToDisplay[0].foodItems.reduce((accumulator, currentValue) => {
                        if(state.searchValue !== ''){
                            let items = currentValue.items.filter(item => 
                                item.foodTitle.toLowerCase().indexOf(state.searchValue.toLowerCase()) > -1    
                            );
                            return [...accumulator, ...items]
                        }
                        return [...accumulator, ...currentValue.items]
                    }, []);
                    return {
                        ...state,
                        foodsToDisplay
                    }
                }
    
                // adjust foods if there is filters
                foodsToDisplay = foodsToDisplay[0].foodItems.filter(item => 
                    filters.includes(item.rank)
                ).reduce((accumulator, currentValue) => {
                    if(state.searchValue !== ''){
                        let items = currentValue.items.filter(item => 
                            item.foodTitle.toLowerCase().indexOf(state.searchValue.toLowerCase()) > -1    
                        );
                        return [...accumulator, ...items]
                    }
                    return [...accumulator, ...currentValue.items]
                }, []);
                return {
                    ...state,
                    foodsToDisplay
                }
            }
            return state;
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.searchValue
            }
        case SET_FOOD_ERROR:
            return {
                ...state,
                foodError: action.foodError
            }
        case CLEAR_FOODS:
            return {...INITIAL_STATE}
        default:
            return state;
    }
}