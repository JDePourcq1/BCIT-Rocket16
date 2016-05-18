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
                        document.getElementById("user").innerHTML = "<p>" + currentUser +"</p>";
                        $("#logForm")[0].reset();
                        return false;
                    }
                }
            }
            alert("Invalid User Data");
        }
    });
    return false;
}