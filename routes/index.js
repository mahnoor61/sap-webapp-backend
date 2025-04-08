const express = require("express");
const app = express();



// const WebsiteRoutes = require('./website/index');
const APRoutes = require('./admin-panel');

// app.use("/web", WebsiteRoutes);
app.use("/ap", APRoutes);

module.exports = app
