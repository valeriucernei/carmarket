$(document).ready(function() {
    if(!localStorage.getItem("token")) location.replace("#main");
    else {
        $("#fname,#lname,#email,#phone,#password,#passwordconfirm").prop("disabled", true).val("");
        $("#savedAlert").addClass('d-none');
        $("#profileUpdateButton").addClass('disabled');
        getUserProfile();
    }
});

function getUserProfile(){
    $.ajax({
        url: "api/user/account",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
        success: function(data) {
            console.log(data);
            $("#fname").prop("disabled", false).val(data.fname);
            $("#lname").prop("disabled", false).val(data.lname);
            $("#email").prop("disabled", false).val(data.email);
            $("#phone").prop("disabled", false).val(data.phone);
            $("#profileUpdateButton").removeClass('disabled');
            $("#password,#passwordconfirm").prop("disabled",false);
            $("#userID").html(data.id+"#");
            $("#userRegDate").html(data.reg_date);
            $("#userStatus").html(data.status);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function updateProfile(){
    var user_data = jsonize_form("#profileUpdateForm");
    console.log(user_data);
    $("#fname,#lname,#email,#phone,#password,#passwordconfirm").prop("disabled", true).val("");
    $("#profileUpdateButton").addClass('disabled');
    $("#savedAlert").addClass('d-none');
    $.ajax({
        url: "api/user/account/",
        type: "PUT",
        data: user_data,
        beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
        success: function(data) {
            $("#savedAlert").removeClass('d-none');
            console.log(data);
            getUserProfile();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}
