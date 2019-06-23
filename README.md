# All the News That's Fit to Scrape

This is an app enabling users to view and comment on articles scraped from digg.com. Click on an article headline, summary or url to see comments on the article. Type your own comment in the text box and click "Save Note" to save it or "Delete Note" to remove it.

Technologies used to make this app are MongoDB, Mongoose, Cheerio, Axios, Node, Heroku, Git, HTML5, CSS, JavaScript, jQuery, Morgan, Express-Handlebars and Express.

To make this app, I first created a MongoDB database and connected to it using Mongoose. Next, I used Express, Axios and Cheerio to create routes to scrape articles from digg.com and to display them in the browser. I created other routes to allow users to add, update and delete notes on the articles.

I used Mongoose to create Article and Note models that outline what elements of each article and note are stored in the database and displayed in the browser. I used jQuery to add a function to display an article's associated note in the browser when the article's headline, summary or url is clicked, and functions to save and delete notes when the "Save Note" and "Delete Note" buttons are clicked.

