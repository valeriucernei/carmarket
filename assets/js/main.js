$(document).ready(function() {
    var app = $.spapp({defaultView : 'main'}); // initialize

    app.route({ view : "main", load : "listings.html", onReady: function() {
        $.getScript("assets/js/quick-search.js", function(){});}
    });

    app.route({ view : "new", load : "new.html", onReady: function() {
        $.getScript("assets/js/new-ad.js", function(){});}
    });

    app.run();

    if(window.localStorage.getItem("token")){
        $(".login-user").show();
        $(".login-guest").hide();
    }else{
      $(".login-user").hide();
      $(".login-guest").show();
    }

    $("#logout").click(function (){
        window.localStorage.clear("token");
        location.reload();
    });
});

function getUrl() {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    if(baseUrl.slice(-1) == "/") baseUrl = baseUrl.slice(0, -1);
    return baseUrl;
}

function doLogin() {
    alert(getUrl());
    $("#loginButton").addClass('disabled');
    var login_info = {
        "login" : $("#loginInput").val(),
        "pass" : $("#passwordInput").val()
    };

    $.post(getUrl() + "/api/login", login_info).done(function( data ) {
        $('#loginModal').modal('hide');
        $("#loginButton").removeClass('disabled');
        window.localStorage.setItem("token", data.token);
        location.reload();
    }).fail(function(error){
        $("#wrongPass").show().text( error.responseJSON.message );
        $("#loginButton").removeClass('disabled');
    });
}
