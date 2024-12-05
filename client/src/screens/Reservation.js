import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Reservation() {
  const [tables, setTables] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const navigate = useNavigate();

  // Fetch table data from the API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8000/table/tables');
        setTables(response.data);
        // Extract unique branches from the tables data
        const uniqueBranches = [...new Set(response.data.map(table => table.rest))];
        setBranches(['All', ...uniqueBranches]);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTables();
  }, []);

  // Fetch user role from localStorage.
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('user'))?.role;
    if (!role) {
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  // Handle booking a table
  const handleBookTable = async (tableId) => {
    try {
      await axios.put(`http://localhost:8000/table/tables/${tableId}`, { Status: 1 });
      const response = await axios.get('http://localhost:8000/table/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error booking table:', error);
    }
  };

  // Handle changing table status
  const handleChangeStatus = async (tableId, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/table/tables/${tableId}`, { Status: newStatus });
      const response = await axios.get('http://localhost:8000/table/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error changing table status:', error);
    }
  };

  // Handle branch selection change
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Filter tables based on selected branch
  const filteredTables = selectedBranch === 'All' 
    ? tables 
    : tables.filter(table => table.rest === selectedBranch);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Table Reservations</h2>
      <h3 className="text-center mb-4">Logged in as {userRole}</h3>
      <Form.Group controlId="branchSelect">
        <Form.Label>Search by Branch</Form.Label>
        <Form.Control as="select" value={selectedBranch} onChange={handleBranchChange}>
          {branches.map(branch => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Status</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTables.map(table => (
            <tr key={table._id}>
              <td>{table.TableNo}</td>
              <td>{table.Status === 0 ? 'Available' : 'Booked'}</td>
              <td>{table.rest}</td>
              <td>
                {userRole === 'admin' && (
                  <>
                    <Button 
                      variant="success" 
                      onClick={() => handleChangeStatus(table._id, 0)} 
                      disabled={table.Status === 0}
                    >
                      Mark as Available
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleChangeStatus(table._id, 1)} 
                      disabled={table.Status === 1}
                      className="ms-2"
                    >
                      Mark as Booked
                    </Button>
                  </>
                )}
                {userRole === 'staff' && (
                  <Button variant="secondary" disabled>
                    View Only
                  </Button>
                )}
                {userRole === 'customer' && table.Status === 0 && (
                  <Button 
                    variant="primary" 
                    onClick={() => handleBookTable(table._id)}
                  >
                    Book Table
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

export default Reservation;
// reservations