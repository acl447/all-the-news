let express = require("express");

let mongoose = require("mongoose");

let axios = require("axios");

let cheerio = require("cheerio");





let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);