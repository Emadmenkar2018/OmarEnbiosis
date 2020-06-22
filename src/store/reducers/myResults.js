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

const INITIAL_STATE = {
    microTestResult: {},
    allScores: [],
    allScoresPDF: [],
    taxonomicResult: [],
    taxForPDF: [],
    closeProfiles: [],
    importantMicros: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_MICRO_TEST_RESULT:
            return {
                ...state,
                microTestResult: {...action.microTestResult}
            }
        case SET_ALL_SCORES:
            return {
                ...state,
                allScores: [...action.allScores]
            }
        case SET_ALL_SCORES_PDF:
            return {
                ...state,
                allScoresPDF: [...action.allScoresPDF]
            }
        case SET_TAXONOMIC_RESULT:
            return {
                ...state,
                taxonomicResult: [...action.taxonomicResult]
            }
        case SET_TAX_FOR_PDF:
            return {
                ...state,
                taxForPDF: [...action.taxForPDF]
            }
        case SET_CLOSE_PROFILES:
            return {
                ...state,
                closeProfiles: [...action.closeProfiles]
            }
        case SET_IMPORTANT_MICROS:
            return {
                ...state,
                importantMicros: [...action.importantMicros]
            }
        case CLEAR_RESULTS:
            return {...INITIAL_STATE}
        default:
            return state
    }
}