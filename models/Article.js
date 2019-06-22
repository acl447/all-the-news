let mongoose = require("mongoose");

//Save a reference to the Schema constructor
let Schema = mongoose.Schema;

//Using the Schema constructor, create a new ArticleSchema object
let ArticleSchema = new Schema({

    headline: {

        type: String,
        required: true

    },

    summary: {

        type: String,
        required: true
    },

    url: {

        type: String,
        required: true
    },


    note: {

        type: Schema.Types.ObjectId,
        ref: "Note"

    }



});

//creates model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);

//Export the Article model
module.exports = Article;
