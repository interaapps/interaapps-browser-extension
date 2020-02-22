const baseDir = "http://accounts.interaapps.de/api/browser/";

$(document).ready(function() {
    $("#prev_name").val("LOADING");
    Cajax.get(baseDir+"getuser").then(function(response){
        const parsed = JSON.parse(response.responseText);
        if (parsed.loggedIn){
            $("#prev_name").text(parsed.username);
            $("#prev_mail").text(parsed.mail);
            $("#prev_pb").attr("src", parsed.pb);

        } else {
            $("#prev_edit").text("Login");
        }
    }).send();
});
