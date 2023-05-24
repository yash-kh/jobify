import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { logoutUser } from "../../services/LoginService"


const AppNavBar = ({ updateUserType, userType }) => {
    const navigate = useNavigate()
    const location = useLocation()
    // const logout = () => {
    //     logoutUser().then(() => {
    //         updateUserType(undefined)
    //         localStorage.removeItem('')
    //         navigate('/')
    //     }).catch((err) => {
    //         console.log(err)
    //         updateUserType(undefined)
    //         localStorage.removeItem('')
    //         navigate('/')
    //     })
    // }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand>Jobify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <span className="me-auto"></span>
                        <Nav
                            className="my-2 my-lg-0 d-flex"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {userType ? <NavDropdown title="Jobs" id="navbarScrollingDropdown">
                                {userType === 'recruiter' ? <NavDropdown.Item as={Link} to="/postedJobs">
                                    Posted Jobs
                                </NavDropdown.Item> : null}
                                {userType === 'candidate' ? <NavDropdown.Item as={Link} to="/jobs">
                                    All Jobs
                                </NavDropdown.Item> : null}
                                {userType === 'candidate' ? <NavDropdown.Item as={Link} to="/specialJobs">
                                    Recommended Jobs
                                </NavDropdown.Item> : null}
                                <NavDropdown.Divider />
                                {userType === 'recruiter' ? <NavDropdown.Item as={Link} to="/createJob">Create Jobs</NavDropdown.Item> : null}
                                {userType === 'candidate' ? <NavDropdown.Item as={Link} to="/appliedJobs">Applied Jobs</NavDropdown.Item> : null}
                            </NavDropdown> : null}
                            {userType === 'candidate' ? <Nav.Link as={Link} to="/updateProfile">Update Profile</Nav.Link> : null}
                            {userType !== undefined && location.pathname !== "/" ? <Nav.Link as={Link} to="/" onClick={() => updateUserType(localStorage.removeItem('currentUser'))}>Log out</Nav.Link> : " "}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
}

export default AppNavBar