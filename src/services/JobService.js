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

export const getAppliedJobs = (data) => {
    return axios.get(apiUrl + '/job/applied',{withCredentials:true,data})
}

export const getAppliedByPage = (pageNO, data) => {
    return axios.get(apiUrl + '/job/applied?page=' + pageNO, {withCredentials:true,data})
}

export const getRecomendedJobs = (data) => {
    return axios.get(apiUrl + '/job/relevant',{withCredentials:true,data})
}

export const getRecomendedByPage = (pageNO, data) => {
    return axios.get(apiUrl + '/job/relevant?page=' + pageNO, {withCredentials:true,data})
}

export const applyByJobId = (id) => {
    return axios.post(apiUrl + '/job/apply/' + id, null, {withCredentials:true})
}

export const getJobsPostedByRecruiter = (data) => {
    return axios.get(apiUrl + '/job/posts' , { withCredentials: true, data })
}

export const updateJobStatus = (id,data) => {
    return axios.patch(apiUrl + '/job/update_status/'+ id, data, { withCredentials: true })
}
export const getListOfApplicants = (id) => {
    return axios.get(apiUrl + '/jobs/applications/' + id, { withCredentials: true })
}