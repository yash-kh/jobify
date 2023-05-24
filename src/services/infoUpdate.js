import axios from "axios"

const apiUrl = process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;


export const updateProfile = (data) => {
    return axios.post(apiUrl + '/profile_info/create', data, { withCredentials: true })
}

export const getProfileInfo = () => {
    return axios.get(apiUrl + '/profile_info', { withCredentials: true })
}

