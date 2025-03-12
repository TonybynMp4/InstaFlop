const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' })).use(express.urlencoded({ extended: true }));

const apiRouter = require("../../routes/api.js");
app.use("/api", apiRouter);

module.exports.handler = serverless(app);