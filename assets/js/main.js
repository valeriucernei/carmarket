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
        $("#profileButton").show();
        $("#login").hide();
        $("#logout").show();
    }else{
        $("#profileButton").hide();
        $("#login").show();
        $("#logout").hide();
    }
    $("#logout").click(function (){
        window.localStorage.clear("token");
        location.reload();
    });
});

function getUrl() {
    var getUrl = window.location;
    return getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
}

function doLogin() {
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
