var myTimer = null;
var gameTimer = null;
var gameplay = false;
var timerCount = 0;
var pictures = [
    "img/ready.png",
    "img/set.png",
    "img/go.png"
];
var mil = 0, sec = 0, min = 0;

function countdown() {
    if (timerCount > 0) {
        document.getElementById('readyState').removeChild(document.getElementById('state'));
    }
    if (timerCount >= 3) {
        clearInterval(myTimer);
        myTimer = null;
        startGame();
        return;
    }
    
    var pic = document.createElement('img');
    
    pic.src = pictures[timerCount++];
    pic.id = "state";
    
    document.getElementById('readyState').appendChild(pic);
}

function startCountDown() {
    if(myTimer == null) {
        myTimer = setInterval('countdown();', 1000);
    }
}

function startGame() {
    gameplay = true;
    var div = document.createElement('div');
    div.id = 'game';
    document.getElementById('update').click();
    document.getElementById('timer').appendChild(div);
    gameTimer = setInterval('game();', 100);
}

function pauseGame() {
    if(gameTimer != null) {
        clearInterval(gameTimer);
        gameTimer = null;
    } else {
        gameTimer = setInterval('game();', 100);
    }
}

function stopGame() {
    if(gameTimer != null) {
        clearInterval(gameTimer);
        gameTimer = null;
    } 
    if (myTimer != null) {
        clearInterval(myTimer);
        myTimer = null;
    }
    gameplay = false;
    timerCount = 0;
    min = 0;
    sec = 0;
    mil = 0;
    document.getElementById('timer').removeChild(document.getElementById('game'));
}

function game() {
    if(++mil == 10) {
        mil = 0;
        if(++sec == 60) {
            sec = 0;
            min++;
        }
    }
    document.getElementById('game').innerHTML = '<p>'+(min)+':'+(sec<10?'0'+sec:sec)+'.'+mil+'<p>';
}