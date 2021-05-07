$(document).ready(function() {
    updateListings(1);
});

function updateListings(page){
  $("#searchButton").addClass('disabled');
  $("#listings-content,.mypagination").html("");
  $('#listings-content').append('<div id="loader" style="text-align: center;"></div>');
  var searchData = jsonize_form("#searchForm");
  freezeSearch();
  console.log(searchData);
  searchData.limit = 12;
  searchData.offset = (page-1) * searchData.limit;
  searchData.order = $(".js-sort").val();
  $.get("api/ads/", searchData).done(function( data ) {
      $("#searchButton").removeClass('disabled');
      console.log(data);
      $("#listings-content").html("");
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
          var html = '<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3"><a class="card animate-bottom" href="?id='+data[i].id+'#view"><img src="assets/img/listings/'+data[i].photo+'" style="object-fit: cover;">';
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
      unfreezeSearch();

      var total = 0;
      searchData.limit = 1000; searchData.offset = 0;
      $.get("api/ads/", searchData).done(function( data ) {
          total = data.length;
          pages = Math.ceil(total/12);
          $(".mypagination").html("");
          if(page > 1) $(".mypagination").append('<a onclick="updateListings('+(page-1)+')">«</a>');
          for(var i = 1; i <= pages; i++) {
              if(i == page) $(".mypagination").append('<a onclick="updateListings('+i+')" class="active">'+i+'</a>');
              else $(".mypagination").append('<a onclick="updateListings('+i+')">'+i+'</a>');
          }
          if(page < pages) $(".mypagination").append('<a onclick="updateListings('+(page+1)+')">»</a>');
      });
  }).fail(function(error){
      $("#searchButton").removeClass('disabled');
      unfreezeSearch();
      console.log(error);
  });
}
