$(document).ready(function() {
    if(CMUtils.isLogged()) {
        loadEditForm();
        $("#editad-description").keyup(function(){
            $("#newad-count").text($(this).val().length + " / 1000");
        });
    }
});

function loadEditForm(){
    var urlParams = new URLSearchParams(window.location.search);

    if(!urlParams.has('id')){
        $('#confirmedAlertError').show().text("No token found!");
        return 0;
    }

    RestClient.get("api/ads/" + urlParams.get('id'), function(data){
        CMUtils.insertData("#editListingForm", data);
        loadModels(data.brand, data.model);
        $('.js-change').trigger('change');
    }, function(error) {
        $('#confirmedAlertError').show().text(error.responseJSON.message);
    });
}

function updateListing(){
    var urlParams = new URLSearchParams(window.location.search);
    var updated_data = CMUtils.jsonize_form("#editListingForm");

    $(".form-select,.form-control,#newEditButton").prop("disabled", true);

    RestClient.put("api/user/ads/" + urlParams.get('id'), updated_data, function(data){
        $(".form-select,.form-control,#newEditButton").prop("disabled", false);
        location.replace("?id=" + urlParams.get('id') +"#view");
    });
}
