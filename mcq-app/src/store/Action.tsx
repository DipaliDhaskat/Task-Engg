import Question from '../model/Question.json'
export const GET_DATA = 'GET_DATA'

export const GetData = () => {
    return {
        type: GET_DATA,
        payload: Question["Qus"]
    }
}