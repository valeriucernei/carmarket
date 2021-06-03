class CMUtils{
    static get CDN_path(){
        return "https://cdn.car-market.live.fra1.cdn.digitaloceanspaces.com/";
    }

    static getUrl() {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        if(baseUrl.slice(-1) == "/") baseUrl = baseUrl.slice(0, -1);
        return baseUrl;
    }

    static jsonize_form(selector){
        var data = $(selector).serializeArray();
        var form_data = {};
        for( var i = 0; i < data.length; i++){
            form_data[data[i].name] = data[i].value;
        }
        return form_data;
    }

    static insertData(selector, data){
        var selectorData = $(selector).serializeArray();

        for(var i = 0; i < selectorData.length; i++){
             var selectorNameData = selectorData[i].name;
             $('*[name="'+selectorNameData+'"]').val(data[selectorNameData]);
        }
    }

    static createCard(data){
        var fuel, gearbox;

        switch(parseInt(data.fuel_type)){
            case 1: fuel = "Gasoline"; break;
            case 2: fuel = "Diesel"; break;
            case 3: fuel = "Gas"; break;
            case 4: fuel = "Hybrid"; break;
            case 5: fuel = "Electric"; break;
        }

        switch(parseInt(data.gearbox)){
            case 1: gearbox = "Manual"; break;
            case 2: gearbox = "Automatic"; break;
        }

        var html = '<div class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">'
                 +'<a class="card animate-bottom" href="?id=' + data.id
                 + '#view"><img src="' + CMUtils.CDN_path + data.photo
                 + '" style="object-fit: cover; height: 180px;">'
                 + '<div class="card-body"><h6>' + data.brand_name + ' '
                 + data.model_name + '&nbsp;</h6><ul class="list-inline atributes">';

        if (parseInt(data.fabricated) > 0){
            html += '<li class="list-inline-item"><i class="far fa-calendar-alt">'
                  + '</i>&nbsp;'+data.fabricated+'</li>';
        }

        if (parseInt(data.km) > 0){
            html += '<li class="list-inline-item"><i class="fas fa-angle-double-up">'
                  + '</i>&nbsp;' + parseInt(data.km).toLocaleString() + ' km</li>';
        }

        if (parseInt(data.fuel_type) > 0){
            html += '<li class="list-inline-item"><i class="la la-cogs"></i>&nbsp;'
                  + fuel + '</li>';
        }

        if (parseInt(data.gearbox) > 0){
            html += '<li class="list-inline-item"><i class="fas fa-life-ring"></i>';
                  + '&nbsp;' + gearbox + '</li>';
        }

        if(parseInt(data.motor_size) > 0){
            html += '<li class="list-inline-item"><i class="icon ion-speedometer"></i>&nbsp;'
                  + parseInt(data.motor_size).toLocaleString() + ' cm<sup>3</sup></li>';
        }

        html += '</ul><p class="price">' + parseInt(data.price).toLocaleString()
              + '&nbsp;<i class="fa fa-euro"></i></p></div></a></div>';

        return html;
    }

    static freezeSearch(){
        $(".js-brand,.js-model,.js-year-min,.js-year-max,.js-km-min,.js-km-max,"
          + ".js-motor-min,.js-motor-max,.js-gear,.js-fuel,.js-price-min,.js-price-max").prop("disabled", true);
    }

    static unfreezeSearch(){
        $(".js-brand,.js-year-min,.js-year-max,.js-km-min,.js-km-max,.js-motor-min"
          + ",.js-motor-max,.js-gear,.js-fuel,.js-price-min,.js-price-max").prop("disabled", false);

        if($(".js-brand").val() > 0)
            $(".js-model").prop("disabled", false);
    }

    static showPublications(searchData, selector){
        RestClient.get("api/ads?" + CMUtils.encodeQueryData(searchData),
        function(data){
            $(selector).html("");

            for(var i = 0; i < data.length; i++){
                $(selector).append(CMUtils.createCard(data[i]));
            }
        });
    }

    static goToProfile(id){
        window.history.replaceState(null, null, "?id="+id);
        location.replace("#viewprofile");
    }

    static isLogged(){
        if(!localStorage.getItem("token")){
            location.replace("#main");
            $("#loginModal").modal("show");
            return false;
        }
        return true;
    }

    static encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    static loadBrands() {
        RestClient.get("api/cars/brands", function(data) {
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
                $(".js-model").prop("disabled", true).empty();
                CMUtils.loadModels($(".js-brand").val());

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
        });
    }

    static loadModels(id, model) {
        RestClient.get("api/cars/models/" + id, function(data) {
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

            }).val(model).trigger("change").prop("disabled", false);
        });
    }
}
