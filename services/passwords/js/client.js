Cajax.get("https://passwords.interaapps.de/user/loggedIn").then(function(res){
    if (res.responseText == "false") {
        $("#add_button").text("Login").attr("href", "https://passwords.interaapps.de").click(function(e){
            e.preventDefault();
            chrome.tabs.create({
                url: "https://passwords.interaapps.de"
            });
        });
    }
}).send();