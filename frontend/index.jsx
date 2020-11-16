import React from 'react'
import configureStore from './store/store';
import Root from './components/root';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", () => {

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    const root = document.getElementById("root");
    
    ReactDOM.render(<Root store={store} />, root);
})
