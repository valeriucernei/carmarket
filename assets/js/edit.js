$(document).ready(function() {
    if(!localStorage.getItem("token")) {
        location.replace("#main");
        $("#loginModal").modal("show");
    }
    else {
        loadEditForm();
    }
});

function loadEditForm(){
    $("#new-header").html('<div class="col-xxl-12" id="new-header"><h4 style="text-align: center;">Edit your offer</h4>'
                        + '<p style="text-align: center;">Below you have all current offer information. Edit it and press save.</p></div>');
    $("#newEditButton").html("HUY");
    $("#newListingForm").attr("onsubmit","updateListing(); return false;");

    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')){
        $.get("api/ads/" + urlParams.get('id')).done(function(data){
            console.log(data);
            insertData("#newListingForm",data);
            $('#newad-car-body').val(data.car_body).trigger('change');
            $('#newad-brand').val(data.brand).trigger('change');
            loadModels(data.brand, data.model);
            $('#newad-model').prop("disabled", false).val(data.model).trigger('change');
            $('#newad-gearbox').val(data.car_body).trigger('change');
            $('#newad-fuel').val(data.car_body).trigger('change');
        }).fail(function(error){
            $('#confirmedAlertError').show().text( error.responseJSON.message );
        });
    } else {
        $('#confirmedAlertError').show().text("No token found!");
    }
}
