//ITERATION 1
$('#submit').on('click', function (event) {
    event.preventDefault();
    var query = $('input[id="search-box"]').val();
    $('#term-searched').text(query);
    searchArtist(query);
});


function searchArtist(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search?type=artist&query=' + query,
        success: formatArtists,
        error: function () {
            console.log('fatal error!!!');
        },
        dataType: 'json'
    });
}
;

function formatArtists(artists) {
    artists['artists']['items'].forEach(function displayArtist(artist) {
        var artistName = artist.name;
        var artistGenres = artist.genres.join(', ');
        var artistImages = artist.images[1]['url'];

        var html = "";
        html += "<ul class='artistCard text-center'>\n\
                    <li><h2>" + artistName + "</h2></li>\n\
                    <li><img src=" + artistImages + " class='img-responsive' height='200px' width='200px'></img</li>\n\
                    <li>" + artistGenres + "</li>\n\
                </ul>";
        $("#results").append(html);
    });
}
;