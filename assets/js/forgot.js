$(document).ready(function() {
    $('#forgotSuccess').hide();
    $('#forgotAlert').hide();
});


function doForgot(){
    $("#resetButton").addClass('disabled');
    $('#forgotSuccess').hide();
    $('#forgotAlert').hide();

    var forgot_info = {
        "email" : $("#forgotinput").val()
    };

    RestClient.post("api/forgot/", forgot_info, function(data){
        $('#forgotSuccess').show();
        $("#resetButton").removeClass('disabled');
    }, function(error){
        $("#forgotAlert").show().text( error.responseJSON.message );
        $("#resetButton").removeClass('disabled');
    });
}
