import React, { useState } from 'react';
import burger from '../assets/Images/burder.jpg';
import dishes from '../assets/Images/dishes.jpg';
import noodles from '../assets/Images/noodles.jpg';
import pans from '../assets/Images/pans.jpg';
import hopper from '../assets/Images/hopper.jpg';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Delivery() {
    const [bill, setBill] = useState([]);
    const [products, setProducts] = useState([
        {
            //add items
            id: 1,
            name: 'Chicken Burger',
            price: 550,
            qty: 1,
            image: burger
        },
        {
            id: 2,
            name: 'Hoppers',
            price: 70,
            qty: 1,
            image: hopper
        },
        {
            id: 3,
            name: 'Pancake',
            price: 120.00,
            qty: 1,
            image: pans
        },
        {
            id: 4,
            name: 'Noodles',
            price: 400,
            qty: 1,
            image: noodles
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const handleQtyChange = (id, amount) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id
                    ? { ...product, qty: Math.max(0, product.qty + amount) }
                    : product
            )
        );
    };

    const addToBill = (name, qty, total) => {
        setBill(prevBill => {
            const existingItem = prevBill.find(item => item.name === name);
            if (existingItem) {
                return prevBill.map(item =>
                    item.name === name
                        ? { ...item, qty: qty, total: qty * item.price }
                        : item
                );
            } else {
                return [...prevBill, { name, qty, total, price: total / qty }];
            }
        });
    };

    const handlePlaceOrder = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            setShowModal(true);
        } else {
            const orderData = {
                customerId: user._id,
                orderItems: bill.map(item => ({
                    item: item.name,
                    quantity: item.qty
                })),
                totalBill: grandTotal,
                contactNo: user.contactNo // Assuming contactNo is available in user object
            };

            placeOrder(orderData);
        }
    };

    const placeOrder = async (orderData) => {
        try {
            await axios.post('http://localhost:8000/order/orders', orderData);
            toast.success("Order Placed!");
            setBill([]); // Clear the bill after order is placed
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error("Failed to place order.");
        }
    };

    const handleModalSubmit = async () => {
        const orderData = {
            customerId: 'guest',
            orderItems: bill.map(item => ({
                item: item.name,
                quantity: item.qty
            })),
            totalBill: grandTotal,
            contactNo: customerDetails.phone, // Use phone number from modal
            name: customerDetails.name, // Use name from modal
            address: customerDetails.address // Use address from modal
        };

        await placeOrder(orderData);
        setShowModal(false);
        setCustomerDetails({ name: '', address: '', phone: '' });
    };

    const handleModalChange = (e) => {
        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
    };

    const grandTotal = bill.reduce((acc, item) => acc + item.total, 0);

    return (
        <>
            <div style={{ fontSize: 40, margin: 20 }}>Delivery Orders</div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 10, borderRadius: 18, margin: 10, justifyContent: 'space-around' }}>
                        <div>
                            <label style={{ fontSize: 20, fontWeight: 'bold' }}>Product: {product.name}</label>
                        </div>
                        <div>
                            <label style={{ fontSize: 20, fontWeight: 'bold' }}>Price: Rs. {product.price * product.qty}.00</label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ margin: 10 }}>
                                <img src={product.image} alt='foodImage' width={100} style={{ borderRadius: 18 }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                                <button
                                    style={{ borderRadius: '40%', width: 40, fontSize: 20, fontWeight: 'bold', alignItems: 'center', border: 'none', marginLeft: 5, marginRight: 5 }}
                                    onClick={() => handleQtyChange(product.id, -1)}
                                >
                                    -
                                </button>
                                <label style={{ fontWeight: 'bold', fontSize: 20 }}>{product.qty}</label>
                                <button
                                    style={{ borderRadius: '40%', width: 40, fontSize: 20, fontWeight: 'bold', alignItems: 'center', border: 'none', marginLeft: 5, marginRight: 5 }}
                                    onClick={() => handleQtyChange(product.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <Button onClick={() => { addToBill(product.name, product.qty, product.price * product.qty) }}>Add</Button>
                    </div>
                ))}
            </div>
            <div>
                <div style={{ fontSize: 40, margin: 20 }}>Bill Summary</div>
                <table style={{ width: '50%', borderCollapse: 'collapse', marginTop: 20 }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: 10, textAlign: 'left' }}>Product</th>
                            <th style={{ padding: 10, textAlign: 'left' }}>Qty</th>
                            <th style={{ padding: 10, textAlign: 'left' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: 10 }}>{item.name}</td>
                                <td style={{ padding: 10 }}>{item.qty}</td>
                                <td style={{ padding: 10 }}>{item.total}.00</td>
                            </tr>
                        ))}
                        <tr style={{ borderTop: '2px solid #ddd', backgroundColor: '#f9f9f9' }}>
                            <td colSpan="2" style={{ padding: 10, textAlign: 'right', fontWeight: 'bold' }}>Grand Total</td>
                            <td style={{ padding: 10, fontWeight: 'bold' }}>{grandTotal}.00</td>
                        </tr>
                    </tbody>
                </table>
                {grandTotal === 0 ? (
                    <></>
                ) : (
                    <Button onClick={handlePlaceOrder}>Place Order</Button>
                )}
            </div>

            {/* Bootstrap Modal for unregistered customers */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Guest User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCustomerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={customerDetails.name}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCustomerAddress" className="mt-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={customerDetails.address}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCustomerPhone" className="mt-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={customerDetails.phone}
                                onChange={handleModalChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSubmit}>
                        Place Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Delivery;
