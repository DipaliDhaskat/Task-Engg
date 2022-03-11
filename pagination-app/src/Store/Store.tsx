import { Reducer } from './Reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
    info: [],
    loading: true
}
const middleware = [thunk];

export const Store = createStore(
    Reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);
