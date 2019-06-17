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

//Routes

//A GET route for scraping the digg website
app.get("/scrape", function (req, res) {


    axios.get("http://digg.com/").then(function (response) {


        let $ = cheerio.load(response.data);

        //grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {

            //Save an empty result object
            let result = {};

            //Add the text and href of every link, and save them as properties of the result
            result.title = $(this)
                .children("a")
                .text();
            result.url = $(this)
                .children("a")
                .attr("href");


            //Create a new Article using the result object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {

                    console.log(dbArticle);
                })
                .catch(function (err) {

                    console.log(err);

                });

        });

        //Send a message to the client
        res.send("Scrape complete");

    });

});
