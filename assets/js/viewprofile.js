$(function() {
    var urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('id')){
        $.get("api/account/" + urlParams.get('id')).done(function(user_data){
            var usernameStatus = user_data.fname+" "+user_data.lname+" ";
            if(parseInt(user_data.admin) > 0){
                usernameStatus += '<sup class="text-success user-status">Admin</sup>';
                $('.user-button-admin').show();
            }
            else if(user_data.status == 'BLOCKED')
                usernameStatus += '<sup class="text-danger user-status">Blocked</sup>';
            else if(user_data.status == 'PENDING')
                usernameStatus += '<sup class="text-warning user-status">Pending</sup>';
            else if(user_data.status == 'ACTIVE')
                usernameStatus += '<sup class="text-success user-status">Active</sup>';

            $('.user-name').html(usernameStatus);
            $('.user-info').html('ID: '+urlParams.get('id')+' | Registered '+user_data.reg_date.substring(0, 10));
            $('.user-phone').html('Phone: +'+user_data.phone);
            $('.user-email').html('Email: '+user_data.email);

            var searchData = {};
            searchData['user_id'] = urlParams.get('id');
            searchData['offset'] = 0;
            searchData['limit'] = 1000;
            searchData['order'] = "+updated";

            showPublications(searchData, "#userPublicationsList");
        });
    } else {
        location.replace("#main");
    }
});
