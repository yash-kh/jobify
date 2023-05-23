import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getAllJobs, getAppliedByPage, getAppliedJobs, getJobsByPage } from '../../services/JobService';
import { Link, useNavigate } from 'react-router-dom';

const JobList = ({type}) => {

  const [lastPage, setLastPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [jobs, setJobs] = useState([
  ])
  const navigate = useNavigate();

  useEffect(() => {
    if(type === 'appliedJobs'){      
      getAppliedJobs().then((res) => {
        console.log(res)
        console.log(totalPage, lastPage)
        setJobs(res.data.applications.data)
        setTotalPage(res.data.applications.last_page)
      })
    }
    if(type === 'specialJobs'){      
      getAppliedJobs().then((res) => {
        console.log(res)
        console.log(totalPage, lastPage)
        setJobs(res.data.applications.data)
        setTotalPage(res.data.applications.last_page)
      })
    }
    else{
      getAllJobs().then((res) => {
        setJobs(res.data.jobs.data)
        setTotalPage(res.data.jobs.last_page)
        console.log(res.data.jobs)
        console.log(totalPage, lastPage)
      })
    }
  }, []);

  const loadMore = () => {
    let page = lastPage
    page++
    setLastPage(page)
    if(type === 'appliedJobs'){
      getAppliedByPage(page).then((res) => {
        let job = [...jobs]
        job.push(...res.data.applications.data)
        console.log(res.data.applications)
        console.log(job)
        setJobs(job)
      })
    }else{
      getJobsByPage(page).then((res) => {
        let job = [...jobs]
        job.push(...res.data.jobs.data)
        console.log(res.data.jobs)
        console.log(job)
        setJobs(job)
      })
    }
  }

  const goToJob = (job) => {
    navigate('/jobDetails', { state: job });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='py-4 px-1'>Job Listings</h1>
          <ListGroup>
            {jobs.map(job => (
              <ListGroup.Item role='button' onClick={job.job ? null : ()=>goToJob(job)} key={job.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ color: '#333' }}>{job.title || job.job.title}</h4>
                <p style={{ color: '#666' }}>{job.company || job.job.company}</p>
                {job.job ? <div>
                  <p style={{ color: '#666' }}>{'status: ' + job.status}</p>
                  <p style={{ color: '#666' }}>{'applied: ' + new Date(job.created_at).toDateString()}</p>
                  <p style={{ color: '#666' }}>{'updated: ' + new Date(job.updated_at).toDateString()}</p>
                </div> : null}
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
