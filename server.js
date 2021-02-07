const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./config/db");

const login = require('./routes/api/login');
const register = require('./routes/api/register');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Connect
InitiateMongoServer();

// Use Routes
app.use('/api/login', login);
app.use('/api/register', register);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));