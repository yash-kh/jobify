import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { applyByJobId, updateJobStatus } from "../../services/JobService";
import { useState } from "react";

const JobDetails = () => {
  const locationn = useLocation();
  const navigator = useNavigate();
  const user = localStorage.getItem('currentUser')

  let { id, title, description, company, location, min_salary, max_salary, min_exp, max_exp, notice, created_at } = locationn.state;

  const [selectedStatus, setSelectedStatus] = useState(locationn.state.status);
  const [displayError, setDisplayError] = useState(undefined);

  created_at = new Date(created_at).toDateString()

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    const jobId = id;
    updateJobStatus(jobId, { status: newStatus })
    navigator('/postedjobs')
    alert("Status changed successfully!!!")
  }

  const apply = () => {
    applyByJobId(id).then(() => {
      alert('Applied successfully!')
      navigator('/jobs')
    }).catch((err) => {
      setDisplayError('Already applied to this Job!')
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
        : ""}
    </Container>
  );
}

export default JobDetails