/*
    Signing in and Signing up.
*/

var currentUser = null;

//sign up: 
var signUp = function() {
    var user = document.getElementById("Username").value;
    var email = document.getElementById("E-Mail").value;
    var pass = document.getElementById("Password").value;
    
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/User?apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
        dataType: 'json',
        success: function (data) {
            for(i = 0; i < data.length; i++) {
                if(user.toLowerCase() == (data[i].username).toLowerCase()) {
                    alert("Username Already Taken!");
                    return false;
                }
            }
            
            $.ajax( { url: "https://api.mlab.com/api/1/databases/kitty_cat_database/collections/User?apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB",
                async: false,
                data: JSON.stringify( { "username": user,
                                        "email": email,
                                        "password": pass} ),
                type: "POST",
                contentType: "application/json" } 
            );
            $("#signForm")[0].reset();
            alert("New User Created!");
        }
    });
    return false;
}

//Log in:
var logIn = function () {
    var user = document.getElementById("logUser").value;
    var pass = document.getElementById("logPassword").value;
    
    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/User?apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
        dataType: 'json',
        success: function(data) {
            for(i = 0; i < data.length; i++) {
                if(user.toLowerCase() == (data[i].username).toLowerCase()) {
                    if(pass == data[i].password) {
                        currentUser = data[i].username;
						setCookie("cookieUser",currentUser,14);
                        document.getElementById("username").innerHTML = "<p>" + currentUser +"</p>";
                        $("#logForm")[0].reset();
                        document.getElementById('profileButton').innerHTML = "Profile";
                        goToProfile();
                        return false;
                    }
                }
            }
            alert("Invalid User Data");
        }
    });
    return false;
}

// retrieve score for leaderboard
var getLeaderboard = function () {
	
	var names = new Array(10);
	var min = new Array(10);
	var sec = new Array(10);
	var mil = new Array(10);
	var score = new Array(10);
	
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?s=%7B%22score.min%22%3A%201%2C%20%22score.sec%22%3A%201%2C%20%22score.mil%22%3A%201%7D&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
		dataType: 'json',
        success: function(data) {
			for(i = 0; i < 10; i++) {
				names[i] = data[i].username;	
				min[i] = data[i].score.min;
				sec[i] = data[i].score.sec;
				mil[i] = data[i].score.mil;
				score[i] = Math.ceil((4000000 - (min[i] * 60 * 100 + sec[i] * 100 + mil[i])) / 1000);
			}
		}
	});
	
	document.getElementById("topTen").innerHTML 
		= "<tr><th>Name</th><th>Time</th><th>Score</td></tr>"
		+ "<tr><td>" + names[0] + "</td>" + "<td>" + min[0] + ":" + sec[0] + ":" + mil[0] 
		+ "</td>" + "<td>" + score[0] + "</td></tr>"
		+ "<tr><td>" + names[1] + "</td>" + "<td>" + min[1] + ":" + sec[1] + ":" + mil[1] 
		+ "</td>" + "<td>" + score[1] + "</td></tr>"
		+ "<tr><td>" + names[2] + "</td>" + "<td>" + min[2] + ":" + sec[2] + ":" + mil[2] 
		+ "</td>" + "<td>" + score[2] + "</td></tr>"
		+ "<tr><td>" + names[3] + "</td>" + "<td>" + min[3] + ":" + sec[3] + ":" + mil[3] 
		+ "</td>" + "<td>" + score[3] + "</td></tr>"
		+ "<tr><td>" + names[4] + "</td>" + "<td>" + min[4] + ":" + sec[4] + ":" + mil[4] 
		+ "</td>" + "<td>" + score[4] + "</td></tr>"
		+ "<tr><td>" + names[5] + "</td>" + "<td>" + min[5] + ":" + sec[5] + ":" + mil[5] 
		+ "</td>" + "<td>" + score[5] + "</td></tr>"
		+ "<tr><td>" + names[6] + "</td>" + "<td>" + min[6] + ":" + sec[6] + ":" + mil[6] 
		+ "</td>" + "<td>" + score[6] + "</td></tr>"
		+ "<tr><td>" + names[7] + "</td>" + "<td>" + min[7] + ":" + sec[7] + ":" + mil[7] 
		+ "</td>" + "<td>" + score[7] + "</td></tr>"
		+ "<tr><td>" + names[8] + "</td>" + "<td>" + min[8] + ":" + sec[8] + ":" + mil[8] 
		+ "</td>" + "<td>" + score[8] + "</td></tr>"
		+ "<tr><td>" + names[9] + "</td>" + "<td>" + min[9] + ":" + sec[9] + ":" + mil[9] 
		+ "</td>" + "<td>" + score[9] + "</td></tr>";

}

//retrieve course times for profile pic	
var getCourseScores = function () {	
    for (i = 1; i <= 1; i++) {
        $.ajax({
            async: false,
            type: 'GET', 
            url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?s={"score.min":1, "score.sec":1, "score.mil":1}&q={"username":"' + currentUser + '", "courseID":"' + i + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    document.getElementById('course1Best').innerHTML = data[0].score.min + ":" + data[0].score.sec + "." + data[0].score.mil;
                } else {
                    document.getElementById('course1Best').innerHTML = "N/A";
                }
            }
        });
    }
}

$(document).ready(function(){
    $('#refresh').click(function(){
        getLeaderboard();
    });
});

function setCookie(cname,cvalue,exdays){
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname){
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(){
	var cookieCat=getCookie("cookieUser");
    if (cookieCat != "") {
        currentUser = cookieCat;
		document.getElementById("username").innerHTML = "<p>" + currentUser +"</p>";
		document.getElementById('profileButton').innerHTML = "Profile";
    }
}

function deleteCookie(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.onload = function() {
	checkCookie();
}