const baseURL = "https://punyshort.ga";

$(document).ready(function(){
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		$("#shortlinkinput").val(tabs[0].url);
	});
});


var link = {};



function showError(error) {
	$("#shortlinkerroralert").text(error);
	
	$("#shortlinkerroralert").css({
		display: "block",
		opacity: "0"
	});
	setTimeout(() => {
		$("#shortlinkerroralert").animate({
			height: "",
			opacity: 1
		}, 500);
	}, 500);
}

function hideError() {
	$("#shortlinkerroralert").animate({
		height: "0px",
		opacity: "0"
	}, 500);
	setTimeout(() => {
		$("#shortlinkerroralert").css("display", "none");
	}, 500);
}

$(document).ready(function(){
	$("#outputlink").hide();
	scrollPageYOffsetMin = 100;
	
	window.onscroll = function() {
		checkScroll();

		if (window.pageYOffset > 283 && window.innerWidth > 720) {
			$(".homepageimage").css("marginTop", "43px");
			$("#shortlinkdiv").css({
				position: "fixed",
				top: "3.3px",
				left: "50%",
				"width": "calc(100% - 500px)",
				transform: "translateX(-50%)",
				boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.5)",
				zIndex: "10001"
			});
		} else {
			$(".homepageimage").css("marginTop", "");
			$("#shortlinkdiv").css({
				position: "",
				top: "",
				left: "",
				"width": "",
				transform: "",
				boxShadow: "",
				zIndex: "10001"
			});
		}

		if (window.pageYOffset > scrollPageYOffsetMin) {
			$("#logo img").attr("src", "/assets/images/icons/icon.svg");
		} else {
			$("#logo img").attr("src", "/assets/images/icons/light-icon.svg");
		}
	};
	
	$("#shortlinksubmit").click(function() {
		if ($("#shortlinkinput").val() != "") {
			Cajax.post(baseURL+"/api/v2/short", {
				link: $("#shortlinkinput").val(),
				domain: $("#shortlinkdomain").val()
			}).then((resp)=>{
				link = JSON.parse(resp.responseText);
				$("#outputlink").hide();
				console.log(link.error);
				if (link.error == 0) {
					hideError();
					$("#outputlink").show();
					$("#outputlinkinput").val(link.full_link);
				} else if (link.error == 1)
					showError("Invalid Link");
				else if (link.error == 2)
					showError("Please input something");
				else
					showError("Internal error");
				if (window.pageYOffset > 283) {
					scrollUpAnimation();
				}
			}).send();
		} else
			showError("Please input something");
	});

	$("#outputlinkcopy").click(function() {
		$("#outputlinkinput").elem[0].select();
		document.execCommand("copy");
	});

	$("#outputlinkstats").click(function() {
		window.open(link.full_link+"/info");
	});
});