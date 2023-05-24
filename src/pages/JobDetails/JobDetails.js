import { Button, Col, Container, Row,Form, Accordion, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { applyByJobId, updateJobStatus } from "../../services/JobService";
import { useState } from "react";

const JobDetails = () => {
  const locationn = useLocation();
  const navigator = useNavigate();
  const user = localStorage.getItem('currentUser')
  let { id, title, description, company, location, min_salary, max_salary, min_exp, max_exp, notice, created_at } = locationn.state;
  // console.log(locationn.state);
  const [selectedStatus, setSelectedStatus] = useState(locationn.state.status);
  created_at = new Date(created_at).toDateString()

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    // Make API call to update the status
    const jobId = id; 
    updateJobStatus(jobId, { status: newStatus })
    navigator('/postedjobs')
    alert("Status changed successfully!!!")
  };

  const handleApplicantsClick = () => {
    // Make API call to fetch the number of applicants
    // Update the state with the response data
    const dummy = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Mike Johnson" },
    ];
    setApplicants(dummy/* Number of applicants from the API response */);

    // Toggle the accordion open/close state
    setAccordionOpen(!accordionOpen);
  };
  const apply = () => {
    applyByJobId(id).then(() => {
      navigator('/jobs')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 className="mt-4">{title}</h2>            
          {user === "recruiter" && (
            <Col xs="auto">
              <Form.Group controlId="statusDropdown" style={{display:"flex", alignItems:"baseline", gap: 5}}>
                <Form.Label className="mr-2">Status: </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  style={{ width: "fit-content", border: "none", backgroundColor: "transparent", appearance: "none", outline: "none" }}>
                  <option value="active">Active</option>
                  <option value="archive">Archive</option>
                </Form.Control>
              </Form.Group>
        </Col>
          )}
          </div>
          <p>{description}</p>
          <p>{company}</p>
          <p>{location}</p>
          <p>Salary: {min_salary} - {max_salary}</p>
          <p>Experience: {min_exp} - {max_exp} years</p>
          <p>Notice period: {notice} days</p>
          <p>Created at: {created_at}</p>
          </Col>
        </Row>
      
      {user === "candidate" ?
        <Row>
          <Col>
            <Button variant="primary" onClick={apply}>Apply</Button>
          </Col>
        </Row>
        : 
        <Row>
          <Col>
            <Button variant="info" onClick={handleApplicantsClick}><em><b>See the List of Applicants</b></em></Button>
          
            {accordionOpen ?
            <Accordion style={{marginTop: "15px", marginBottom: "50px"}}>
              {applicants.map((applicant,id) => (
                <Accordion.Item eventKey={id}>
                  <Accordion.Header>{applicant.id}</Accordion.Header>
                    <Accordion.Body style={{display: "flex", justifyContent : "space-between"}}>
                    {applicant.name}
                    <div>
                    <Button style={{marginRight: "10px"}} variant="dark">Accept</Button>
                    <Button variant="dark">Reject</Button>
                    </div>
                    </Accordion.Body>                  
                </Accordion.Item>
              ))}
              </Accordion>
             : ""}
            
          </Col>
        </Row>
        }
    </Container>
  );
}

export default JobDetails