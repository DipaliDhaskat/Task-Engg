import {Reducer} from './Reducer';

import thunk from 'redux-thunk';
 import {composeWithDevTools} from 'redux-devtools-extension'

import {createStore,applyMiddleware} from 'redux'


const initialState:{
info:Array<any>;
loading:boolean;
}={
	info:[],
	loading:true
}
const middleware=[thunk]

export const Store=createStore(Reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


