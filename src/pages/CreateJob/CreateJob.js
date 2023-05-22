import React, { useState } from 'react';
import Select from 'react-select';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const JobForm = () => {



    const [allSkills, setAllSkills] = useState([
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        skills: '',
        location: '',
        minSalary: '',
        maxSalary: '',
        minExperience: '',
        maxExperience: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: ''
        }));
    };

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
        if (isFormValid()) {
            // Handle form submission logic here
            console.log(formData);
            // Reset the form fields
            setFormData({
                title: '',
                description: '',
                company: '',
                skills: '',
                location: '',
                minSalary: '',
                maxSalary: '',
                minExperience: '',
                maxExperience: ''
            });
            setFormErrors({});
        }
    };

    const isFormValid = () => {
        const errors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'skills' && !value) {
                errors[key] = true;
            }
            if (key !== 'minSalary' && key !== 'maxSalary' && key !== 'skills' && value.trim() === '') {
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
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        isInvalid={formErrors.title}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={formErrors.description}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        isInvalid={formErrors.company}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    <Select
                        name="skills"
                        isMulti
                        value={formData.skills}
                        onChange={(choice) => setUserChoice(choice)}
                        isInvalid={formErrors.skills}
                        required options={allSkills} />
                </Form.Group>

                <Form.Group controlId="location">
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

                <Row>
                    <Col>
                        <Form.Group controlId="minSalary">
                            <Form.Label>Minimum Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="minSalary"
                                value={formData.minSalary}
                                onChange={handleChange}
                            />
                            {formErrors.minSalary && (
                                <Form.Text className="text-danger">
                                    {formErrors.minSalary}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="maxSalary">
                            <Form.Label>Maximum Salary</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxSalary"
                                value={formData.maxSalary}
                                onChange={handleChange}
                            />
                            {formErrors.maxSalary && (
                                <Form.Text className="text-danger">
                                    {formErrors.maxSalary}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="minExperience">
                            <Form.Label>Minimum Experience</Form.Label>
                            <Form.Control
                                type="number"
                                name="minExperience"
                                value={formData.minExperience}
                                onChange={handleChange}
                            />
                            {formErrors.minExperience && (
                                <Form.Text className="text-danger">
                                    Please enter Minimum Experience.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="maxExperience">
                            <Form.Label>Maximum Experience</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxExperience"
                                value={formData.maxExperience}
                                onChange={handleChange}
                            />
                            {formErrors.maxExperience && (
                                <Form.Text className="text-danger">
                                    Please enter Maximum Experience.
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

export default JobForm;