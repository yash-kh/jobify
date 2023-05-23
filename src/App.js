import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppNavBar from "./pages/Nav/Nav"
import JobDetails from "./pages/JobDetails/JobDetails"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp"
import JobList from "./pages/JobList/JobList"
import NoPage from "./pages/NoPage"
import JobForm from "./pages/CreateJob/CreateJob"
import { useState } from "react"
import UpdateProfile from "./pages/updateProfile/UpdateProfile"
import { PostedJob } from "./pages/PostedJob/PostedJob"

export default function App() {

  let [userType, setUserType] = useState(localStorage.getItem('currentUser'));
  const updateUserType = (type) => setUserType(type)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppNavBar updateUserType={updateUserType} userType={userType} />}>
          <Route index element={<LoginSignUp updateUserType={updateUserType} />} />
          <Route path="jobDetails" element={<JobDetails />} />
          <Route path="jobs" Component={(props) => <JobList {...props} /> } />
          <Route path="specialJobs" Component={(props) => <JobList type="specialJobs" {...props} /> } />
          <Route path="appliedJobs" Component={(props) => <JobList type="appliedJobs" {...props} /> } />
          <Route path="postedJobs" element={<PostedJob/>} />
          <Route path="createJob" element={<JobForm />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}