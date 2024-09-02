import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login', formData);
      console.log('Login successful:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
      setSuccess('Login successful');
      setError('');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError(error.response.data.error || 'Login failed');
      setSuccess('');
    }
  };

  const handleRegister = () => {
    navigate('/createUser');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4} className="mx-auto">
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
              Login
            </Button>
          </Form>
          <Button 
            variant="link" 
            onClick={handleRegister} 
            style={{ display: 'block', marginTop: 10, textAlign: 'center' }}
          >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
