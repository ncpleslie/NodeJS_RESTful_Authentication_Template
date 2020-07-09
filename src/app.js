const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const errorHandling = require('./middleware/error');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

// Routes are declared here
app.use('/', mainRoutes);
app.use('/user', authRoutes);

// Generic Error Handling Middleware
app.use(errorHandling.catchAll);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err);
})

module.exports = app;