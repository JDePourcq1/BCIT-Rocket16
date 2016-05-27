/**
 *creates a cookie to track if user has signed in
 *param cname = cookie name
 *param cvalue = cookie value 
 *param exdays = cookie expiry date
 */
function setCookie(cname,cvalue,exdays){
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

/**
 *grabs the value of the cookie
 *param cname = the cookie name you are grabbing
 */
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

/**
 *checks if a cookie exists
 */
function checkCookie(){
	var cookieCat=getCookie("cookieUser");
    if (cookieCat != "") {
        currentUser = cookieCat;
		document.getElementById("username").innerHTML = "<p>" + currentUser +"</p>";
		document.getElementById('profileButton').innerHTML = "Profile";
    }
}

/**
 *grabs the value of the cookie
 *param cname = the cookie name you are deleting
 */
function deleteCookie(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//onload check if a cookie has been stored
window.onload = function() {
	checkCookie();
}



//sign out button
$('#signout').click(function() {
	currentUser = null;
	//added deleteCookie("cookieUser"); originally in burger.js
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