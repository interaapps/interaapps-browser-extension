const baseDir = "http://accounts.interaapps.de/api/browser/";

$(document).ready(function() {
    $("#prev_name").val("LOADING");
    Cajax.get(baseDir+"getuser").then(function(response){
        const parsed = JSON.parse(response.responseText);
        if (parsed.loggedIn){
            $("#prev_name").text(parsed.username);
            $("#prev_mail").text(parsed.mail);
            $("#prev_pb").attr("src", parsed.pb);
            //chrome.browserAction.setIcon({path: parsed.pb});
            
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(0, 0, 19, 19);
            
            /*
            var img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0);
                chrome.browserAction.setIcon({
                    imageData: imageData
                });
            };
            img.src = parsed.pb;*/
        } else {
            $("#prev_edit").text("Login");
        }
    }).send();
});
