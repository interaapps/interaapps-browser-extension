

    function copyStringToClipboard (str) {
       // Create new element
       var el = document.createElement('textarea');
       // Set value (string to be copied)
       el.value = str;
       // Set non-editable to avoid focus and move outside of view
       el.setAttribute('readonly', '');
       el.style = {position: 'absolute', left: '-9999px'};
       document.body.appendChild(el);
       // Select text inside element
       el.select();
       // Copy text to clipboard
       document.execCommand('copy');
	   document.body.removeChild(el);
    }




function loadJSON(path, success, error)
{
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function()
{
if (xhr.readyState === XMLHttpRequest.DONE) {
if (xhr.status === 200) {
if (success)
success(JSON.parse(xhr.responseText));
} else {
if (error)
error(xhr);
}
}
};

xhr.open("GET", path, true);
xhr.send();
}


var currentURL;


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	currentURL  = tabs[0].url;
	document.getElementById("addeninput").value = tabs[0].url;
});

var shortet = "";

var error = "";


function sadf() {
	
	
	
	
	
	var obj;

loadJSON('https://www.punyshort.ga/api/jsonapi.php?shortlink='+document.getElementById("addeninput").value,
function(data) {
obj = data;

document.getElementById("getlink1").innerHTML = "pnsh.ga/" + obj['url'];
document.getElementById('getlink').style.display = 'block';
document.getElementById('copytoclip').style.display = 'inline;';
shortet = obj['url'];
error = obj['error'];


if (error != "none") {
	document.getElementById('copytoclip').style.display = 'none';
	if (error == "err") {
		document.getElementById("getlink1").innerHTML = "Internal error! Try it again!";
	}else if (error == "HttpOrHttpsMissing") {
		document.getElementById("getlink1").innerHTML = "Add Https:// or Http:// to the link!";
	}else if (error == "Unset") {
		document.getElementById("getlink1").innerHTML = "Give me a valid link!";
	}
}




},
function(xhr) {  },

);
	
}



$(function(){

	$("#addensubmit").click(function(){
		sadf();
	});
	
	$("#copytoclip").click(function(){
		copyStringToClipboard("https://pnsh.ga/"+shortet);
	});



});