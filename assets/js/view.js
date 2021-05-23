$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')){
        $.get("api/ads/" + urlParams.get('id')).done(function(data){
            $(".car-attributes-short,.car-attributes").html("");
            $(".js-ad-view").show();
            $(".car-title").html(data.title);
            $(".car-info").html("Created at "+data.date.substring(0, 10)+" | Updated at "+data.updated.substring(0, 10)+" | ID: "+data.id);
            $(".car-brand-model").html(data.brand_name+" "+data.model_name);
            $(".car-price").html(parseInt(data.price).toLocaleString()+'<i class="fa fa-euro"></i>');
            $(".car-price2").html('Price: '+parseInt(data.price).toLocaleString()+'&nbsp;<i class="fa fa-euro"></i>');
            if(data.fabricated > 0) {
                $(".car-attributes-short").append('<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-calendar3">'
                      +  '<path fill-rule="evenodd" d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"></path>'
                      +  '<path fill-rule="evenodd" d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>'
                      +  '</svg>&nbsp;'+data.fabricated+'</li>');
                $(".car-attributes").append('<tr><td>Year of production</td><td>'+data.fabricated+'</td></tr>');
            }
            if(data.km > 0){
                $(".car-attributes-short").append('<li class="list-inline-item"><i class="fas fa-angle-double-up"></i>&nbsp;'+parseInt(data.km).toLocaleString()+' km</li>');
                $(".car-attributes").append('<tr><td>Vehicle mileage</td><td>'+parseInt(data.km).toLocaleString()+' km</td></tr>');
            }
            if(data.fuel_type > 0){
                var fuel;
                switch(parseInt(data.fuel_type)){
                    case 1: fuel = "Gasoline"; break;
                    case 2: fuel = "Diesel"; break;
                    case 3: fuel = "Gas"; break;
                    case 4: fuel = "Hybrid"; break;
                    case 5: fuel = "Electric"; break;
                }
                $(".car-attributes-short").append('<li class="list-inline-item"><i class="la la-cogs"></i>&nbsp;'+fuel+'</li>');
                $(".car-attributes").append('<tr><td>Fuel type</td><td>'+fuel+'</td></tr>');
            }
            if(data.gearbox > 0){
                var gearbox;
                switch(parseInt(data.gearbox)){
                    case 1: gearbox = "Manual"; break;
                    case 2: gearbox = "Automatic"; break;
                }
                $(".car-attributes-short").append('<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-manual-gearbox">'
                        + '<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle>'
                        + '<line x1="5" y1="8" x2="5" y2="16"></line><line x1="12" y1="8" x2="12" y2="16"></line><path d="M19 8v2a2 2 0 0 1 -2 2h-12"></path>'
                        + '</svg>&nbsp;'+gearbox+'</li>');
                $(".car-attributes").append('<tr><td>Gearbox</td><td>'+gearbox+'</td></tr>');
            }
            if(data.motor_size > 0){
                $(".car-attributes-short").append('<li class="list-inline-item"><i class="icon ion-speedometer"></i>&nbsp;'+parseInt(data.motor_size).toLocaleString()+' cm<sup>3</sup></li>');
                $(".car-attributes").append('<tr><td>Engine size</td><td>'+parseInt(data.motor_size).toLocaleString()+' cm<sup>3</sup></td></tr>');
            }
            $(".car-description").html(data.description);

            $.get("api/photos/ad/" + urlParams.get('id')).done(function(photos){
                console.log(photos);
                if(!photos.length) $(".slider-for").html('<div><img data-u="image" src="https://cdn.car-market.live.fra1.cdn.digitaloceanspaces.com/default.png" /></div>');
                for(var i = 0; i < photos.length; i++){
                    $(".slider-for").append('<div><img data-u="image" src="https://cdn.car-market.live.fra1.cdn.digitaloceanspaces.com/'+photos[i].name+'" />'
                                          + '<img data-u="thumb" src="https://cdn.car-market.live.fra1.cdn.digitaloceanspaces.com/'+photos[i].name+'" /></div>');
                }
                loadViewSlider();
            }).fail(function(error){
                console.log(error);
            });
            $.get("api/account/" + data.user_id).done(function(user_data){
                $(".car-seller-name").html('<a onclick="goToProfile('+data.user_id+')" style="color:black; text-decoration: none;">'+user_data.fname+" "+user_data.lname+'</a>');
                $(".car-seller-info,.car-seller-info-small").html('<li style="color: rgb(145,145,145);">Registered on '+user_data.reg_date.substring(0, 10)+'</li>'
                                                                    +'<li style="color: rgb(145,145,145);">Publications '+123+'</li>'
                                                                    +'<li style="color: rgb(204,0,0);font-size: 22px;">+'+user_data.phone+'</li>');
            }).fail(function(error){
                console.log(error);
            });
            //window.localStorage.setItem("token", data.token);
        }).fail(function(error){
            $('.confirmedAlertError').show().text( error.responseJSON.message );
        });

        if(localStorage.getItem("token")) {
            $.ajax({
                url: 'api/user/ads/verify/' + urlParams.get('id'),
                type: 'get',
                contentType: "application/json",
                beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
                success: function (data) {
                    $('.ad-owner').show();
                    //$('#editAdButton').attr('href', getUrl()+"/?id="+urlParams.get('id')+"#edit");
                }
            });
        }
    } else {
        $('.confirmedAlertError').show().text("No token found!");
    }
})

