
//--------------------------------
//          TIMER STUFF
//--------------------------------
var myTimer = null;
var gameTimer = null;
var gameplay = false;
var count = 0;
var pictures = [
    "img/0.jpg",
    "img/1.jpg",
    "img/2.jpg",
];
var mil = 0, sec = 0, min = 0;

function addContent() {
    if (count > 0) {
        document.getElementById('readyState').removeChild(document.getElementById('state'));
    }
    if (count >= 3) {
        clearInterval(myTimer);
        myTimer = null;
        startGame();
        return;
    }
    
    var pic = document.createElement('img');
    
    pic.src = pictures[count++];
    pic.id = "state";
    
    document.getElementById('readyState').appendChild(pic);
}

function startCountDown() {
    if(!gameplay) {
        if(myTimer == null) {
            myTimer = setInterval('addContent();', 1000);
        }
    } else {
        if (!menuOpen) {
            if(gameTimer == null) {
                gameTimer = setInterval('game();', 10);
            } else {
                clearInterval(gameTimer);
                gameTimer = null;
            }
        }
    }
}

function startGame() {
    gameplay = true;
    var div = document.createElement('div');
    div.id = 'game';
    document.getElementById('content').appendChild(div);
    gameTimer = setInterval('game();', 10);
}

function pauseGame() {
    if(gameplay) {
        if(gameTimer != null) {
            clearInterval(gameTimer);
            gameTimer = null;
        }
    }
}

function stopGame() {
    if (!menuOpen) {
        if(gameplay) {
            if(gameTimer != null) {
                clearInterval(gameTimer);
                gameTimer = null;
            }
            min = 0;
            sec = 0;
            mil = 0;
            document.getElementById('game').innerHTML = '<p>0:00.00<p>';
        }
    }
}

function game() {
    if(mil == 100) {
        mil = 0;
        if(++sec == 60) {
            sec = 0;
            min++;
        }
    }
    document.getElementById('game').innerHTML = '<p>'+(min)+':'+(sec<10?'0'+sec:sec)+'.'+(mil<10?'0'+mil:mil)+'<p>';
    mil++;
}

//------------------------------------------------------------
//     100% Canadian Hamburger Button
//------------------------------------------------------------
var menuOpen = false;
var buttonNames = ["MAIN MENU", "COURSE SELECT", "PROFILE", "SETTINGS", "BACK"];

function dimBackground() {
    document.getElementById("body").style.background = "gray";
    document.getElementById("content").style.opacity = 0.5;
}

function undimBackground() {
    document.getElementById("body").style.background = "white";
    document.getElementById("content").style.opacity = 1;
}

function openMenu() {
    if (gameplay) {
        if (menuOpen == false) {
            menuOpen = true;
            var menu = document.createElement('div');
            var myButton = document.createElement('button');
            
            dimBackground();
            pauseGame();
            
            menu.id = "menu";
            for(i = 0; i < buttonNames.length; i++, myButton = document.createElement('button')) {
                myButton.type = "button";
                myButton.className = "btn btn-success center-block";
                myButton.innerHTML = buttonNames[i];
                myButton.id = buttonNames[i];
                menu.appendChild(myButton);
                menu.appendChild(document.createElement('br'));
            }
            document.getElementById('menuDiv').appendChild(menu);
            
        } else {
            goBack();
        }
    }
}

function goBack() {
    menuOpen = false;
    undimBackground();
    startCountDown();
    document.getElementById('menuDiv').removeChild(document.getElementById('menu'));
}


//----------------
//    Main Loop
//----------------
onload = function() {
    var start = document.getElementById('startButton');
    var pause = document.getElementById('pauseButton');
    var stop = document.getElementById('stopButton');
    var burgerButton = document.getElementById('burger');
    
    start.onclick = startCountDown;
    pause.onclick = pauseGame;
    stop.onclick = stopGame;
    burgerButton.onclick = openMenu;
}