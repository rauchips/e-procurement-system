const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

const governmentRouter = require('./routes/government');
const vendorRouter = require('./routes/vendor');

const app = express();

const db = require('./config/db').MongoURI;
const { MongoURI } = require('./config/db');


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to MongoDB Atlas')).catch(err => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/government', governmentRouter);
app.use('/api/vendor', vendorRouter);

module.exports = app;
