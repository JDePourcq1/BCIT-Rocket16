/**
 * database.js
 *   All database communication.
 */

var currentUser = null;

/**
 * Posts a new user to the database.
 */ 
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

/**
 * Log in to an account
 */
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
                        setupUser(data[i]);
                        $("#logForm")[0].reset();
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

/**
 * sets up the user information.
 */
var setupUser = function(data) {
    currentUser = data.username;
    document.getElementById("username").innerHTML = "<p>" + currentUser +"</p>";
    document.getElementById('profileButton').innerHTML = "Profile";
}

/**
 *
 *
 */
var getTravellerIcon = function(user) {
    var currentIcon;
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/User?q={"username": "' + user + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
        dataType: 'json',
        success: function (data) {
            currentIcon = data[0].traveller;
        }
    });
}


/**
 * 
 */
var setTravellerIcon = function(user, newIcon) {
    $.ajax({ 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/User?q={"username": "' + user + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
	    data: JSON.stringify( { "$set" : { "traveller" :  newIcon} } ),
		type: "PUT",
		contentType: "application/json" 
    });
}
 
 
/**
 * Posts a new score to the database.
 * @param user - The user that the score will be posted as
 * @param mins - the minutes to be stored
 * @param secs - the seconds to be scored
 * @param mils - the tenths of a millisecond to be stored
 */
var postScore = function(user, crsNo, mins, secs, mils) {
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?c=true&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
        dataType: 'json',
        success: function (data) {
            $.ajax({ 
                async: false,
                url: "https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB",
                data: JSON.stringify( { "scoreID": data.toString(),
                                        "username": user,
                                        "courseID": crsNo.toString(),
                                        "score": {
                                            "min": mins.toString(),
                                            "sec": secs.toString(),
                                            "mil": mils.toString()
                                        }} ),
                type: "POST",
                contentType: "application/json" 
            });
        }
    });
}

/**
 * returns the matrix for the course as a string.
 * @param crsNo - the course to retreive
 * @return the course data.
 */
var getCourse = function(crsNo) {
    var course;
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Course?q={"courseID":"' + crsNo +'"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
        dataType: 'json',
        success: function (data) {
            course = data[0].courseData;
        }
    });
    return course;
}
 
/**
 * returns the array of the specified course.
 * @param crsNo - the course to retreive
 * @return the challenges array.
 */
var getChallenges = function(crsNo) {
    challenges = [];
    $.ajax({
        type: 'GET',
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Course?q={"courseID":"' + crsNo + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < 10; i++) {
                challenges[i] = data[0].challenges[i][i].split(", ");
                for (j = 0; j < challenges[i].length; j++) {
                    challenges[i][j] = parseInt(challenges[i][j]);
                }
            }
        }
    });
    return challenges;
}
 
/** 
 * Retreives the data for the top ten scores.
 * @param crsNo - the course scores to be retreived.
 */
var getLeaderboard = function(crsNo) {
	
	var names = [];
	var min = [];
	var sec = [];
	var mil = [];
	var score = [];
	
    $.ajax({
        async: false,
        type: 'GET', 
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?s={"score.min":1, "score.sec": 1, "score.mil": 1}&q={"courseID": "' + crsNo + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
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

/**
 * Gets the best score for the current user and edits their profile to show it.
 */
var getCourseScores = function () {	
    for (i = 0; i < 4; i++) {
        $.ajax({
            async: false,
            type: 'GET', 
            url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Score?s={"score.min":1, "score.sec":1, "score.mil":1}&q={"username":"' + currentUser + '", "courseID":"' + i + '"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    document.getElementById('course' + (i+1) + 'Best').innerHTML = data[0].score.min + ":" + (data[0].score.sec < 10? "0"+data[0].score.sec : data[0].score.sec) + "." + data[0].score.mil;
                } else {
                    document.getElementById('course' + (i+1) + 'Best').innerHTML = "N/A";
                }
            }
        });
    }
}

/**
 * setup the leaderboard for the specified course.
 * @param crsNo - the course
 */
var setupLeaderboard = function(crsNo) {
    for(i = 1; i <= 5; i++) {
        if (i == crsNo+1) {
            document.getElementById('L'+i).className = "btn leaderButon current";
        } else {
            document.getElementById('L'+i).className = "btn leaderButton";
        }
    }
    getLeaderboard(crsNo);
}
