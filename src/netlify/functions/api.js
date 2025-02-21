import serverless from 'serverless-http';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()).use(express.json({limit: '50mb'})).use(express.urlencoded({ extended: true }));

const apiRouter = require("../../routes/api/api.js");
app.use("/api", apiRouter);
app.get('/api', (req, res) => {
    res.send('Hello World!')
});
app.get('/api/test', (req, res) => {
    res.send('Test World!')
});

const handler = serverless(app);

module.exports.handler = async (event, context) => {
    await handler(event, context);
    return serverless(app)(event, context);
}