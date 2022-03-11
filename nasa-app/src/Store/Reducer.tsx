import { GET_ID } from './Action'

const initialState = {
	id: '',
	loading: true
}

export const Reducer = (state = initialState, action: { type: string, payload: any }) => {
	switch (action.type) {
		case GET_ID: return {
			...state,
			id: action.payload,
			loading: false
		}
		default: return state
	}
}