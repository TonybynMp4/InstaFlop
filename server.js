const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());

const apiRouter = require("./src/routes/api/api.js");
const routes = require("./src/routes/pages/routes.js");
app.use("/api", apiRouter);
app.use('/', routes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});