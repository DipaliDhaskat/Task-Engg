import axios from 'axios';
export const COUNTRY_DATA = "COUNTRY_DATA";

export const getData = (name: string) => async (dispatch: any) => {

	await axios.get(`https://restcountries.com/v2/name/${name}`)
		.then((res) => {
			dispatch({
				type: COUNTRY_DATA,
				payload: res.data
			})
		})
		.catch((error) => {
			console.log(error)
		})
}