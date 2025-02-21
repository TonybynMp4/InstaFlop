import serverless from 'serverless-http';

export async function handler(event, context) {
    const express = require('express');
    const app = express();
    const cors = require('cors');

    app.use(cors()).use(express.json({limit: '50mb'})).use(express.urlencoded({ extended: true }));

    const apiRouter = require("../../routes/api/api.js");
    app.use("/api", apiRouter);

    return serverless(app)(event, context);
}