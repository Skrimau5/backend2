const express = require('express');
const cors = require('cors');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/users");
app.use(cors());

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { userPost, userGet } = require('./controllers/userController');

app.get("/api/users/",userGet);
app.post("/api/users", userPost);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))