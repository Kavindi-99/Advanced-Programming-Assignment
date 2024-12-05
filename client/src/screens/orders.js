
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in and get role.
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        } else {
            setUserRole(user.role);
            setUserId(user._id);

            // Fetch orders and users based on role.
            const fetchOrdersAndUsers = async () => {
                try {
                    // Fetch orders
                    const ordersResponse = await axios.get('http://localhost:8000/order/orders');
                    if (user.role === 'customer') {
                        setOrders(ordersResponse.data.filter(order => order.customerId === user._id));
                    } else {
                        setOrders(ordersResponse.data);

                        // Fetch users with role 'customer' for filtering
                        const usersResponse = await axios.get('http://localhost:8000/user/users');
                        setCustomers(usersResponse.data.filter(user => user.role === 'customer'));
                        
                        // Link unknown users based on contactNo
                        await linkUnknownOrdersWithCustomers(ordersResponse.data, usersResponse.data);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchOrdersAndUsers();
        }
    }, [navigate]);

    useEffect(() => {
        // Apply filters
        let filtered = orders;

        if (startDate && endDate) {
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.creation_date);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        if ((userRole === 'admin' || userRole === 'staff') && selectedCustomer) {
            filtered = filtered.filter(order => order.customerId === selectedCustomer);
        }

        setFilteredOrders(filtered);
    }, [orders, startDate, endDate, userRole, selectedCustomer]);

    const handleCustomerChange = (e) => {
        setSelectedCustomer(e.target.value);
    };

    const linkUnknownOrdersWithCustomers = async (orders, users) => {
        try {
            // Find unknown orders
            const unknownOrders = orders.filter(order => order.customerId === 'guest');
            
            for (const order of unknownOrders) {
                const contactNo = order.contactNo; // Assuming contactNo is available in the order
                
                // Find the registered user with the same contact number
                const matchedCustomer = users.find(user => user.contactNo === contactNo);

                if (matchedCustomer) {
                    // Update the order with the matched customer's ID
                    await axios.put(`http://localhost:8000/order/orders/${order._id}`, {
                        ...order,
                        customerId: matchedCustomer._id
                    });
                }
            }

            // Refresh orders after linking
            const updatedOrdersResponse = await axios.get('http://localhost:8000/order/orders');
            setOrders(updatedOrdersResponse.data);
        } catch (error) {
            console.error('Error linking orders with customers:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Orders</h2>
            {(userRole === 'admin' || userRole === 'staff') && (
                <>
                    <Form className="mb-4">
                        <Form.Group controlId="formCustomer">
                            <Form.Label>Select Customer</Form.Label>
                            <Form.Control as="select" onChange={handleCustomerChange}>
                                <option value="">All Customers</option>
                                {customers.map(customer => (
                                    <option key={customer._id} value={customer._id}>
                                        {customer.username}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </>
            )}
            <Form className="mb-4">
                <Form.Group controlId="formDateRange">
                    <Form.Label>Select Date Range</Form.Label>
                    <div className="d-flex align-items-center">
                        <Form.Label className="me-2">From:</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            className="form-control me-3"
                        />
                        <Form.Label className="me-2">To:</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="End Date"
                            className="form-control"
                        />
                    </div>
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        {userRole === 'admin' || userRole === 'staff' ? <th>Customer Name</th> : null}
                        <th>Items</th>
                        <th>Total Bill</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order._id}>
                            <td>{new Date(order.creation_date).toLocaleDateString()}</td>
                            {userRole === 'admin' || userRole === 'staff' ? (
                                <td>
                                    {customers.find(customer => customer._id === order.customerId)?.username || 'Unknown'}
                                </td>
                            ) : null}
                            <td>
                                <ul>
                                    {order.orderItems.map((item, index) => (
                                        <li key={index}>
                                            {item.item} (Qty: {item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.totalBill}.00</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Orders;
