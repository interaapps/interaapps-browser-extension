
let loggedIn = false;
let apiKey;
function fakePost(params) {   
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://pastefy.ga/create:paste");
    
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}

function checkApiKey() {
    if (loggedIn) {
        Cajax.get("https://pastefy.ga/dev/console/ls").then(function(res){
            console.log("1");
            $("#keys").html("");
            parsed = JSON.parse(res.responseText);
            var length = Object.keys(parsed).length;
            if (length == 0) {
                console.log("No Existing keys. creating.")
                Cajax.post("https://pastefy.ga/dev/console/newkey").then(checkApiKey).send();
            } else {
                console.log("using existing");
                apiKey = parsed[0].id;
            }
        }).send();
    }
}


$(document).ready(function() {
    $("#submit").click(function() {
        fakePostCode = fakePost.toString().replace(/(\n|\t)/gm,'');
        const params = {
            title: $("#title").val(),
            content: $("#input_contents").val(),
            folder: $("#folderList").val(),
            password: $("#password_input").val()
        };
        console.log("AAA");
        if (typeof browser === "undefined") {
            console.log("Chrome");
            chrome.tabs.create({"url" : "javascript:"+fakePostCode+"; fakePost("+JSON.stringify(params)+");"});
        } else if(loggedIn) {
            console.log("Firefox");
            params.apikey = apiKey;
            Cajax.post("https://pastefy.ga/api/v1/create",params).then((res)=>{
                console.log(res.responseText);
                console.log(params);
                browser.tabs.create({
                    url: "https://pastefy.ga/"+JSON.parse(res.responseText).url
                });
            }).send();
        } else {
            console.log("Error");
        }
    });

    $(".clear").click(function(){
        $("#input_contents").val("");
    });

    $("#optional_paste_options").hide();
    $("#optional_button").click(function(){
        $("#optional_paste_options").show();
    });

    $("#folderLoadingIndicator").html("<br>Loading the folders, please wait... are you logged in? <a target='_blank' href='https://pastefy.ga/pasteList'>Login</a> <br>");
    
    Cajax.post("https://pastefy.ga/get:folder").then((resp)=>{
        console.log(resp.responseText);
        if (resp.responseText != '"null"') {
            responseJson = JSON.parse(resp.responseText);
            $("#folderLoadingIndicator").html("");
            for (obj in responseJson) {
                var option = new Option(responseJson[obj], obj);
                $(option).html(responseJson[obj]);
                $("#folderList").append(option);
                if (window.location.hash=="#"+obj)
                    $("#folderList").val(obj);
            }
            console.log("Logged in");
            loggedIn = true;
            if (typeof browser !== "undefined")
                checkApiKey();
        } else if (typeof browser !== "undefined") {
            $("#firefoxnotloggedininfo").css("display", "block");
            $("#pastefy_container").css("display", "none");
        }
    }).catch(()=>{
        $("#folderLoadingIndicator").html("Couldn't load the folder!");
    }).send();
});
