$(document).ready(function() {
    if(CMUtils.isLogged()) {
        getProfileCard();
        getPublications();
    }
});

function getPublications(){
    RestClient.get("api/user/account", function(data) {
        var searchData = {
            'user_id': data.id,
            'offset': 0,
            'limit': 1000,
            'order': "+updated"};

        CMUtils.showPublications(searchData, "#publicationsList");
    });
}
