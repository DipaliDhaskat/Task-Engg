import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Reducer } from './Reducer'

const initialState: {
    info: any;
    loding: boolean;
} = {
    info: [],
    loding: true,
}

const middleware = [thunk]

export const Store = createStore(Reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
