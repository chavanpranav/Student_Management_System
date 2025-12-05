const express = require("express");
const app = express();

app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "/views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

const connection = require("./sqlNodeConnection/db");

app.use(express.static(path.join(__dirname, "public")));

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);










const port = 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})