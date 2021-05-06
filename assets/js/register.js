$(document).ready(function() {
    $('#regalert').hide();
    $('#regpassnotmatch').hide();
});

function doRegister() {
    $('#regalert').hide();
    $('#regpassnotmatch').hide();
    $("#regButton").addClass('disabled');

    $.post("api/register/", jsonize_form("#registerForm")).done(function( data ) {
        $('#regConfirmModal').modal('show');
    }).fail(function(error){
        $("#regalert").show().text( error.responseJSON.message );
        $("#regButton").removeClass('disabled');
    });
}
