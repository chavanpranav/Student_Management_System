const express = require("express");

const router = express.Router();

const connection = require("../sqlNodeConnection/db");

router.get("/", (req, res) => {
    let q = `SELECT * FROM students`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let students = result;
            res.render("showStudents", {students});
        });
    } catch (err) {
        console.log("error");
    }
});












module.exports = router;
