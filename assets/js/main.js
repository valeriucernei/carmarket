$(document).ready(function() {
    var app = $.spapp({defaultView : 'main'}); // initialize

    app.route({ view : "main", load : "listings.html", onReady: function() {
        $.getScript("assets/js/quick-search.js", function(){});
        $.getScript("assets/js/listings.js", function(){});}
    });

    app.route({ view : "new", load : "new.html", onReady: function() {
        $.getScript("assets/js/new-ad.js", function(){});}
    });

    app.route({ view : "register", load : "register.html", onReady: function() {
        $.getScript("assets/js/register.js", function(){});}
    });

    app.route({ view : "forgot", load : "forgot.html", onReady: function() {
        $.getScript("assets/js/forgot.js", function(){});}
    });

    app.route({ view : "reset", load : "reset.html", onReady: function() {
        $.getScript("assets/js/reset.js", function(){});}
    });

    app.run();
    /*
    if (history.pushState) {
            if(window.location.href.split('/').pop() == '#main'){
                alert("GOOD");
                window.history.pushState("object or string", "Title", '/test');
                //window.history.replaceState("CarMarket", "CarMarket", "/");
                //window.history.pushState("object or string", "Title", '?'
                //                      + window.location.href.split('/').pop());
            }
        } else {
            if(window.location.href.split('/').pop() == '#main'){
                document.location.href = '';
        }
    }*/

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

    $('#loginModal').on('shown.bs.modal', function () {
      $('#loginInput').trigger('focus');
    })
});

function doLogin() {
    $("#loginButton").addClass('disabled');
    alert("1");
    $.post(getUrl() + "/api/login/", jsonize_form("#loginForm")).done(function( data ) {
        alert("2");
        $('#loginModal').modal('hide');
        $("#loginButton").removeClass('disabled');
        window.localStorage.setItem("token", data.token);
        location.reload();
    }).fail(function(error){
        $("#wrongPass").show().text( error.responseJSON.message );
        $("#loginButton").removeClass('disabled');
    });
}
