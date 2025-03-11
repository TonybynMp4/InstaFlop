import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
const app = express();

dotenv.config();
app.use(cors()).use(express.json({limit: '50mb'})).use(express.urlencoded({ extended: true }));

const apiRouter = (await import("./src/routes/api/api.js")).default;
app.use("/api", apiRouter);
app.use(express.static('client/dist'));

export default app;