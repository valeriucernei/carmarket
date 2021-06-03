$(document).ready(function() {
    if(CMUtils.isLogged()){
        $("#fname,#lname,#email,#phone,#updpass1,#updpass2").prop("disabled", true).val("");
        getProfileCard();
        getUserProfile();
    }
});

function getUserProfile(){
    RestClient.get("api/user/account", function(data) {
      $("#profileUpdateButton").removeClass('disabled');

      $("#userID").html(data.id+"#");
      $("#userRegDate").html(data.reg_date);
      $("#userStatus").html(data.status);

      $(".form-control").prop("disabled", false);
      CMUtils.insertData("#profileUpdateForm", data);
      $("*[name='pass']").val("");
    });
}

function updateProfile(){
    $("#profileUpdateButton").addClass('disabled');
    $("#savedAlert,#passwordsAlert").addClass('d-none');
    var user_data = CMUtils.jsonize_form("#profileUpdateForm");

    if($('#updpass1').val() != $('#updpass2').val()){
        $('#passwordsAlert').removeClass('d-none').text("Passwords do not match.");
        $("#profileUpdateButton").removeClass('disabled');
        return 0;
    }

    $(".form-control").prop("disabled", true).val("");

    RestClient.put("api/user/account/", user_data, function(data) {
        $("#savedAlert").removeClass('d-none');
        getUserProfile();
    });
}
