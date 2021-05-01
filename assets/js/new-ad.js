$(document).ready(function() {

    $("#newad-description").keyup(function(){
        $("#newad-count").text($(this).val().length + " / 1000");
    });
    
    $('.js-add-car-body').select2({
        placeholder: "Sedan, Combi, Suv...",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        minimumResultsForSearch: Infinity
    }).on("select2:unselecting", function(e) {
        $(this).data('state', 'unselected');
    }).on("select2:open", function(e) {
        if ($(this).data('state') === 'unselected') {
            $(this).removeData('state'); 
            var self = $(this);
            setTimeout(function() {
                self.select2('close');
            }, 1);
        }    
    });
    
    $('.js-add-brand').select2({
        placeholder: "BMW, Audi, Volkswagen...",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        minimumResultsForSearch: Infinity
    }).on("select2:unselecting", function(e) {
        $(this).data('state', 'unselected');
    }).on("select2:open", function(e) {
        if ($(this).data('state') === 'unselected') {
            $(this).removeData('state'); 
            var self = $(this);
            setTimeout(function() {
                self.select2('close');
            }, 1);
        }    
    });

    $('.js-add-model').select2({
        placeholder: "X5, A8, Golf 4...",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        minimumResultsForSearch: Infinity
    }).on("select2:unselecting", function(e) {
        $(this).data('state', 'unselected');
    }).on("select2:open", function(e) {
        if ($(this).data('state') === 'unselected') {
            $(this).removeData('state'); 
            var self = $(this);
            setTimeout(function() {
                self.select2('close');
            }, 1);
        }    
    });
    
    $('.js-add-gearbox').select2({
        placeholder: "Manual, Automatic...",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        minimumResultsForSearch: Infinity
    }).on("select2:unselecting", function(e) {
        $(this).data('state', 'unselected');
    }).on("select2:open", function(e) {
        if ($(this).data('state') === 'unselected') {
            $(this).removeData('state'); 
            var self = $(this);
            setTimeout(function() {
                self.select2('close');
            }, 1);
        }    
    });

    $('.js-add-fuel').select2({
        placeholder: "Diesel, Gas, Electric...",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        minimumResultsForSearch: Infinity
    }).on("select2:unselecting", function(e) {
        $(this).data('state', 'unselected');
    }).on("select2:open", function(e) {
        if ($(this).data('state') === 'unselected') {
            $(this).removeData('state'); 
            var self = $(this);
            setTimeout(function() {
                self.select2('close');
            }, 1);
        }    
    });

});