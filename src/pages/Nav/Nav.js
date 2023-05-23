import { Outlet, Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const AppNavBar = ({ updateUserType, userType }) => {
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
                            {userType !== undefined ? <NavDropdown title="Jobs" id="navbarScrollingDropdown">
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
                                {userType === 'recruiter' ? <Nav.Link as={Link} to="/addSkills">Add Skills</Nav.Link> : null}
                                {userType === 'candidate' ? <Nav.Link as={Link} to="/updateProfile">Update Profile</Nav.Link> : null}
                            {userType !== undefined ? <Nav.Link as={Link} to="/" onClick={()=>updateUserType(localStorage.removeItem('userType'))}>Log out</Nav.Link> : null}
                        </Nav>
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
}

export default AppNavBar