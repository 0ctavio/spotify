function reload() {
    location.reload();
}  

$('.subtitle1').hide();
$('.subtitle2').hide();
$('.subtitle3').hide();
$('.return').hide();
$('.favourite').hide();

$('#submit').on('click', function (event) {
    event.preventDefault();
    var artist = $('input[id="search-box"]').val();
    $('#term-searched').text(artist);
    $('input[id="search-box"]').val("");
    $('.subtitle1').show();
    searchArtist(artist);
    console.log(artist);
});

function searchArtist(artist) {
    $.ajax({
        url: "https://api.spotify.com/v1/search?type=artist&query=" + artist,
        success: formatArtists,
        error: function () {
            console.log("error");
        },
        dataType: "json"
    });
    console.log("La ID del artista es: " + artist);
};

function formatArtists(artists) {
    artists.artists.items.forEach(function displayArtist(artist) {
        var artistName = artist.name;
        //var artistGenres = artist.genres.join(", ");
        var artistImages = artist.images[0].url;

        var html ="";

        html += '<li class="artistCard list-inline" id="' + artist.id + '"><h2 class="name">' + artistName + '</h2>' + 
                    '<img src ="' + artistImages + '"class="img-responsive artist">' + 
                    '<button type="button" class="btn btn-success text-center li-Alb">Álbums</button>' + 
                    '</li>';

        $("#resultsArtist").append(html);
        
        $ ("#resultsArtist button").click(function () {
            $('.divArtist').empty();
            var artistID = $(this).parent().attr("id");     
            searchAlbum(artistID);
            console.log(artistID);
            $('.subtitle2').show();
            $('div .return').show();          
        }); 
    });
};

function searchAlbum(artistID) {
    console.log("clic en album del artista: " + artistID);
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/'+artistID+'/albums?market=ES',
        dataType: "json",
        success: formatAlbum,
        error: function () {
            console.log("error");
        }
    });
    return searchAlbum;
}

function formatAlbum(album) {
    //alert ("hola y adios");
    album["items"].forEach(function displayAlbum (album) {
        var albumName = album.name;
        var albumImages = album.images[0]["url"];

        var html="";
        html +='<li class="albumCard" id="' + album.id + '"><h2 class="name">' + albumName + '</h2>' +
            '<img src="' + albumImages + '" class="img-responsive artist">' + 
            '<button type="button" class="btn btn-warning text-center tracksButton li-Alb">Tracks</button>' +
            '</li>';
    
        $("#resultsAlbums").append(html);

        $("#resultsAlbums button").click(function () {
            var track = $(this).parent().attr("id");     
            $('.subtitle2').show();
            $('div .favourite').show(); 
            searchTrack(track);
            console.log(track);
        });   
    });
}

function searchTrack(track) {
    console.log("clic en tracks del artista: " + track);
    $.ajax({
           url: 'https://api.spotify.com/v1/albums/'+track+'/tracks',
           dataType: "json",
           success: formatTracks,
           error: function () {
               console.log("error");
           }
    });
}

function formatTracks(sing) {
    $ (".divAlbum").empty();
               
    sing["items"].forEach(function (sing) {
        var trackName = sing.name;
        var trackPrev = sing.preview_url;
        var id = sing.id;
       
        var html = "";
        html += '<li id ="'+id+'">'+
                   '<h2> ' + trackName + ' </h2>'+ 
                   '<a href = "'+trackPrev+'" target = "a_blank">preview</a>'+
                   '<button type ="button">Guardar</button>';
        $("#resultsTracks").append(html);
  
        $("#resultsTracks button").click(function(){
           var id = $(this).parent().attr("id");
           favouriteTracks(id);
        });
    });
}

var listTracks = [];

function favouriteTracks(id){
    listTracks.push(id);
    window.localStorage.setItem("track", listTracks);
}
var saveTrack = window.localStorage.getItem("track");
var arrayTrack = saveTrack.split(",");
