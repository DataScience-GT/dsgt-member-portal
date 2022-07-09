const path = require("node:path");

//setup express
const express = require("express");
const app = express();

//load .env
require("dotenv").config();

const PORT = process.env.PORT || 4211;

//setup logger
// const { log } = require("./logger");

// setup routes
const api = require("./routes/api");

app.use("/api", api);

// io.on("connection", function (client) {
//     //log("client connected.");
// });

// setup static react build
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
