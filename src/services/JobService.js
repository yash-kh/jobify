import axios from "axios"

const apiUrl = process.env.NODE_ENV === 'development' ? 
    process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

export const getAllSkills = () => {
    return axios.get(apiUrl + '/skills', {withCredentials:true})
}

export const createJob = (data) => {
    return axios.post(apiUrl + '/job/post', data,{withCredentials:true})
}

export const getAllJobs = (data) => {
    return axios.get(apiUrl + '/jobs',{withCredentials:true,data})
}

export const getJobsByPage = (pageNO, data) => {
    return axios.get(apiUrl + '/jobs?page=' + pageNO, {withCredentials:true,data})
}

export const applyByJobId = (id) => {
    return axios.post(apiUrl + '/job/apply/' + id, null, {withCredentials:true})
}