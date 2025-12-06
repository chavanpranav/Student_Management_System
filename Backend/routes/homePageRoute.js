const express = require("express");

const router = express.Router();

const connection = require("../sqlNodeConnection/db");

router.get("/", (req, res) => {
    res.render("homePage");
});


module.exports = router;