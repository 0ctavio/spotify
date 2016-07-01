var saveTrack = window.localStorage.getItem("track");
var arrayTrack = saveTrack.split(",");

arrayTrack.forEach(function(cancion){
	searchTrack(cancion);
});

function searchTrack(artistSing) {

    $.ajax({
           url: 'https://api.spotify.com/v1/tracks/'+artistSing,
           dataType: "json",
           success: formatTracks,
           error: function () {
               console.log("error");
           }
    });
}

function formatTracks(sing) {
        var trackName = sing.name;
        var trackPrev = sing.preview_url;
        var id = sing.id;
       
        var html = "";
        html += '<li id ="'+id+'">'+
                   '<h2> ' + trackName + ' </h2>'+ 
                   '<a href = "'+trackPrev+'" target = "a_blank">preview</a>'+
                   '<button type ="button">Guardar</button>';   
        $('.subtitle3').show();
        //$("body").append(html);   
        $("#resultsTracks").append(html);
   
}




/*function searchSing(artistSing) {

    $.ajax({
        url: 'https://api.spotify.com/v1/tracks/'+ artistSing,
        dataType: "json",
        success: formatSing,
        error: function () {
            console.log("error");
        }

    });

}

function formatSing(sing) {        
    var singName = sing.name;
    var singPrev = sing.preview_url;
    var id = sing.id;

    var html = "";
    html += '<li id = "'+id+'">'+
    			'<h2> ' + singName + ' </h2>'+ 
    			'<a href = "'+singPrev+'" target = "a_blank">preview</a>'+
    			'<button type = "button">guardar</button>';       
    $("body").append(html);                
}*/