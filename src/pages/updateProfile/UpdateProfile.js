import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getAllSkills } from '../../services/JobService';
import { updateProfile } from '../../services/infoUpdate';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const [allSkills, setAllSkills] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllSkills().then((res) => {
            let skills = []
            res.data.skills.forEach((item) => {
                skills.push({ value: item.id, label: item.skill })
            })
            setAllSkills(skills)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate numeric fields
        if (name === 'total_experience' || name === 'current_salary' || name === 'exp_salary' || name === "notice_period") {
            // Check if the value is a valid positive number
            if (isNaN(value) || Number(value) < 0) {
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors,
                    [name]: 'Invalid value'
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors,
                    [name]: ''
                }));
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
            setFormErrors((prevFormErrors) => ({
                ...prevFormErrors,
                [name]: ''
            }));
        }
    };
    const resetForm = () => {
        return {
            current_employer: '',
            location: '',
            designation: '',
            total_experience: '',
            notice_period: '',
            current_salary: '',
            exp_salary: '',
            skills :''
        }
    };
    const [formData, setFormData] = useState(resetForm());


    const setUserChoice = (choice) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            'skills': choice
        }));
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            'skills': ''
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // if (isFormValid()) {
        // Handle form submission logic here
        console.log(formData);
        // Reset the form fields
        let data = {
            "current_employer": formData.current_employer,
            "location": formData.location,
            "designation": formData.designation,
            "total_experience": formData.total_experience,
            "notice_period": formData.notice_period,
            "current_salary": formData.current_salary,
            "exp_salary": formData.exp_salary,
            "skills": [],
        };
        formData.skills.forEach(item => data.skills.push(item.value))
        updateProfile(data).then(() => {
            setFormData({ ...data })
            alert("Profile Updated successfully!!!")            // Reset the form fields
            setFormData(resetForm())
            navigate('/specialJobs')
        }).catch((err) => {
            console.log(err)
            alert('Something went wrong')
        })
        setFormErrors({});
        // }
    };

    // const isFormValid = () => {
    //     const errors = {};

    //     Object.entries(formData).forEach(([key, value]) => {
    //         if (key === 'skills' && !value) {
    //             errors[key] = true;
    //         }
    //         if (key !== 'current_salary' && key !== 'exp_salary' && key !== 'skills' && value.trim() === '') {
    //             errors[key] = true;
    //         }
    //     });

    //     setFormErrors(errors);

    //     return Object.keys(errors).length === 0;
    // };

    return (
        <Container>
            <h1 className="py-4 px-1">Update Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Current Employer</Form.Label>
                    <Form.Control
                        type="text"
                        name="current_employer"
                        value={formData.current_employer}
                        onChange={handleChange}
                        isInvalid={formErrors.current_employer}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        isInvalid={formErrors.designation}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Total Experience (in years)</Form.Label>
                    <Form.Control
                        type="number"
                        name="total_experience"
                        value={formData.total_experience}
                        onChange={handleChange}
                        isInvalid={formErrors.total_experience}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="company">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        isInvalid={formErrors.location}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    <Select
                        name="skills"
                        isMulti
                        onChange={(choice) => setUserChoice(choice)}
                        isInvalid={formErrors.skills}
                        required
                        options={allSkills}
                    >

                    </Select>

                </Form.Group>
                <Form.Group controlId="notice_period">
                    <Form.Label>Notice Period (Days)</Form.Label>
                    <Form.Control
                        type="number"
                        name="notice_period"
                        value={formData.notice_period}
                        onChange={handleChange}
                        isInvalid={formErrors.notice_period}
                        required
                    />
                </Form.Group>


                <br />
                <Row>
                    <Col>
                        <Form.Group controlId="minSalary">
                            <Form.Label>Current Salary (in lakhs)</Form.Label>
                            <Form.Control
                                type="number"
                                name="current_salary"
                                value={formData.current_salary}
                                onChange={handleChange}
                            />
                            {formErrors.current_salary && (
                                <Form.Text className="text-danger">
                                    {formErrors.current_salary}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="maxSalary">
                            <Form.Label>Expected Salary (in lakhs)</Form.Label>
                            <Form.Control
                                type="number"
                                name="exp_salary"
                                value={formData.exp_salary}
                                onChange={handleChange}
                            />
                            {formErrors.exp_salary && (
                                <Form.Text className="text-danger">
                                    {formErrors.exp_salary}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Button className='my-3' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};
export default UpdateProfile;