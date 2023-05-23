import React, { useState } from 'react';
import Select from 'react-select';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UpdateProfile = () => {



    const allSkills = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const [formData, setFormData] = useState({
        current_employer: '',
        location: '',
        designation: '',
        total_experience: '',
        notice_period: '',
        current_salary: '',
        exp_salary: '',
        skills: [],

    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate numeric fields
        if (name === 'total_experience' || name === 'current_salary' || name === 'exp_salary') {
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



    const setUserChoice = (choice) => {
        const selectedValues = choice.map((option) => option.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            'skills': selectedValues.filter(Boolean)
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
        setFormData({
            current_employer: '',
            location: '',
            designation: '',
            total_experience: '',
            notice_period: '',
            current_salary: '',
            exp_salary: '',
            skills: [],
        });
        setFormErrors({});
        // }
    };

    const isFormValid = () => {
        const errors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'skills' && !value) {
                errors[key] = true;
            }
            if (key !== 'current_salary' && key !== 'exp_salary' && key !== 'skills' && value.trim() === '') {
                errors[key] = true;
            }
        });

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <Container>
            <h1 className="py-4 px-1">Add Job</h1>
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
                        value={allSkills.filter((option) => formData.skills.includes(option.value))}
                        onChange={setUserChoice}
                        isInvalid={formErrors.skills}
                        required
                        options={allSkills}
                    >

                    </Select>

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