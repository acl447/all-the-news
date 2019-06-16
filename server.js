let express = require("express");

let mongoose = require("mongoose");

let axios = require("axios");

let cheerio = require("cheerio");

//Require all models
let db = require("./models");

let PORT = process.env.PORT || 3000;

//initialize Express
let app = express();

//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect to the Mongo DB
mongoose.connect(MONGODB_URI);