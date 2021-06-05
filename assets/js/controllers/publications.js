class Publications {

    static init() {
        if(CMUtils.isLogged()) {
            Profile.show_card();
            Publications.show();
        }
    }

    static show() {
        var urlParams = new URLSearchParams(window.location.search);
        var searchData = {
            'user_id': urlParams.get('id'),
            'offset': 0,
            'limit': 1000,
            'order': "+updated"};

        Listings.show_publications(searchData, "#publicationsList");
    }

}
