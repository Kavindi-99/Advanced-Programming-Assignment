const mongoose = require('mongoose'); // Erase if already required

var orders = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    orderItems: [{
        item: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalBill: {
        type: Number,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    creation_date: { 
        type: Date, 
        default: Date.now
    }
});

const Orders = mongoose.model("Order", orders);

module.exports = Orders;