function goAdEditPage(){
    location.replace("#edit");
}

function loadViewSlider(){

    var jssor_1_SlideshowTransitions = [
      {$Duration:800,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:-0.3,$SlideOut:true,$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:-0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,$SlideOut:true,$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:0.3,$During:{$Top:[0.3,0.7]},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:-0.3,$SlideOut:true,$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:-0.3,$During:{$Top:[0.3,0.7]},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:0.3,$SlideOut:true,$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,$Cols:2,$During:{$Left:[0.3,0.7]},$ChessMode:{$Column:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,$Cols:2,$SlideOut:true,$ChessMode:{$Column:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:0.3,$Rows:2,$During:{$Top:[0.3,0.7]},$ChessMode:{$Row:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:0.3,$Rows:2,$SlideOut:true,$ChessMode:{$Row:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:0.3,$Cols:2,$During:{$Top:[0.3,0.7]},$ChessMode:{$Column:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,y:-0.3,$Cols:2,$SlideOut:true,$ChessMode:{$Column:12},$Easing:{$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,$Rows:2,$During:{$Left:[0.3,0.7]},$ChessMode:{$Row:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:-0.3,$Rows:2,$SlideOut:true,$ChessMode:{$Row:3},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,y:0.3,$Cols:2,$Rows:2,$During:{$Left:[0.3,0.7],$Top:[0.3,0.7]},$ChessMode:{$Column:3,$Row:12},$Easing:{$Left:$Jease$.$InCubic,$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,x:0.3,y:0.3,$Cols:2,$Rows:2,$During:{$Left:[0.3,0.7],$Top:[0.3,0.7]},$SlideOut:true,$ChessMode:{$Column:3,$Row:12},$Easing:{$Left:$Jease$.$InCubic,$Top:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,$Delay:20,$Clip:3,$Assembly:260,$Easing:{$Clip:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,$Delay:20,$Clip:3,$SlideOut:true,$Assembly:260,$Easing:{$Clip:$Jease$.$OutCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,$Delay:20,$Clip:12,$Assembly:260,$Easing:{$Clip:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},
      {$Duration:800,$Delay:20,$Clip:12,$SlideOut:true,$Assembly:260,$Easing:{$Clip:$Jease$.$OutCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
    ];

    var jssor_1_options = {
      $AutoPlay: 1,
      $SlideshowOptions: {
        $Class: $JssorSlideshowRunner$,
        $Transitions: jssor_1_SlideshowTransitions,
        $TransitionsOrder: 1
      },
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$
      },
      $ThumbnailNavigatorOptions: {
        $Class: $JssorThumbnailNavigator$,
        $SpacingX: 5,
        $SpacingY: 5
      }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    /*#region responsive code begin*/

    var MAX_WIDTH = 980;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

            jssor_1_slider.$ScaleWidth(expectedWidth);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    /*#endregion responsive code end*/
};
