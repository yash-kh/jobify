import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { applyByJobId } from "../../services/JobService";

const JobDetails = () => {
    const locationn = useLocation();
    const navigator = useNavigate();
    console.log(locationn.state);
    let { id, title, description, company, location, min_salary, max_salary, min_exp, max_exp, notice, created_at } = locationn.state;
    created_at = new Date(created_at).toDateString()

    const apply = () =>{
        applyByJobId(id).then(()=>{
            navigator('/jobs')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
      <Container>
        <Row>
          <Col>
            <h2 className="mt-4">{title}</h2>
            <p>{description}</p>
            <p>{company}</p>
            <p>{location}</p>
            <p>Salary: {min_salary} - {max_salary}</p>
            <p>Experience: {min_exp} - {max_exp} years</p>
            <p>Notice period: {notice} days</p>
            <p>Created at: {created_at}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={apply}>Apply</Button>
          </Col>
        </Row>
      </Container>
    );
}

export default JobDetails