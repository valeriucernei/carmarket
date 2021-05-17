$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')){
        $.get("api/ads/" + urlParams.get('id')).done(function(data){
            $(".js-ad-view").show();
            $("#car-title").html(data.title);
            $("#car-info").html("Created at "+data.date.substring(0, 10)+" | Updated at "+data.updated.substring(0, 10)+" | ID: "+data.id);
            $("#car-brand-model").html(data.brand_name+" "+data.model_name);
            $("#car-price").html(parseInt(data.price).toLocaleString()+'<i class="fa fa-euro"></i>');
            $("#car-price2").html('Price: '+parseInt(data.price).toLocaleString()+'&nbsp;<i class="fa fa-euro"></i>');
            if(data.fabricated > 0) {
                $("#car-attributes-short").append('<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-calendar3">'
                      +  '<path fill-rule="evenodd" d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"></path>'
                      +  '<path fill-rule="evenodd" d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>'
                      +  '</svg>&nbsp;'+data.fabricated+'</li>');
                $("#car-attributes").append('<tr><td>Year of production</td><td>'+data.fabricated+'</td></tr>');
            }
            if(data.km > 0){
                $("#car-attributes-short").append('<li class="list-inline-item"><i class="fas fa-angle-double-up"></i>&nbsp;'+parseInt(data.km).toLocaleString()+' km</li>');
                $("#car-attributes").append('<tr><td>Vehicle mileage</td><td>'+parseInt(data.km).toLocaleString()+' km</td></tr>');
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
                $("#car-attributes-short").append('<li class="list-inline-item"><i class="la la-cogs"></i>&nbsp;'+fuel+'</li>');
                $("#car-attributes").append('<tr><td>Fuel type</td><td>'+fuel+'</td></tr>');
            }
            if(data.gearbox > 0){
                var gearbox;
                switch(parseInt(data.gearbox)){
                    case 1: gearbox = "Manual"; break;
                    case 2: gearbox = "Automatic"; break;
                }
                $("#car-attributes-short").append('<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-manual-gearbox">'
                        + '<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle>'
                        + '<line x1="5" y1="8" x2="5" y2="16"></line><line x1="12" y1="8" x2="12" y2="16"></line><path d="M19 8v2a2 2 0 0 1 -2 2h-12"></path>'
                        + '</svg>&nbsp;'+gearbox+'</li>');
                $("#car-attributes").append('<tr><td>Gearbox</td><td>'+gearbox+'</td></tr>');
            }
            if(data.motor_size > 0){
                $("#car-attributes-short").append('<li class="list-inline-item"><i class="icon ion-speedometer"></i>&nbsp;'+parseInt(data.motor_size).toLocaleString()+' cm<sup>3</sup></li>');
                $("#car-attributes").append('<tr><td>Engine size</td><td>'+parseInt(data.motor_size).toLocaleString()+' cm<sup>3</sup></td></tr>');
            }
            $("#car-description").html(data.description);

            $.get("api/account/" + data.user_id).done(function(user_data){
                $(".car-seller-name").html(user_data.fname+" "+user_data.lname);
                $("#car-seller-info,#car-seller-info-small").html('<li style="color: rgb(145,145,145);">Registered on '+user_data.reg_date.substring(0, 10)+'</li>'
                                                                    +'<li style="color: rgb(145,145,145);">Publications '+123+'</li>'
                                                                    +'<li style="color: rgb(204,0,0);font-size: 22px;">+'+user_data.phone+'</li>');
            }).fail(function(error){

            });
            //window.localStorage.setItem("token", data.token);
        }).fail(function(error){
            $('#confirmedAlertError').show().text( error.responseJSON.message );
        });
    } else {
        $('#confirmedAlertError').show().text("No token found!");
    }
})
