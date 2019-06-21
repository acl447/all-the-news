//Grab the articles as a JSON
$.getJSON("/articles", function(data) {
    // For each one
    for (let i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    //Empty the notes from the note section
    $("#notes").empty();
    //Save the id from the p tag
    let thisId = $(this).attr("data-id");

    
})