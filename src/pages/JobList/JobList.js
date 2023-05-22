import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const JobList = () => {
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Microsoft' },
    { id: 2, title: 'Product Manager', company: 'Amazon' },
    { id: 3, title: 'Data Analyst', company: 'Google' },
    { id: 4, title: 'UX Designer', company: 'Facebook' },
    { id: 5, title: 'Marketing Manager', company: 'Apple' }
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='py-4 px-1'>Job Listings</h1>
          <ListGroup>
            {jobs.map(job => (
              <ListGroup.Item key={job.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ color: '#333' }}>{job.title}</h4>
                <p style={{ color: '#666' }}>{job.company}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default JobList