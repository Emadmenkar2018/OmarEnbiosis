import {SET_SURVEY, SET_ANSWER} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case SET_SURVEY:
            return {...action.survey}
        case SET_ANSWER:
            let updatedSurvey = {...state};
            let answers = action.answer.answers;
            if(typeof answers[Object.keys(answers)[0]] === 'string'){
                updatedSurvey.sections[action.sIndex].questions[action.qIndex].Answer = answers[Object.keys(answers)[0]]
            }else {
                updatedSurvey.sections[action.sIndex].questions[action.qIndex].Answer = [...answers[Object.keys(answers)[0]]]
            }
            return {...updatedSurvey}
        default:
            return state;
    }
}