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
router.get("/view/:id", (req, res) => {

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
router.get("/edit/:id", (req, res) => {
    let {id} = req.params;
    let q3 = `SELECT * FROM students WHERE id = ${id}`;

    try {

        connection.query(q3, (err, result) => {
            if(err) throw err;
            let student = result[0];
            res.render("edit", {student});
        });
    }catch(err) {
        console.log("error");
    }
});


//update route
router.patch("/:id", (req, res) => {
    let {id} = req.params;
    let {name : newName, phone : newPhone} = req.body;
    let q4 = `SELECT * FROM students WHERE id = ${id}`;

    try {

        connection.query(q4, (err, result) => {
            if(err) throw err;
            let student = result[0];

            let q5 = `UPDATE students set name = ? , phone = ? WHERE id = ?`;
            const values = [newName, newPhone, id];
            connection.query(q5, values, (err, result) => {
                    if(err) throw err;
                    res.redirect("/students");
                });
        });
    }catch(err) {
        console.log("error");
    }
});



//add student form
router.get("/new", (req, res) => {
    res.render("new");
});

router.post("/", (req, res) => {
    let {name, email, age, course, phone} = req.body;

    let q6 = `INSERT INTO students (name, email, age, course, phone) VALUES (?, ?, ?, ?, ?)`;
    let values = [name, email, age, course, phone];

    connection.query(q6, values, (err, result) => {
        if (err) throw err;
        res.redirect("/students");
    });
});


//delete student

router.delete("/:id", (req, res) =>{
    let {id} = req.params;
    let q7 = `DELETE FROM students WHERE id = ${id}`;

    try {

        connection.query(q7, (err, result) =>{
            if(err) throw err;

            res.redirect("/students");
        });
    }catch(err) {
        console.log("error");
    }
});



module.exports = router;
