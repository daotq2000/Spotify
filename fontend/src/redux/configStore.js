import {applyMiddleware, compose, createStore} from "redux";
import appReducer from './appReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../saga/rootSaga";
import thunk from "redux-thunk";

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false
}) : compose

const sagaMiddleware = createSagaMiddleware();

const configStore = () => {

    const middleWares = [
        thunk, sagaMiddleware
    ]
    const enhancers = [
        applyMiddleware(...middleWares)
    ]

    const store = createStore(appReducer, composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configStore;