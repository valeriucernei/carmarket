$(document).ready(function() {
    $('#regalert').hide();
    $('#regpassnotmatch').hide();
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


    var register_info = {
        "username" : $("#regusername").val(),
        "fname" : $("#regfname").val(),
        "pass" : $('#regpass1').val(),
        "email" : $("#regemail").val(),
        "phone" : $("#regphone").val()
    };
    if($("#reglname").val() != "") register_info["lname"] = $("#reglname").val();

    $.post(getUrl() + "/api/register/", register_info).done(function( data ) {
        $('#regConfirmModal').modal('show');
    }).fail(function(error){
        $("#regalert").show().text( error.responseJSON.message );
        $("#regButton").removeClass('disabled');
    });
}
