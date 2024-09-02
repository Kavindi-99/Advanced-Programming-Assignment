import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import video from '../assets/Videos/resVid.mp4';
import SlidableCards from '../components/slideCards';
import axios from 'axios';
import offerImage from '../assets/Images/dishes.jpg'; 

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOfferModal, setShowOfferModal] = useState(true); // Show the modal by default

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
      const response = await axios.post('http://localhost:8000/query/queries', formData);
      console.log('Query submitted successfully:', response.data);
      setMessage('Your query has been submitted successfully.');
      setError('');
      setFormData({
        name: '',
        email: '',
        query: ''
      });
    } catch (error) {
      console.error('Error submitting query:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Error submitting query.');
      setMessage('');
    }
  };

  const handleClose = () => setShowOfferModal(false);

  return (
    <>
      {/* Popup Modal for Offers */}
      <Modal show={showOfferModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Special Offer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={offerImage}
            alt="Special Offer"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <center>

          <p className="mt-3" style={{color : 'red'}}>Don't miss out on our special offers! Visit us and enjoy exclusive 10 % - 15 % discounts.</p>
          </center>
        </Modal.Body>

      </Modal>

      {/* Rest of the Home Component */}
      <div style={{ background: 'linear-gradient(to bottom, white, white)' }}>
        <div className="video-background-container" style={{ position: 'relative', height: '90vh', paddingBottom: 20 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '90vh', overflow: 'hidden' }}>
            <video autoPlay loop muted style={{ width: '100%', height: '100%', filter: 'blur(5px)', objectFit: 'cover', zIndex: -1 }}>
              <source src={video} type="video/mp4" />
              Please use a browser that supports the video tag.
            </video>
          </div>
          <Container style={{ position: 'absolute', top: 0, left: 100, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 1 }}>
            <Row>
              <Col>
                <h1 className="display-2 text-white fw-bold">ABC Restaurant</h1>
                <p className="lead text-white">Welcome to the ABC Restaurant</p>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 18,
              margin: 10,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}>
              <h2 style={{
                color: 'Black',
                fontWeight: 'bold',
                fontSize: 45
              }}>Our Vision</h2>
              <p style={{
                textAlign: 'justify',
                fontSize: 20
              }}>
                Fine Dining
                Indulge in an upscale dining experience with our gourmet menu, featuring a selection of exquisite dishes crafted from the freshest ingredients. Perfect for celebrations and elegant evenings.

                Private Events
                Host your special events at ABC Restaurant. We offer comprehensive event planning and catering services for weddings, corporate events, and other gatherings. Let us help you create unforgettable moments.

                Takeout and Delivery
                Enjoy our delectable meals from the comfort of your home with our convenient takeout and delivery options. Simply place your order online and have your favorite dishes delivered right to your door.
              </p>
            </Col>
            <Col style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 18,
              margin: 10,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}>
              <h2 style={{
                color: 'Black',
                fontWeight: 'bold',
                fontSize: 45
              }}>Our Journey</h2>
              <p style={{
                textAlign: 'justify',
                fontSize: 20
              }}>
                At ABC Restaurant, we are committed to providing a diverse range of exceptional services to meet the needs of our valued guests. Whether you're here for a special occasion or a casual meal, we offer something for everyone. Explore our services below:

                Founded in 2000, ABC Restaurant has been a cornerstone of the local dining scene for over two decades. From our humble beginnings, we have grown into a beloved establishment known for our commitment to quality and exceptional service.

                Our journey began with a simple vision: to create a warm, welcoming space where guests could enjoy delicious food and memorable experiences. Over the years, we’ve expanded our menu, refined our recipes, and embraced innovative dining trends while staying true to our core values of excellence and hospitality.
              </p>
            </Col>
          </Row>
          <Row>
            <Col style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 18,
              margin: 10,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}>
              <h2 style={{
                color: 'Black',
                fontWeight: 'bold',
                fontSize: 45
              }}>Our Products</h2>
              <SlidableCards />
            </Col>
            <Col style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 18,
              margin: 10,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}>
              <h2 style={{
                color: 'Black',
                fontWeight: 'bold',
                fontSize: 45
              }}>Any Queries?</h2>
              <Container className="mt-4">
                <Row>
                  <Col md={12} className="mx-auto">
                    <h2 className="text-center mb-4">Reach Us</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formQuery">
                        <Form.Label>Query</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Your query"
                          name="query"
                          value={formData.query}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
                        Send Query
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
