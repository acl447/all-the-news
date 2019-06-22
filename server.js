let express = require("express");

let logger = require("morgan");

let mongoose = require("mongoose");

let axios = require("axios");

let cheerio = require("cheerio");

//Require all models
let db = require("./models");

let PORT = process.env.PORT || 3000;

//initialize Express
let app = express();

//Configure middleware

//Use morgan logger for logging requests
app.use(logger("dev"));

//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Routes

//A GET route for scraping the digg website
app.get("/scrape", function (req, res) {


    axios.get("http://www.digg.com/").then(function (response) {


        let $ = cheerio.load(response.data);

        console.log(response.data);

        //Save an empty result object
        let result = {};

        //grab every div with a class of digg-story__content
        $(".digg-story__content").each(function (i, element) {

            //Add the text and href of every link, and the text of every article description,
            // and save them as properties of the result object
            result.headline = $(element)
                .children("header")
                .children("h2")
                .children("a")
                .text();
            result.url = $(element)
                .children("header")
                .children("h2")
                .children("a")
                .attr("href");
            result.summary = $(element)
                .children("div")
                .text();

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



//Route for getting all Articles from the db
app.get("/articles", function (req, res) {


    //Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {

            //If able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            
            //If an error occurred, send it to the client
            res.json(err);
        });
});

//Route for grabbing a specific Article by id, populating it with its note 
app.get("/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {

            //If able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);

        })
        .catch(function (err) {

            //If an error occurred, send it to the client
            res.json(err);
        });
});

//Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {

    //Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function (dbNote) {

            //If a Note was created successfully, find one Article with an _id equal to req.params.id.
            //Update the Article to be associated with the new Note 
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {

            //If able to successfully update an Article, send it back to the client 
            res.json(dbArticle);
        })
        .catch(function (err) {

            //If an error occurred, send it to the client
            res.json(err);

        });
});

//Start the server
app.listen(PORT, function () {

    console.log("App running on PORT " + PORT + "!");

});