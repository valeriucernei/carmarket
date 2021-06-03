$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')){
        $.get("api/account/" + urlParams.get('id')).done(function(user_data){

        });

        RestClient.get("api/account/" + urlParams.get('id'), function(data) {

            $('.user-name').append(user_data.fname + " " + user_data.lname + " ");

            if(parseInt(user_data.admin) > 0){
                $(".user-status").html("Admin").addClass("text-success");
                $('.user-button-admin').show();
            }

            else if(user_data.status == 'BLOCKED')
                $(".user-status").html("Blocked").addClass("text-danger");

            else if(user_data.status == 'PENDING')
                $(".user-status").html("Pending").addClass("text-warning");

            else if(user_data.status == 'ACTIVE')
                $(".user-status").html("Active").addClass("text-success");

            $('.user-name').html(usernameStatus);

            $('.user-info').html('ID: ' + urlParams.get('id') + ' | Registered '
                                + user_data.reg_date.substring(0, 10));

            $('.user-phone').html('Phone: +' + user_data.phone);

            $('.user-email').html('Email: ' + user_data.email);

            var searchData = {
                'user_id': urlParams.get('id'),
                'offset': 0,
                'limit': 1000,
                'order': "+updated" };

            CMUtils.showPublications(searchData, "#userPublicationsList");
        });
    } else {
        location.replace("#main");
    }
});
