//------------------------------------------------------------
//     100% Canadian Hamburger Button
//------------------------------------------------------------
var menuOpen = false;
var buttonNames = ["MAIN-MENU", "COURSE-SELECT", "PROFILE", "SETTINGS", "BACK"];

function dimBackground() {
    
}

function undimBackground() {
    
}

function openMenu() {
    if (menuOpen == false) {
        menuOpen = true;
        disable();
        var menu = document.createElement('div');
        var myButton = document.createElement('button');
        
        if(gameplay) {
            pauseGame();
        } else {
            if(count > 0) {
                startCountDown();
            }
        }
        
        dimBackground();
        
        menu.id = "menu";
        for(i = 0; i < buttonNames.length; i++, myButton = document.createElement('button')) {
            myButton.type = "button";
            myButton.className = "btn center-block";
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

function goBack() {
    menuOpen = false;
    undimBackground();
    unlock();
    if(gameplay) {
        pauseGame();
    }
    document.getElementById('menuDiv').removeChild(document.getElementById('menu'));
}

$(document).ready(function(){
    //when launch is clicked
    $('#Launch').click(function(){
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: ;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
    });

    //when nose is clicked
    $('#nose').dblclick(function(){
        if(easterEnabled) {
            easterEnabled = false;
            alert("EASTER EGG DEACTIVATED.");
        } else {
            easterEnabled = true;
            alert("EASTER EGG ACTIVATED.");
        }
    });
    
    //user button
    $('#User').click(function() {
        if(currentUser == null) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: ;');
            $('#gameScreen').attr('style', 'display: none;');
            stopGame();
            if(menuOpen)
                openMenu();
        } else {
            alert("signed in as" + currentUser);
        }
    });
    
    $('div').on('click', 'button#PROFILE', function() {
        if(currentUser == null) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: ;');
            $('#gameScreen').attr('style', 'display: none;');
            stopGame();
            openMenu();
        } else {
            alert("signed in as" + currentUser);
        }
    });
    

    //main menu button
    $('div').on('click', 'button#MAIN-MENU', function() {
        $('#mainPage').attr('style', 'display: ;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        stopGame();
        openMenu();
    });

    //course select button
    $('div').on('click', 'button#COURSE-SELECT', function() {
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: ;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        stopGame();
        openMenu();
    });
    
    $(".burger").click(function() {
        if(myTimer == null)
            openMenu();
    });
    $("#menuDiv").on('click', 'button#BACK', function() {
        goBack();
    });
    
    //course 01
    $('#course01').click(function() {
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: ;');
    });
});