var menuOpen = false;

function dimBackground() {
    document.getElementById("content").style.background = "blue";
}

function openMenu() {
    if (menuOpen == false) {
        var menu = document.createElement('div');
    
        menu.id = "menu";
        document.getElementById('menuDiv').appendChild(menu);
        
        dimBackground();
        menuOpen = true;
    } else {
        document.getElementById('menuDiv').removeChild(document.getElementById('menu'));
        menuOpen = false;
    }
}

onload = function() {
    var burgerButton = document.getElementById('burger');
    burgerButton.onclick = openMenu;
}