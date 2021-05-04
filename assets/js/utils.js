function getUrl() {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    if(baseUrl.slice(-1) == "/") baseUrl = baseUrl.slice(0, -1);
    return baseUrl;
}

function jsonize_form(selector){
    var data = $(selector).serializeArray();
    var form_data = {};
    for( var i = 0; i < data.length; i++){
        form_data[data[i].name] = data[i].value;
    }
    return form_data;
}
