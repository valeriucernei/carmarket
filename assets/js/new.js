$(document).ready(function() {
    if(CMUtils.isLogged()) {
        CMUtils.loadBrands();
        loadRest();
        $("#newad-description").keyup(function() {
            $("#newad-count").text($(this).val().length + " / 1000");
        });
    }
});

function addNewListing() {
    var carInfo = CMUtils.jsonize_form("#newListingForm");
    console.log(carInfo);

    $(".form-select,.form-control,#newAdButton").prop("disabled", true);

    RestClient.post("api/user/ads/add/", carInfo, function(data) {
        uploadImages(data.id);
    }, function(error) {
        $(".form-select,.form-control").prop("disabled", false);
    });
}

function loadRest(){
    var notags = [
        {name: ".js-body", placeholder: "Sedan, Combi, Coupe..."},
        {name: ".js-brand", placeholder: "BMW, Audi, Mercedes..."},
        {name: ".js-model", placeholder: "Golf, S-Class, A8, X5..."},
        {name: ".js-gear", placeholder: "Manual, Automatic, Semi.."},
        {name: ".js-fuel", placeholder: "Gas, Diesel, Gasoline..."}];

    for(var i = 0; i < notags.length; i++){
        $(notags[i].name).select2({
            placeholder: notags[i].placeholder,
            theme:"bootstrap-5",
            width: '100%',
            allowClear: true,
            minimumResultsForSearch: Infinity,
            language: {
                noResults: function () {
                     return "Loading...";
                }
            }

        }).on('select2:clear', function (e) {
            $(".js-model").prop("disabled", true).val(null).trigger("change");

        }).on("select2:open", function(e) {
            if ($(this).data('state') === 'unselected') {
                $(this).removeData('state');
                var self = $(this);
                setTimeout(function() {
                    self.select2('close');
                }, 1);
            }
        });
    }
}
