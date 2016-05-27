/**
 * 100% Canadian Hamburger Button
 */
var buttonNames = ["MAIN-MENU", "COURSE-SELECT", "PROFILE", "SETTINGS", "BACK"];

function openMenu() {
    if (menuOpen == false) {
        menuOpen = true;
        var menu = document.createElement('div');
        var myButton = document.createElement('button');
        
        if(gameplay) {
            pauseGame();
        }
        
        menu.id = "menu";
        for(i = 0; i < buttonNames.length; i++, myButton = document.createElement('button')) {
            myButton.type = "button";
            myButton.className = "btn center-block menuButton";
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
    setupUnlockedTravellers();
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
            playSFX("SFX");
        }
    });

    //when nose is clicked
    $('#nose').click(function(){
        if(currentUser != "") {
            alert("easter egg found!");
            unlockAchievement(currentUser, "easter");
        } else {
            alert("try signing in!");
        }
    });
    
    //user button
    $('#User').click(function() {
        if(currentUser == "") {
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
    
    //profile menu button
    $('div').on('click', 'button#PROFILE', function() {
        if(currentUser == "") {
            $('#mainPage').attr('style', 'display: none;');
            $('#courseSelect').attr('style', 'display: none;');
            $('#loginPage').attr('style', 'display: ;');
            $('#gameScreen').attr('style', 'display: none;');
            $('#leaderboard').attr('style', 'display: none;');
            $('#profilePage').attr('style', 'display: none;');
            $('#resultsPage').attr('style', 'display: none;');
            if (gameplay) {
                stopGame();
            }
            openMenu();
        } else {
            if (gameplay) {
                stopGame();
            }
            openMenu();
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
        if (gameplay) {
            stopGame();
        }
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
        if (gameplay) {
            stopGame();
        }
        if (menuOpen) {
            openMenu();
        }
    });
    
    //settings button
    $('div').on('click', 'button#SETTINGS', function() {
        settingsOpen = true;
        menuOpen = false;
		$('#settingsPage').attr('style', 'display: ;');
        $('#menuDiv').attr('style', 'display: none;');
    });
    
    //burger click
    $(".burger").click(function() {
        if(myTimer == null && !playerMoving && !settingsOpen) {
            openMenu();
        }
    });
    
    //back menu button
    $("#menuDiv").on('click', 'button#BACK', function() {
        goBack();
    });
    
    //leader button click
    $('.leader').click(function() {
        setupLeaderboard(0);
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
    
    //profile/signin button
    $('#profileButton').click(function() {
        if(currentUser == "") {
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
            if(menuOpen)
                openMenu();
            goToProfile();
        }
    });
    
    //sign out button
    $('#signout').click(function() {
        currentUser = "";
        deleteCookie("cookieUser");
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
    
    //retry button
    $('#retryButton').click(function() {
        document.getElementById("course"+(parseInt(currentCourse)+1)).click();
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
        if (menuOpen) {
            openMenu();
        }
    });
});