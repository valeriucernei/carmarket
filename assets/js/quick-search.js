$(document).ready(function() {
    loadBrands();
    
    $(".js-brand").select2({
        placeholder: "BMW, Audi, Mercedes...",
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


    $('.js-model').select2({
        placeholder: "Golf, S-Class, A8, X5...",
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

    $('.js-year-min').select2({
        placeholder: "Min",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-year-max').select2({
        placeholder: "Max",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-km-min').select2({
        placeholder: "Min",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-km-max').select2({
        placeholder: "Max",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-motor-min').select2({
        placeholder: "Min",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-motor-max').select2({
        placeholder: "Max",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-gear').select2({
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

    $('.js-fuel').select2({
        placeholder: "Diesel, Gas, Hybrid..",
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

    $('.js-price-min').select2({
        placeholder: "Min",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-price-max').select2({
        placeholder: "Max",
        theme:"bootstrap-5",
        width: '100%',
        allowClear: true,
        tags: true
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

    $('.js-sort').select2({
        placeholder: "Max",
        theme:"bootstrap-5",
        width: '140px',
        tags: true,
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


    var d = new Date();
    for (var i = d.getFullYear(); i >= 1990; i--) {
        $('#year-min').append(`<option value="${i}">${i}</option>`);
        $('#year-max').append(`<option value="${i}">${i}</option>`);
    }

    for (var i = 500; i <= 3000; i += 250){
        $('#motor-min').append(`<option value="${i}">${i} cm&sup3;</option>`);
        $('#motor-max').append(`<option value="${i}">${i} cm&sup3;</option>`);
    }

});

function loadBrands() {
    $.ajax({
        url: getUrl() + "/api/cars/brands",
        type: "GET",
        success: function(data, textStatus, jqXHR){
            var xdata = $.map(data, function (obj) {
                obj.text = obj.text || obj.name;
                return obj;
            });
            $(".js-brand").select2({
                placeholder: "BMW, Audi, Mercedes...",
                theme:"bootstrap-5",
                width: '100%',
                allowClear: true,
                minimumResultsForSearch: Infinity,
                data:xdata,
            }).on('select2:select', function (e) {
                $(".js-model").prop("disabled", false);
                $(".js-model").empty();
                loadModels($(".js-brand").val());
            }).on('select2:clear', function (e) {
                $(".js-model").prop("disabled", true).val(null).trigger("change");
            });
        }
    });

}

function loadModels(id) {
  $.ajax({
      url: getUrl() + "/api/cars/models/"+ id,
      type: "GET",
      success: function(data, textStatus, jqXHR){
          var xdata = $.map(data, function (obj) {
              obj.text = obj.text || obj.name;
              return obj;
          });
          $(".js-model").select2({
              placeholder: "Golf, S-Class, A8, X5...",
              theme:"bootstrap-5",
              width: '100%',
              allowClear: true,
              minimumResultsForSearch: Infinity,
              data:xdata
          }).val(null).trigger("change");
      }
  });

}

$(document).on('keypress', '.select2-search__field', function () {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
});
