import axios from "axios"

const apiUrl = process.env.NODE_ENV === 'development' ? 
    process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

export const registerUser = (data) => {
    return axios.post(apiUrl + '/register', data, {withCredentials:true})
}

export const loginUser = (data) => {
    return axios.post(apiUrl + '/login', data, {withCredentials:true})
}

export const logoutUser = () => {
    return axios.post(apiUrl + '/logout', null, {withCredentials:true})
}
export const getJobs = () => {
    return axios.get(apiUrl + '/jobs',{withCredentials:true})
}