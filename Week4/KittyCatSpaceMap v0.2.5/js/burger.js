//------------------------------------------------------------
//     100% Canadian Hamburger Button
//------------------------------------------------------------
var menuOpen = false;
var buttonNames = ["MAIN-MENU", "COURSE-SELECT", "PROFILE", "SETTINGS", "BACK"];

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
    unlock();
    if(gameplay) {
        pauseGame();
    }
    document.getElementById('menuDiv').removeChild(document.getElementById('menu'));
}

function goToProfile() {
    if(menuOpen) {
        openMenu();
    }
    document.getElementById('usernameHeader').innerHTML = currentUser;
    getCourseScores();
    $('#mainPage').attr('style', 'display: none;');
    $('#courseSelect').attr('style', 'display: none;');
    $('#loginPage').attr('style', 'display: none;');
    $('#gameScreen').attr('style', 'display: none;');
    $('#leaderboard').attr('style', 'display: none;');
    $('#profilePage').attr('style', 'display: ;');
    $('#resultsPage').attr('style', 'display: none;');
    
}

$(document).ready(function(){
    //when launch is clicked
    $('#Launch').click(function(){
        if (!menuOpen) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: ;');
            $('#loginPage').attr('style', 'display: none;');
            $('#gameScreen').attr('style', 'display: none;');
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
        }
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
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
            if(menuOpen)
                openMenu();
        } else {
            goToProfile();
        }
    });
    
    $('div').on('click', 'button#PROFILE', function() {
        if(currentUser == null) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: ;');
            $('#gameScreen').attr('style', 'display: none;');
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
            stopGame();
            openMenu();
        } else {
            goToProfile();
        }
    });
    

    //main menu button
    $('div').on('click', 'button#MAIN-MENU', function() {
        $('#mainPage').attr('style', 'display: ;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        stopGame();
        openMenu();
    });
    
    //back button
    $(".return").click(function() {
        $('#mainPage').attr('style', 'display: ;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        if(menuOpen)
            openMenu();
    });

    //course select button
    $('div').on('click', 'button#COURSE-SELECT', function() {
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: ;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        stopGame();
        openMenu();
    });
    
    //settings button
    $('div').on('click', 'button#SETTINGS', function() {
		$('#settingsPage').attr('style', 'display: ;');
        $('#menuDiv').hide();
		openMenu();
		pauseGame();
		
    });
    
    //burger click
    $(".burger").click(function() {
        if(myTimer == null)
            openMenu();
    });
    
    //back menu button
    $("#menuDiv").on('click', 'button#BACK', function() {
        goBack();
    });
    
    //course 01
    $('#course01').click(function() {
        if (!menuOpen) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: none;');
            $('#gameScreen').attr('style', 'display: ;');
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
        }
    });
    
    //leader button click
    $('.leader').click(function() {
        getLeaderboard();
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: ;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        if (menuOpen) {
            openMenu();
        }
    });
    
    //sign out button
    $('#signout').click(function() {
        currentUser = null;
        document.getElementById("username").innerHTML = "";
        document.getElementById('profileButton').innerHTML = "Sign-In";
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: ;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        if(menuOpen)
            openMenu();
    });
    
    //profile/signin button
    $('#profileButton').click(function() {
        if(currentUser == null) {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: ;');
            $('#gameScreen').attr('style', 'display: none;');
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
            if (menuOpen)
                openMenu();
        } else {
            goToProfile();
        }
    });
    
    //retry button
    $('#retryButton').click(function() {
        document.getElementById("course01").click();
    });
    
    //continue button
    $('#continueButton').click(function() {
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: ;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: none;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
        if (menuOpen)
            openMenu();
    });
});