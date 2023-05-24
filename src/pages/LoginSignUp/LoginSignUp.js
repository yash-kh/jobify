import { useState } from "react"
import { Button, ButtonGroup, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { GrMail } from 'react-icons/gr'
import { MdPassword } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import { FiUserPlus } from 'react-icons/fi'
import { useNavigate } from "react-router-dom"
import { loginUser, registerUser } from "../../services/LoginService"

const LoginSignUp = ({updateUserType}) => {

  const navigate = useNavigate()

  if(localStorage.getItem('currentUser') === 'candidate'){
    navigate('/jobs')
  }
  else if(localStorage.getItem('currentUser') === 'recruiter'){
    navigate('/postedJobs')
  }

  let [islogin, setIsLogin] = useState(true)
  let [isRecruiter, setIsRecruiter] = useState(false)
  let [confirmPass, setConfirmPass] = useState('')
  let [userName, setUserName] = useState('')
  let [displayError, setDisplayError] = useState(null)
  let [pass, setPass] = useState('')
  let [email, setEmail] = useState('')

  const handleLoginSignUpRadio = (event) => setIsLogin(event.target.value === '1')
  const handleUserTypeRadio = (event) => setIsRecruiter(event.target.value === '1')

  const login = () => {
    if(!email || !pass) {
      setDisplayError("Email and Password are required!")
      return
    }
    let reqObj = {
      "email": email,
      "password": pass,
      "role": isRecruiter ? "recruiter" : "candidate"
    }
    loginUser(reqObj).then((res)=>{
      localStorage.setItem('currentUser',isRecruiter ? "recruiter" : "candidate")
      updateUserType(res.data.data.role)
      isRecruiter ? navigate('/postedJobs') : navigate('/jobs')
    }).catch(()=>{
      setDisplayError("Invalid Credentials!")
    })
  }
  
  const signUp = () => {
    if(!userName || !email || !pass || !confirmPass) {
      setDisplayError("Name, Email and Password are required!")
      return
    }
    if(pass !== confirmPass){
      setDisplayError("Password does not match")
      return
    }
    let reqObj = {
      "name": userName,
      "email" : email,
      "password" : pass,
      "role" : isRecruiter ? "recruiter" : "candidate"
    }
    registerUser(reqObj).then((res)=>{
      console.log(res)
      localStorage.setItem('currentUser',isRecruiter ? "recruiter" : "candidate")
      updateUserType(res.data.data.role)
      isRecruiter ? navigate('/postedJobs') : navigate('/jobs')
    }).catch((err)=>{
      console.log(err)
      setDisplayError("Email already exist!")
    })
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="display-3 m-4">
          Login
        </h1>
        <Col md="5">
          <div className="mb-3 text-center">
            <Form>
              <ButtonGroup toggle="toggle">
                <Button
                  variant="outline-primary"
                  active={islogin}
                  value={1}
                  onClick={handleLoginSignUpRadio}
                  >
                  Login
                </Button>
                <Button
                  variant="outline-primary"
                  active={!islogin}
                  value={0}
                  onClick={handleLoginSignUpRadio}
                >
                  Sign up
                </Button>
              </ButtonGroup>
            </Form>
          </div>
        </Col>
      </Row>
      {islogin ? null : <Row className="justify-content-md-center">
        <Col md="5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><FiUserPlus /></InputGroup.Text>
            <Form.Control
              placeholder="Name"
              type="text"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>}
      <Row className="justify-content-md-center">
        <Col md="5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><GrMail /></InputGroup.Text>
            <Form.Control
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><MdPassword /></InputGroup.Text>
            <Form.Control
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPass(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      {islogin ? null : <Row className="justify-content-md-center">
        <Col md="5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1"><GiConfirmed /></InputGroup.Text>
            <Form.Control
              placeholder="Confirm Password"
              type="password"
              required
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>}
      <Row className="justify-content-md-center">
        <Col md="5">
          <div className="mb-3 text-center">
            <Form>
              <ButtonGroup toggle="toggle">
                <Button
                  variant="outline-primary"
                  active={!isRecruiter}
                  value={0}
                  onClick={handleUserTypeRadio}
                  >
                  Candidate
                </Button>
                <Button
                  variant="outline-primary"
                  active={isRecruiter}
                  value={1}
                  onClick={handleUserTypeRadio}
                >
                  Recruiter
                </Button>
              </ButtonGroup>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center mb-2">
        <Col md="5" className="text-center">
          {displayError ? <div className="text-danger">{displayError}</div>: null}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="5" className="text-center">
          <Button variant="primary" onClick={islogin ? login : signUp}>{islogin ? "Login" : "Register"}</Button>
        </Col>
      </Row>
    </Container >
  )
}
export default LoginSignUp