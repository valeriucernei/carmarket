$(document).ready(function() {
    loadBrands();
    loadRest();
    loadSearchData();
});

function doSearch(){
  $("#searchButton").addClass('disabled');
  $("#listings-content").html("");
  var searchData = jsonize_form("#searchForm");
  searchData.limit = 100;
  searchData.order = $(".js-sort").val();
  console.log(searchData);
  $.get(getUrl() + "/api/ads/", searchData).done(function( data ) {
      $("#searchButton").removeClass('disabled');
      console.log(data);
      for(var i = 0; i < data.length; i++){
          var fuel, gearbox;
          switch(parseInt(data[i].fuel_type)){
              case 1: fuel = "Gasoline"; break;
              case 2: fuel = "Diesel"; break;
              case 3: fuel = "Gas"; break;
              case 4: fuel = "Hybrid"; break;
              case 5: fuel = "Electric"; break;
          }
          switch(parseInt(data[i].gearbox)){
              case 1: gearbox = "Manual"; break;
              case 2: gearbox = "Automatic"; break;
          }
          var html = '<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3"><a class="card" href="#"><img src="'+getUrl()+"/assets/img/listings/"+data[i].photo+'" style="object-fit: cover;">';
          html += '<div class="card-body"><h6>'+data[i].brand_name+' '+data[i].model_name+'&nbsp;</h6><ul class="list-inline atributes">';

          if (parseInt(data[i].fabricated) > 0){
              html += '<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-calendar3">';
              html += '<path fill-rule="evenodd" d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"></path>';
              html += '<path fill-rule="evenodd" d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 ';
              html += '0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>';
              html += '</svg>&nbsp;'+data[i].fabricated+'</li>';
          } if (parseInt(data[i].km) > 0){
              html += '<li class="list-inline-item"><i class="fas fa-angle-double-up"></i>&nbsp;'+parseInt(data[i].km).toLocaleString()+' km</li>';
          } if (parseInt(data[i].fuel_type) > 0){
              html += '<li class="list-inline-item"><i class="la la-cogs"></i>&nbsp;'+fuel+'</li>';
          } if (parseInt(data[i].gearbox) > 0){
              html += '<li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-manual-gearbox">';
              html += '<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="5" cy="6" r="2"></circle><circle cx="12" cy="6" r="2"></circle>';
              html += '<circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="12" cy="18" r="2"></circle>';
              html += '<line x1="5" y1="8" x2="5" y2="16"></line><line x1="12" y1="8" x2="12" y2="16"></line><path d="M19 8v2a2 2 0 0 1 -2 2h-12"></path>';
              html += '</svg>&nbsp;'+gearbox+'</li>';
          } if(parseInt(data[i].motor_size) > 0){
              html += '<li class="list-inline-item"><i class="icon ion-speedometer"></i>&nbsp;'+parseInt(data[i].motor_size).toLocaleString()+' cm<sup>3</sup></li>';
          }
          html += '</ul><p class="price">'+parseInt(data[i].price).toLocaleString()+'&nbsp;<i class="fa fa-euro"></i></p></div></a></div>';
          $('#listings-content').append(html);
      }
  }).fail(function(error){
      $("#searchButton").removeClass('disabled');
      console.log(error);
  });
}

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
                $(".js-model").prop("disabled", true);
                $(".js-model").empty();
                loadModels($(".js-brand").val());
            }).on('select2:clear', function (e) {
                $(".js-model").prop("disabled", true).val(null).trigger("change");
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
          }).val(null).trigger("change").prop("disabled", false);
      }
  });

}

function loadRest(){
  var notags = [
      {name: ".js-brand", placeholder: "BMW, Audi, Mercedes..."},
      {name: ".js-model", placeholder: "Golf, S-Class, A8, X5..."},
      {name: ".js-gear", placeholder: "Manual, Automatic, Semi.."},
      {name: ".js-fuel", placeholder: "Gas, Diesel, Gasoline..."}];
  var tags = [
      {name: ".js-year-min", placeholder: "Min"},
      {name: ".js-year-max", placeholder: "Max"},
      {name: ".js-km-min", placeholder: "Min"},
      {name: ".js-km-max", placeholder: "Max"},
      {name: ".js-motor-min", placeholder: "Min"},
      {name: ".js-motor-max", placeholder: "Max"},
      {name: ".js-price-min", placeholder: "Min"},
      {name: ".js-price-max", placeholder: "Max"}];

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
      });
  }

  for(var i = 0; i < tags.length; i++){
      $(tags[i].name).select2({
          placeholder: tags[i].placeholder,
          theme:"bootstrap-5",
          width: '100%',
          allowClear: true,
          tags: true
      });
  }

  $('.js-sort').select2({
      placeholder: "",
      theme:"bootstrap-5",
      width: '140px',
      tags: true,
      minimumResultsForSearch: Infinity
  }).on('select2:select', function (e) {
      doSearch();
  });
}

function loadSearchData(){
    var d = new Date();
    for (var i = d.getFullYear(); i >= 1990; i--) {
        $('#year-min,#year-max').append(`<option value="${i}">${i}</option>`);
    }

    for (var i = 500; i <= 3000; i += 250){
        $('#motor-min,#motor-max').append(`<option value="${i}">${i} cm&sup3;</option>`);
    }
}

$(document).on('keypress', '.select2-search__field', function () {
    $(this).val($(this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
});

$(".js-select2-settings").on("select2:unselecting", function(e) {
    $(this).data('state', 'unselected');
}).on("select2:open", function(e) {
    if ($(this).data('state') === 'unselected') {
        $(this).removeData('state');
        var self = $(this);
        setTimeout(function() {
            self.select2('close');
        }, 1);
    }
})
