import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getAllJobs, getJobsByPage } from '../../services/JobService';
import { Link } from 'react-router-dom';

const JobList = () => {

  const [lastPage, setLastPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [jobs, setJobs] = useState([
  ])

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobs(res.data.jobs.data)
      setTotalPage(res.data.jobs.last_page)
      console.log(res.data.jobs)
      console.log(totalPage, lastPage)
    })
  }, []);

  const loadMore = () => {
    let page = lastPage
    page++
    setLastPage(page)
    getJobsByPage(page).then((res) => {
      let job = [...jobs]
      job.push(...res.data.jobs.data)
      console.log(res.data.jobs)
      console.log(job)
      setJobs(job)
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='py-4 px-1'>Job Listings</h1>
          <ListGroup>
            {jobs.map(job => (
              <ListGroup.Item as={Link} to={{ pathname: `/jobs/${job.id}`, state: job }} key={job.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ color: '#333' }}>{job.title}</h4>
                <p style={{ color: '#666' }}>{job.company}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {totalPage ? <Row className="justify-content-md-center">
        <Col className='text-center my-3' md={3}>
          {totalPage !== lastPage ? <Button
            variant="outline-primary"
            onClick={loadMore}
          >
            Load More
          </Button> :
            <span>Thats all foks!</span>
          }
        </Col>
      </Row> : null}
    </Container>
  );
}

export default JobList
