$(document).ready(function() {
    if(isLogged()) {
        loadEditForm();
        $("#editad-description").keyup(function(){
            $("#newad-count").text($(this).val().length + " / 1000");
        });
    }
});

function loadEditForm(){
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('id')){
        $.get("api/ads/" + urlParams.get('id')).done(function(data){
            console.log(data);
            insertData("#editListingForm",data);
            $('#newad-car-body').val(data.car_body).trigger('change');
            $('#newad-brand').val(data.brand).trigger('change');
            $('#editad-description').val(data.description);
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

function updateListing(){
    var urlParams = new URLSearchParams(window.location.search);
    var updated_data = jsonize_form("#editListingForm");
    console.log(updated_data);

    $(".form-select,.form-control,#newEditButton").prop("disabled", true);
    $.ajax({
        url: "api/user/ads/" + urlParams.get('id'),
        type: "PUT",
        data: JSON.stringify(updated_data),
        contentType: "application/json",
        beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
        success: function(data) {
            console.log("Ad updated.");
            $(".form-select,.form-control,#newEditButton").prop("disabled", false);
            location.replace("?id=" + urlParams.get('id') +"#view");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}
