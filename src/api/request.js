import axios from "axios"

export const postRequest = (url, params) => {
    return axios.post(url, params)
}