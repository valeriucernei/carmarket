function getProfileCard(){
    RestClient.get("api/user/account", function(data) {
        $(".profileFLname").html(data.fname+" "+data.lname);
        if(parseInt(data.admin) > 0) $(".admin").html("Admin Lvl. "+data.admin).removeClass("d-none");
    });
}
