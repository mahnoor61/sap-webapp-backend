const express = require("express");
const app = express();
const cors = require('cors');
require('./utils/cronJob');

require("dotenv").config();
require("./config/database").connect();

app.use(express.json());
app.use(express.static(__dirname + '/public'));


const apiRoutes = require("./routes/index");


const CORS_OPTIONS = process.env.CORS_OPTIONS;
let corsOrigins = [];

if (CORS_OPTIONS) {
    corsOrigins = CORS_OPTIONS.split(',').map(origin => origin.trim());
}

const corsOptions = {
    origin: corsOrigins, // Allow all origins if none specified
    optionsSuccessStatus: 200, // For legacy browser support
};


app.use(cors({corsOptions, credentials: true}));

app.use("/api", apiRoutes);


module.exports = app;