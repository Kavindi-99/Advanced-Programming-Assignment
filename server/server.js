const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); //js middleware
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log('\x1b[34m', "MongoDb connected!");
});


const user = require('./routes/user.js');
app.use("/user", user);

const query = require('./routes/query.js');
app.use("/query", query);

const table = require('./routes/table.js');
app.use("/table", table);

const order = require('./routes/orders.js');
app.use("/order", order);



app.listen(port, () => {
    console.log("\x1b[36m%s\x1b[0m", "PORT connected on " + port);
})