const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require("xss-clean");
const hpp = require("hpp");

const route = require('./routes/main');

const app = express();

const port = process.env.PORT || 8080;
const DB_url = process.env.DB || 'mongodb://127.0.0.1:27017/res?compressors=zlib&gssapiServiceName=mongodb';


app.use(bodyParser.json()); // application/json
app.use(cors());

//security
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
//security


app.use('/api', route);
//error handler
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});
//database
mongoose
    .connect(
        DB_url
    )
    .then(result => {
        const server = app.listen(port);
    })
    .catch(err => console.log(err));
