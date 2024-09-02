import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contactNo: '',
    Address: '',
    role: 'customer' // default role
  });
  const [isAdmin, setIsAdmin] = useState(false); // state to check if the user is admin
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the logged-in user is an admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

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
      await axios.post('http://localhost:8000/user/users', formData);
      alert('User created successfully');
      navigate('/'); // Redirect to home or any other page after successful creation
    } catch (error) {
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <Container>
      <h2>Create User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
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
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formContactNo">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter contact number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </Form.Group>

        {isAdmin && (
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
        )}

        <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
          Create User
        </Button>
      </Form>
    </Container>
  );
}

export default CreateUser;
