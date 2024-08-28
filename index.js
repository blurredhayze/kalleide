pastIntro = false;
showingDialog = false;

isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

function MirrorType(entry) {
	if (!isMobile) {
		entry = youTyping.value;
	}

	typed.innerHTML = entry;
	youTyping.focus();
	youTyping.focus();

	if (!pastIntro && typed.innerHTML.length > 0) {
		tutorial.style.display = "none";
	}
}

function AddLineBreak() {
	var linebreak = document.createElement("p");
	commandWindow.appendChild(linebreak);
}

function LogIn(name) {
	AddLineBreak();

	var response = document.createElement("h3");
	response.innerHTML = "Welcome" + name + ".";
	commandWindow.appendChild(response);
	NewCommand();

	$("#mainContent").fadeIn("slow");
	$("#logo").addClass("accessed");

	// Set the URL hash to #mainContent
    window.location.hash = "#mainContent";

	pastIntro = true;

	if (isMobile) {
		$("#mainContent").click(function() {
			ResetPage();
		});
	}
}

function NewCommand() {
	AddLineBreak();

	var newtyped = document.createElement("span");
	newtyped.classname = "command";
	commandWindow.appendChild(newtyped);

	commandWindow.appendChild(fakeCursor);
	typed = newtyped;
	youTyping.value = "";
}

function EnterCommand() {

	if (!pastIntro) {
		LogIn(", " + youTyping.value);
	} else {
		NewCommand();
	}
}

function mobileEvents() {
	$("#login").hide();

	var person = prompt("New site, who dis?", "");

	if (person != null) {
		MirrorType(person);
    	LogIn(person);
	}
}

function desktopEvents() {
	youTyping = document.getElementById("youTyping");
	youTyping.oninput = MirrorType;
	youTyping.onpropertychange = youTyping.oninput;
	MirrorType();

	$("#login").submit(function(){ return false; });

	$("#youTyping").keyup(function(event){
    	if(event.keyCode == 13){
        	EnterCommand();
    	}
	});
}

$(document).ready(function() {
	fakeCursor = document.getElementById("fakeCursor");
	commandWindow = document.getElementById("commandWindow");
	typed = document.getElementById("typed");
	tutorial = document.getElementById("tutorial");

	if (window.location.hash === "#mainContent") {
		LogIn(" back");
	}
	

	$("body").css("min-height", $(document).height());

	$("#reveal_tour").click(function(e) {
		e.stopPropagation(); 
		showSubcontent($(this)); 
	});

	$(".subcontent").click(function(e) {
    	e.stopPropagation(); // This is the preferred method.
    	//return false;        // This should not be used unless you do not want
                         // any click events registering inside the div
	});

	if (isMobile) {
		mobileEvents();
	} else {
		desktopEvents();
	}


});
