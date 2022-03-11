
import axios from 'axios';
export const GET_ID = 'GET_ID';

export const getData = () => async (dispatch: Function) => {
	await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=c7AFIeccy1roQgoqGW3KyV0tRHkuQKGKOYf32L1j')
		.then((res: any) => {
			dispatch({
				type: GET_ID,
				payload: res.data.near_earth_objects
			})
		})
		.catch((error) => console.log(error))
}