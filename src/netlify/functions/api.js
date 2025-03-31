const cookieParser = require('cookie-parser');
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app
.use(cookieParser())
.use(express.json({ limit: '50mb' }))
.use(express.urlencoded({ extended: true }));

const apiRouter = require("../../routes/index.js");
app.use("/api", apiRouter);

module.exports.handler = serverless(app);