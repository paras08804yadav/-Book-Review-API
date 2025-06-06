const dotenv = require("dotenv");
const {register} = require('./controllers/authControllers/register');
const {login} = require('./controllers/authControllers/login');
const {refreshToken} = require('./controllers/authControllers/refreshToken');
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.post('/signup', register);
app.post('/login', login);
app.post('/refresh-token', refreshToken);

module.exports = app;