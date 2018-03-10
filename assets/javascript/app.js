var shows = ["Suits", "The Boondocks", "The Office", "Law and Order", "This Is Us", "Game of Thrones", "Martin", "Celia", "The Fresh Prince of Bel-Air", "All That", "Gullah Gullah Island" ]


//creating a for loop to produce buttons for each array value
function displayButtonGenerator(){
    $("#buttonDisplay").empty(); 
    for (var i = 0; i < shows.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("btn btn-primary show-button");
        gifButton.attr("data-name", shows[i]);
        gifButton.text(shows[i]);
        $("#buttonDisplay").append(gifButton);
    }
}

//creating buttons for newly entered tv shows
function newButtonGenerator(){
	$("#addGif").on("click",function(){
		var newShow = $("#gifCreator").val().trim();
		if (newShow == ""){
			return false;
		}
        //pushing new button variable to show array

		shows.push(newShow);
		displayButtonGenerator();
		return false; //to lock the button to the array

	});
}

//producing gifs based on clicks
$(document).ready(function(){

$("body").on("click",".show-button", function(){
	var activeBtn = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        activeBtn + "&api_key=1Dr8CbNbKbpHx2q89TTzD1YY6yh6FVRB&limit=10";
        console.log(queryURL);
        console.log(activeBtn);


        $.ajax({
        	url: queryURL,
        	method: "GET"
        })

        .then(function(response) {
        	var results = response.data;
            $("#gifs-appear-here").empty(); //emptying previous gifs

        	for (var i = 0; i < results.length; i++){
        		var gifDiv = $("<div class='item'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);

        		var showImage = $("<img>");
        		showImage.attr("src", results[i].images.fixed_height.url);
                showImage.attr("data-still",results[i].images.fixed_height_still.url); // still image
                showImage.attr("data-animate",results[i].images.fixed_height.url); // animated image
                showImage.attr("data-state", "still"); // set the image state
                showImage.addClass("gif");
                
        		gifDiv.append(p);
        		gifDiv.append(showImage);


        	$("#gifs-appear-here").prepend(gifDiv)
        }});
});
});




displayButtonGenerator();
newButtonGenerator();



//still/animated toggling
$(document).on("click", ".gif", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});










