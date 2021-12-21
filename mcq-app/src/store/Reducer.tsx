
import { GET_DATA } from './Action'
const initialState = {
    info: [],
    loding: true,
}

export const Reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                info: action.payload,
                loading: false
            }
        default: return state
    }
}