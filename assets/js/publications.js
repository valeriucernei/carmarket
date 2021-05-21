$(document).ready(function() {
    if(!localStorage.getItem("token")) location.replace("#main");
    else {
        getProfileCard();
        getPublications();
    }
});

function getPublications(){
    var searchData = {};
    $.ajax({
        url: "api/user/account",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authentication', localStorage.getItem("token"));},
        success: function(data){
            searchData['user_id'] = data.id;
            searchData['offset'] = 0;
            searchData['limit'] = 1000;
            searchData['order'] = "+updated";
            showPublications(searchData, "#publicationsList");
        },
        error: function(error){ console.log(error); }
    });
}
