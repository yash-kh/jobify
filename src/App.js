import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppNavBar from "./pages/Nav/Nav"
import JobDetails from "./pages/JobDetails/JobDetails"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp"
import JobList from "./pages/JobList/JobList"
import NoPage from "./pages/NoPage"
import JobForm from "./pages/CreateJob/CreateJob"
import { useState } from "react"
import UpdateProfile from "./pages/updateProfile/UpdateProfile"

export default function App() {

  let [userType, setUserType] = useState("")
  
    const updateUserType = () => {
      const storedUserType = localStorage.getItem('userType');
      setUserType(storedUserType);
    };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppNavBar updateUserType={updateUserType} userType={userType} />}>
          <Route index element={<LoginSignUp updateUserType={updateUserType} />} />
          <Route path="jobDetails" element={<JobDetails />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="specialJobs" element={<JobList />} />
          <Route path="postedJobs" element={<JobList userType={userType} />} />
          <Route path="createJob" element={<JobForm />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}