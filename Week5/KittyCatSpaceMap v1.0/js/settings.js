/**
 * The settings menu
 */

var soundButtonNames = ["BGM", "SFX",];
var bgmON = true;
var sfxON = true;


$(document).ready(function() {
    var vid = document.getElementById("BGM");
    vid.volume = 0.3;
    $("#BGM").get(0).play();
});

function toggleBGM(button) {
	if(bgmON){
		bgmON = false;
		button.value = "OFF";
		button.style.backgroundColor = "Red";
		document.getElementById("BGM").pause();
		playSFX("SFX");
	}else{
		bgmON = true;
		button.value = "ON";
		button.style.backgroundColor = "rgb(51, 164, 33)";
		document.getElementById("BGM").play();
		playSFX("SFX");
	}
}

function playSFX(sound){
    if (sfxON) {
        document.getElementById(sound).currentTime = 0;
        document.getElementById(sound).play();
    }
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
		playSFX("SFX");
	}
}

function hide(){
    settingsOpen = false;
    menuOpen = true;
	$('#settingsPage').attr('style', 'display: none;');
	$('#menuDiv').attr('style', 'display: ;');
}





 