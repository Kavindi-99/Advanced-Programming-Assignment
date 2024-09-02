import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

function Queries() {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Check if user is admin or staff
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user ? user.role : '';

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/query/queries');
        setQueries(response.data);
      } catch (error) {
        setError('Failed to fetch queries.');
      }
    };

    fetchQueries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/query/queries/${id}`);
      setQueries(queries.filter(query => query._id !== id));
      setSuccess('Query deleted successfully.');
    } catch (error) {
      setError('Failed to delete query.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Customer Queries</h2>
      <h2 className="text-center mb-4">Loggd in as {userRole}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Query</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries.map(query => (
            <tr key={query._id}>
              <td>{query.name}</td>
              <td>{query.email}</td>
              <td>{query.query}</td>
              <td>
                {userRole === 'admin' && (
                  <Button variant="danger" onClick={() => handleDelete(query._id)}>
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Queries;
