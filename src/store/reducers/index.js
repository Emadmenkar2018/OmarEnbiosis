import {combineReducers} from 'redux'
import {localizeReducer} from 'react-localize-redux'
import messages from './messages'
import ui from './ui'
import currentUser from './currentUser'
import register from './register'
import myFoods from './myFoods'
import myResults from './myResults'
import myAccount from './myAccount'
import survey from './survey'
import resources from './resources'

const rootReducer = combineReducers({
    localize: localizeReducer,
    messages,
    ui,
    currentUser,
    register,
    myFoods,
    myResults,
    myAccount,
    survey,
    resources
});

export default rootReducer;