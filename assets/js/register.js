$(document).ready(function() {
});

function doRegister() {
    $('#regalert').hide();
    $('#regpassnotmatch').hide();
    $("#regButton").addClass('disabled');

    if($('#regpass1').val() != $('#regpass2').val()){
       $('#regpassnotmatch').show();
       $("#regButton").removeClass('disabled');
       return 0;
    }

    RestClient.post("api/register/", CMUtils.jsonize_form("#registerForm"), function(data) {
        $('#regConfirmModal').modal('show');
    }, function(error) {
        $("#regalert").show().text( error.responseJSON.message );
        $("#regButton").removeClass('disabled');
    });
}
