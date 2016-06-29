$(document).on("click", "#requestLogin", requestData);

function requestData() {
    var nameUser = $("#userName").val();
    var passwordUser = $("#pwd").val();
    var url = "data/dataUser.jsonp";
    
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        jsonpCallback: "login",
        crossDomain: true,
        success: function (login) {
                  var validation = false;
            
                   for (var i = 0; i  <  login.users.length; i++) {
                           if (login.users[i].name === nameUser && login.users[i].password === passwordUser) {
                                    validation = true;
                           }
                   }
                   
                   if (validation === true) {
                           console.log("El usuario y la contraseña son correctas");
                           window.location.href = "webSearch.html";
                   } else {
                           console.log("Usuario y contraseña incorrectos. Vuelve a intentarlo");
                   }
            //console.log(response); // server response
        }
    });
}