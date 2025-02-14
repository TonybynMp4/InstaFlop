const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors()).use(express.json({limit: '50mb'})).use(express.urlencoded({ extended: true }));

const apiRouter = require("./src/routes/api/api.js");
const routes = require("./src/routes/pages/routes.js");
app.use("/api", apiRouter);
app.use('/', routes);

module.exports = app.set('port', process.env.PORT ?? 3000).set('host', process.env.HOST);