import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import burger from  '../assets/Images/burder.jpg'
import dishes from  '../assets/Images/dishes.jpg'
import noodles from  '../assets/Images/noodles.jpg'
import pans from  '../assets/Images/pans.jpg'

const SlidableCards = () => {
  const menuItems = [
    {
      title: 'Classic Burger',
      description: 'A delicious dish made with fresh ingredients.',
      imgSrc: burger
    },
    {
      title: 'Noodles',
      description: 'A savory and flavorful meal that everyone loves.',
      imgSrc: noodles
    },
    {
      title: 'Curry',
      description: 'A classic dish that is sure to satisfy your cravings.',
      imgSrc: dishes
    },
    {
      title: 'Pan cackes',
      description: 'A classic dish that is sure to satisfy your cravings.',
      imgSrc: pans
    }
  ];

  return (
    <Carousel>
      {menuItems.map((card, index) => (
        <Carousel.Item key={index}>
          <Card style={{ width: '100%',paddingBottom : 20 }}>
            <Card.Img variant="top" src={card.imgSrc} height={400}/>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SlidableCards;
