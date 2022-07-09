const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("welcome to the api!");
    res.status(200);
});

router.get("/auth", (req, res, next) => {
    // let auth = req.headers.authorization;

    res.send(req.query);
    res.status(200);
});

module.exports = router;
