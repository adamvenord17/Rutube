import React from 'react'
import configureStore from './store/store';
import Root from './components/Root';
import ReactDOM from 'react-dom';

// TESTING STARTS HERE
import { signup, login, logout } from './actions/user_actions';
// TESTING ENDS HERE

document.addEventListener("DOMContentLoaded", () => {

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    const root = document.getElementById("root");

    // TESTING STARTS HERE
    window.getState = store.getState()
    window.dispatch = store.dispatch
    window.signup = signup
    window.login = login
    window.logout = logout
    // TESTING ENDS HERE

    ReactDOM.render(<Root store={store} />, root);
})