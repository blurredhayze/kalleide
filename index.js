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
	response.innerHTML = "Welcome, " + name + ".";
	commandWindow.appendChild(response);
	NewCommand();

	$("#mainContent").fadeIn("slow");
	$("#logo").addClass("accessed");
	fillInGlossary();

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
		LogIn(youTyping.value);
	} else {
		NewCommand();
	}
}

function showSubcontent($this) {
	$this.next().fadeIn();
	showingDialog = true;
}

function hideDialogs() {
	if (showingDialog) {
		$(".subcontent").fadeOut();
		showingDialog = false;
	}

	if (showingEmail) {
		hideEmail();
	}
}

showingEmail = false;
function showEmail() {
	if (!showingEmail) {
		$("#emailIcon").hide();
		$("#secretEmail").show();
		showingEmail = true;
	} else {
		hideEmail();
	}
}

function hideEmail() {
	$("#emailIcon").show();
	$("#secretEmail").hide();
	showingEmail = false;
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

function ResetPage() {
	if (pastIntro && (showingEmail || showingDialog)) {
		hideDialogs();
	} else if (!isMobile) {
    	MirrorType();
	}
}

$(document).ready(function() {
	fakeCursor = document.getElementById("fakeCursor");
	commandWindow = document.getElementById("commandWindow");
	typed = document.getElementById("typed");
	tutorial = document.getElementById("tutorial");

	$("body").css("min-height", $(document).height());
	
	$("body").click(function() {
		ResetPage();
	});

	$("#reveal_tour").click(function(e) {
		e.stopPropagation(); 
		showSubcontent($(this)); 
	});

	$("#reveal_manifesto").click(function(e) {
		e.stopPropagation(); 
		showSubcontent($(this)); 
	});

	$("#reveal_email").click(function(e) { 
		e.stopPropagation();
		showEmail($(this)); 
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
