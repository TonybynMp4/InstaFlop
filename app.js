const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors()).use(express.json({limit: '50mb'})).use(express.urlencoded({ extended: true }));

const apiRouter = require("./src/routes/api/api.js");
app.use("/api", apiRouter);
app.use(express.static('client/dist'));

module.exports = app;