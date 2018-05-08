var cartoonArray = ["Mickey Mouse", "Snoopy", "Pink Panther", "Batman", "Goofy"];

$(document).ready(function() {
    for (var i = 0; i < cartoonArray.length; i++) {
        $("#cartoon-buttons").append("<button type='button' onclick='searchGif(\"" + cartoonArray[i] + "\")' class='btn btn-primary' value=' " + cartoonArray[i] + "'> " + cartoonArray[i] + " </button>");
    }
});

function cartoonButtonClicked() {
    var userInput = $('#cartoon-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#cartoon-input').val();

    if (userInput) {
        $('#cartoon-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    var queryUrl= "https://api.giphy.com/v1/gifs/search?apikey=J6cm5h4RhSO1i1iNMUQaZlYtNiJn65Pm&q=" + gifName + "&limit=10";
    $.ajax({
            url: queryUrl,
          
            method: 'GET'
        })
        .then(function(response) {
            console.log(response);
            displayGif(response);
        })
}

function displayGif(response) {
    $('#cartoon').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#cartoon').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}