const express = require("express");

const router = express.Router();

const connection = require("../sqlNodeConnection/db");


// show all students
router.get("/", (req, res) => {
    let q = `SELECT * FROM students`;

    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let students = result;
            let studentsCnt = students.length;
            res.render("showStudents", {students, studentsCnt});
        });
    } catch (err) {
        console.log("error");
    }
});

//show student details
router.get("/:id", (req, res) => {

    let {id} = req.params;
    let q2 = `SELECT * FROM STUDENTS WHERE id = '${id}'`;

    try{

        connection.query(q2, (err, result) => {
            if(err) throw err;

            let student = result[0];

            res.render("showStudent",  {student});
        });

    }catch(err) {
        console.log("error");
    }
});

//edit student 
router.patch("")










module.exports = router;
