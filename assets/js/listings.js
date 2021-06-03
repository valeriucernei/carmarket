$(document).ready(function() {
    updateListings(1);
});

function updateListings(page){
    $("#searchButton").addClass('disabled');
    $('#listings-content').html('<div id="loader" style="text-align: center;"></div>');

    var searchData = CMUtils.jsonize_form("#searchForm");
    CMUtils.freezeSearch();

    searchData.limit = 12;
    searchData.offset = (page-1) * searchData.limit;
    searchData.order = $(".js-sort").val();
    console.log(searchData);

    RestClient.get("api/ads?" + CMUtils.encodeQueryData(searchData), function(data) {
        showCards(data);
        showPagination(searchData, page);

    }, function(error) {
        CMUtils.unfreezeSearch();
        $("#searchButton").removeClass('disabled');
    });

}

function showCards(data){
    $("#searchButton").removeClass('disabled');
    $("#listings-content").html("");

    for(var i = 0; i < data.length; i++){
        $('#listings-content').append(CMUtils.createCard(data[i]));
    }
    CMUtils.unfreezeSearch();
}

function showPagination(searchData, page){
    searchData.limit = 1000; searchData.offset = 0;

    RestClient.get("api/ads?" + CMUtils.encodeQueryData(searchData), function(data){
        var total = data.length;
        pages = Math.ceil(total/12);
        $(".mypagination").html("");

        if(page > 1)
            $(".mypagination").append('<a onclick="updateListings('+(page-1)+')">«</a>');

        for(var i = 1; i <= pages; i++) {

            if(i == page)
                $(".mypagination").append('<a onclick="updateListings('+i+')" class="active">'+i+'</a>');
            else
                $(".mypagination").append('<a onclick="updateListings('+i+')">'+i+'</a>');

        }

        if(page < pages)
            $(".mypagination").append('<a onclick="updateListings('+(page+1)+')">»</a>');
    });
}
