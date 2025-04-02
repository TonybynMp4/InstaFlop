const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const app = express();

dotenv.config();
app
.use(cors({
	origin: process.env.NODE_ENV === 'dev' ? 'http://localhost:5173' : 'https://instaflop.fr',
  	credentials: true,
}))
.use(express.json({limit: '50mb'}))
.use(express.urlencoded({ extended: true }))
.use(cookieParser());

const apiRouter = require("./src/routes/index.js");
app.use("/api", apiRouter)
.use(history())
.use(express.static('client/dist'));

module.exports = app;