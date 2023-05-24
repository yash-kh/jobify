import { Button, Col, Container, Row, Form, Accordion, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { applyByJobId, getListOfApplicants, updateApplicationStatus, updateJobStatus } from "../../services/JobService";
import { useEffect, useState } from "react";

const JobDetails = () => {
  const locationn = useLocation();
  const navigator = useNavigate();
  const user = localStorage.getItem('currentUser')

  let { id, title, description, company, location, min_salary, max_salary, min_exp, max_exp, notice, created_at } = locationn.state;
  // console.log(locationn.state);
  const [selectedStatus, setSelectedStatus] = useState(locationn.state.status);
  const [displayError, setDisplayError] = useState(undefined);

  created_at = new Date(created_at).toDateString()
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const jobId = id;

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    updateJobStatus(jobId, { status: newStatus })
    navigator('/postedjobs')
    alert("Status changed successfully!!!")
  };

  const fetchApplicantsData = () => {
    getListOfApplicants(jobId).then(res => {
      setApplicants(res.data.applications)
    }).catch(err => {
      console.log(err);
    })
  };
  useEffect(() => {
    if (user === "recruiter") {
      fetchApplicantsData()
    }
  }, [])
  
  const handleApplicantsClick = () => {
    setAccordionOpen(!accordionOpen);
  };
  
  const apply = () => {
    applyByJobId(id).then(() => {
      alert('Applied successfully!')
      navigator('/jobs')
    }).catch((err) => {
      setDisplayError('Already applied to this Job!')
      console.log(err)
    })
  }
  const [applicationStatus, setApplicationStatus] = useState(applicants.status)  

  
  const handleApplicationStatusChange = (event,id) => {
    const newStatus = event.target.value;
    setApplicationStatus(newStatus);
    updateApplicationStatus(id, { status: newStatus })
    // navigator('/jobDetails')
    alert("Status changed successfully!!!")
  }
 

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 className="mt-4">{title}</h2>
            {user === "recruiter" && (
              <Col xs="auto">
                <Form.Group controlId="statusDropdown" style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
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

      {displayError ? <Row className="mb-3">
        <Col>
          <span className="text-danger">{displayError}</span>
        </Col>
      </Row> : null}
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
              <>
                <h5 style={{ marginTop: "10px" }}>Applications ({applicants.length})</h5>
                <Accordion style={{ marginTop: "15px", marginBottom: "50px" }}>
                  {applicants && applicants.map((applicant, id) => (
                    <Accordion.Item eventKey={id}>
                      <Accordion.Header>{applicant.candidate.name}</Accordion.Header>
                      <Accordion.Body >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div>
                            <b>EMAIL ID : </b>{applicant.candidate.email}
                          </div>
                          <div style={{display: "flex", gap:4 }}>                            
                            <Form.Control
                              as="select"
                              value={applicationStatus}
                              onChange={(e) => handleApplicationStatusChange(e,applicant.id)}
                              style={{ width: "fit-content" }}>
                              <option value="applied" disabled>Status</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </Form.Control>
                          </div>

                        </div>
                        <>
                          <p><b>CURRENT EMPLOYER : </b>{applicant.candidate.candidates.current_employer}</p>
                          <p><b>LOCATION : </b>{applicant.candidate.candidates.location}</p>
                          <p><b>DESIGNATION : </b>{applicant.candidate.candidates.designation}</p>
                          <p><b>TOTAL EXPERIENCE : </b>{applicant.candidate.candidates.total_experience} YEARS</p >
                          <p><b>CURRENT SALARY : </b> {applicant.candidate.candidates.current_salary} LPA</p>
                          <p><b>EXPECTED SALARY : </b>{applicant.candidate.candidates.exp_salary} LPA</p>
                          <p><b>NOTICE PERIOD : </b>{applicant.candidate.candidates.notice_period} DAYS</p>
                          {applicant.candidate.candidates.skills && (
                            <div>
                              <b>SKILLS: </b>
                              {applicant.candidate.candidates.skills.map((skill, index) => (
                                <span key={skill.id}>
                                  {skill.skill}
                                  {index !== applicant.candidate.candidates.skills.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                        {/* ))} */}

                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </>
              : ""}

          </Col>
        </Row>
      }
    </Container>
  );
}

export default JobDetails