import axios from "axios"

export const postRequest = (endpoint, params) => {
    return axios.post(import.meta.env.VITE_API_BASE_URL + endpoint, params)
}

export const getRequest = (endpoint, params) => {
    return axios.get(import.meta.env.VITE_API_BASE_URL + endpoint, {
        params
    })
}