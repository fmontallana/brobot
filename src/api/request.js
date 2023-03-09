import axios from "axios"

export const postRequest = (url, params) => {
    return axios.post(url, params)
}

export const getRequest = (url, params) => {
    return axios.get(url, {
        params
    })
}