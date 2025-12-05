const express = require("express");

const {faker} = require("@faker-js/faker");
// const {v4 : uuidv4} = require("uuid");

const connection = require("../sqlNodeConnection/db");

const courses = ["C++", "Java", "Python", "AI", "ML", "WebDev", "DevOps", "Cloud"];
let idcnt = 1;
let createUser = ()=> {
    return [
        idcnt++,
        faker.person.fullName(),
        faker.internet.email(),
         faker.number.int({ min: 18, max: 25 }), 
        faker.helpers.arrayElement(courses),
        faker.string.numeric(10)
    ];
};

const data = [];

for(let i = 1; i < 200; i++) {
    data.push(createUser());
}

let q = `INSERT INTO STUDENTS (id, name, email, age, course, phone) VALUES ?`;

try{
    connection.query(q, [data], (err, result) => {
        if(err) throw err;

        console.log("Data inserted succesfully!");
    });
}catch(err) {
    console.log("error");
}