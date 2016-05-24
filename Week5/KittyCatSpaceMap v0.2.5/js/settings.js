var soundButtonNames = ["BGM", "SFX",];
var bgmON = true;
var sfxON = true;


$(document).ready(function() {
    $("#BGM").get(0).play();
});

function toggleBGM(button) {
	if(bgmON){
		bgmON = false;
		button.value = "OFF";
		button.style.backgroundColor = "Red";
		document.getElementById("BGM").pause();
		playSFX();
	}else{
		bgmON = true;
		button.value = "ON";
		button.style.backgroundColor = "rgb(51, 164, 33)";
		document.getElementById("BGM").play();
		playSFX();
	}
}

function playSFX(){
	document.getElementById("SFX").currentTime = 0;
	document.getElementById("SFX").play();
}

function toggleSFX(button) {
  if(sfxON){
		sfxON = false;
		button.value = "OFF";
		button.style.backgroundColor = "Red";
		document.getElementById("SFX").pause();
	}else{
		sfxON = true;
		button.value = "ON";
		button.style.backgroundColor = "rgb(51, 164, 33)";
		document.getElementById("SFX").play();
		playSFX();
	}
}

function hide(){
	$('#settingsPage').attr('style', 'display: none;');
	$('#menuDiv').show();
	openMenu();
	pauseGame();
}





 