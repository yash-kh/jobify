import { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
import { getJobs } from '../../services/LoginService';

const JobList = (props) => {
  const [jobs, setJobs] = useState([])
  const status = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Archive' }
  ];
  const fetchJobs = () => {
    getJobs()
      .then((response) => {
        console.log(response)
        const jobsData = response.data.jobs.data;
        setJobs(jobsData);
      })
      .catch((error) => {
        console.log("Error fetching jobs:", error);
      });
  };
  useEffect(() => {
    fetchJobs()
  }, [])

  const handleChange = (selectedOption, jobId) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, status: selectedOption.value } : job
      )
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='py-4 px-1'>Job Listings</h1>
          <ListGroup>
            {jobs.map(job => (
              <ListGroup.Item key={job.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ color: '#333' }}>{job.title}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <p style={{ color: '#666' }}>{job.company}</p>
                  {props.userType === "recruiter" ?
                    <Select
                      value={status.find(option => option.value === job.status)}
                      onChange={selectedOption => handleChange(selectedOption, job.id)}
                      options={status}
                    >
                    </Select>

                    : " "}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container >
  );
}

export default JobList