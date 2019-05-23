import {applyMiddleware, compose, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';

import makeRootReducer from './reducers';
import allReducers from '../reducers/reducersRegistry';


import thunk from 'redux-thunk';
import history from './history';

import httpRequestMiddleware from './httpRequestMiddleware';
import authMiddleware from './authMiddleware';


export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middleware = [
        thunk,
        httpRequestMiddleware,
        routerMiddleware(history),
        authMiddleware
    ];

    const store = createStore(
        connectRouter(history)(makeRootReducer(allReducers)),
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    store.asyncReducers = allReducers;

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default;
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    return store;
}
