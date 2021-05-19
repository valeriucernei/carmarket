$(document).ready(function() {
    document.getElementById('pro-image').addEventListener('change', readImage, false);

    $( ".preview-images-zone" ).sortable();

    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
        $("#imagesAlert").hide();
        var selectedNum = $("div[class^='pro-img']").prevObject[0].images.length
        $('#imagesInputNumber').val("Selected: " + selectedNum);
        if(parseInt(selectedNum) == 0){
            $("#imagesInputNumber").removeClass('border-bottom-0');
            $(".preview-images-zone").hide();
            $("#imagesInputNumber,#ImagesInputLabel").addClass('rounded-bottom');
        }
    });
});


function readImage() {
    var num=0;
    $("#imagesAlert").hide();
    $(".preview-images-zone").show();
    $("#imagesInputNumber").addClass('border-bottom-0');
    $("#imagesInputNumber,#ImagesInputLabel").removeClass('rounded-bottom');
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files;
        var output = $(".preview-images-zone");
        var filesQuantity = files.length;
        if(filesQuantity > 10){
            filesQuantity = 10;
            $("#imagesAlert").show();
        }
        $('#imagesInputNumber').val("Selected: " + filesQuantity);
        for (let i = 0; i < filesQuantity; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;
            var picReader = new FileReader();
            picReader.addEventListener('load', function (event) {
                var picFile = event.target;
                var html =  '<div class="preview-image preview-show-' + num + '">' +
                            '<div class="image-cancel" data-no="' + num + '">x</div>' +
                            '<div class="image-zone"><img id="pro-img" src="' + picFile.result + '"></div></div>';
                output.append(html);
                num += 1;
            });
            picReader.readAsDataURL(file);
        }
        $("#pro-image").val('');
    } else {
        console.log('Browser not support');
    }
}

function test(){
    var files = $("div[class^='pro-img']").prevObject[0].images;
    if(files.length == 0) return 0;
    console.log(files);
    for(var i = 0; i < files.length; i++){
        var upload = {
            id: 162,
            content: files[i].currentSrc.split(',')[1]
        };

        $.ajax({
            url: "api/user/photos/add",
            type: "POST",
            data: JSON.stringify(upload),
            contentType: "application/json",
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authentication', localStorage.getItem("token"));
            },
            success: function (data) {
                $('#upload-images').append('<img id="upload-img" src="'+ data.url
                                        + '" alt="wait for upload" style="width:100px;'
                                        + 'height:75px; object-fit: cover; background-color: #757575">');
                if(i == files.length-1) alert("All loaded!");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    }
}
