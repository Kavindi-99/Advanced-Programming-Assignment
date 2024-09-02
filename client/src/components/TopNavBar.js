import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TopNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  // Check if the user is logged in and get user role
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const userRole = isLoggedIn ? user.role : '';

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ABC Restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="/delivery">Delivery</NavDropdown.Item>
              <NavDropdown.Item href="/reservation">Table Reservations</NavDropdown.Item>
              {isLoggedIn && userRole !== 'customer' && (
                <NavDropdown.Item href="/queries">View Customer Queries</NavDropdown.Item>
              )}
            </NavDropdown>
            {isLoggedIn && (
              <>
                <Nav.Link href="/orders">Orders</Nav.Link>
                {userRole === 'admin' && (
                  <Nav.Link href="/createUser">Create User</Nav.Link>
                )}
              </>
            )}
            {!isLoggedIn ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;
