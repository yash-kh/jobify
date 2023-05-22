import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppNavBar from "./pages/Nav/Nav"
import Home from "./pages/Home/Home"
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp"
import JobList from "./pages/JobList/JobList"
import NoPage from "./pages/NoPage"
import JobForm from "./pages/CreateJob/CreateJob"
import { useState } from "react"

export default function App() {

  let [userType, setUserType] = useState(undefined)

  const updateUserType = (type) => setUserType(type)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppNavBar updateUserType={updateUserType} userType={userType} />}>
          <Route index element={<LoginSignUp updateUserType={updateUserType} />} />
          <Route path="home" element={<Home />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="specialJobs" element={<JobList />} />
          <Route path="createJob" element={<JobForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}