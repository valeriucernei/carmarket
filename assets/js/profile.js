/*
$(document).ready(function() {
    getUserProfile();
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
            alert("HUIOVA");
         }
    });
}

function updateProfile(){
    $.ajax({
         url: "api/user/account",
         type: "PUT",
         beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
         success: function(data) {


         },
         error: function(error) {
            console.log(error);
         }
      });
}
*/
