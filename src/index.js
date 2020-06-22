import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {configureStore} from './store'
import {setCurrentUser, getUser} from './store/actions/auth'
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
if(localStorage.userToken){
    try{
        store.dispatch(getUser(localStorage.userToken));
    }catch(err){
        store.dispatch(setCurrentUser({}));
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
