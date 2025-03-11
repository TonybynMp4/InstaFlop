import serverless from 'serverless-http';
import express from 'express';
const app = express();

app.use(express.json({ limit: '50mb' })).use(express.urlencoded({ extended: true }));

const apiRouter = require("../../routes/api/api.js");
app.use("/api", apiRouter);

export const handler = serverless(app);