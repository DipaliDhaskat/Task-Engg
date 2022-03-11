import axios from 'axios';
export const GET_DATA = "GET_DATA";

export const getData = (pageNumber: number) => async (dispatch: any) => {

    await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: GET_DATA,
                payload: res.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
}