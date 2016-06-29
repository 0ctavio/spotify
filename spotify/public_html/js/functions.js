//ITERATION 1
$('#submit').on('click', function (event) {
    event.preventDefault();
    var artist = $('input[id="search-box"]').val();
    $('#term-searched').text(artist);
    searchArtist(artist);
    //searchSong(artist);
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
};

function formatArtists(artists) {
    artists["artists"]["items"].forEach(function displayArtist(artist) {
        var artistName = artist.name;
        //var artistGenres = artist.genres.join(", ");
        var artistImages = artist.images[0]["url"];

        var html = "";
        html += '<ul class="artistCard list-inline" id="artista">' + 
                    '<li id="' + artist.id + '"><h2> ' + artistName + ' </h2>' + 
                    '<img src =" ' + artistImages + ' " class="img-responsive artistImage">' + '</li>' +
                '</ul>';
        $("#results").append(html);
        
        $ ("#artista li").unbind("click").click (function () {
            var artistID = $ (this).attr("id");
            //console.log(albumID);
            console.log(artistID);
            
            searchAlbum(artistID);
            
            
            
        }); 
    });
};

function searchAlbum(artistID) {
    //alert("aahaa");
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/'+artistID+'/albums',
        dataType: "json",
        success: formatAlbum,
        error: function () {
            console.log("error");
        }

    });

}

function formatAlbum(album) {
      $ ("#results").empty();
            alert ("hola y adios");
            album["items"].forEach(function (album) {
            var albumName = album.name;
            var albumImages = album.images[0]["url"];
            
            var html = "";
            html += '<li><h2> ' + albumName + ' </h2>' +
                '<img src =" ' + albumImages + ' " class="img-responsive artistImage">' + '</li>';
        
        $("#results").append(html);

  
            });
}



//------------------------------------------------

/*
function searchSong(artist) {
	$.ajax({
		url: "https://api.spotify.com/v1/search?type=track&limit=1&q=" + artist,
		success: formatSong,
		error: function() {
			console.log("error");
		},
		dataType: "json"
	});
};

function formatSong(songs) {
	songs['tracks']['items']['0']['artists'].forEach(function displayAuthor (song) {
		var singerName = song.name;
		$('.author').text(singerName);
		$('#myModalLabel').text(singerName);
		searchArtist(singerName);
	});
	songs['tracks']['items'].forEach(function displayTrackName (song) {
		var songName = song.name;
		$('.title').text(songName);
	});
	songs['tracks']['items'].forEach(function displayImage (song) {
		var songImage = song.album.images[0]['url'];
		$('.cover').html('<img width="300" height="300" alt="song cover" src="' + songImage + '">');
	});
	songs['tracks']['items'].forEach(function displayTrack (song) {
		var songTrack = song.preview_url;
		$('audio').attr('src', songTrack);
	});
};



$('.btn-play').on('click', function() {

	if ($( '.btn-play' ).hasClass( "playing" )) {
		$( '.btn-play' ).removeClass( "playing" );
		$('#js-player').trigger('pause');
	} else {
		$('#js-player').trigger('play');
		$( '.btn-play' ).addClass( "playing" );
	}
});
*/