var inputTable = [
"80,  60, 0,1,1,0,0,0,0,0,0,0,0,0|200,  60, 1,0,1,1,0,0,0,0,0,0,0,0|140, 110, 1,1,0,1,0,0,0,0,0,0,0,0|270, 110, 0,1,0,0,1,0,1,1,0,0,0,0|400,  80, 0,0,0,1,0,0,0,1,0,0,0,0| 90, 200, 0,0,1,0,0,0,0,0,0,1,0,0|200, 190, 0,0,1,1,0,0,0,0,0,0,1,0|340, 170, 0,0,0,1,1,0,0,0,1,0,0,0|340, 230, 0,0,0,0,0,0,0,1,0,0,1,1|100, 280, 0,0,0,0,0,1,0,0,0,0,1,0|240, 300, 0,0,0,0,0,0,1,0,1,1,0,1|420, 320, 0,0,0,0,0,0,0,0,1,0,1,0",
"40, 160, 0,1,0,0,1,0,0,1,0,0,0|100, 100, 1,0,1,0,1,0,0,0,0,0,0|220,  60, 0,1,0,1,1,1,1,0,0,0,0|380,  40, 0,0,1,0,0,0,1,0,0,0,0|140, 180, 1,1,1,0,0,1,0,1,0,0,0|240, 180, 0,0,1,0,1,0,1,1,1,1,0|340, 130, 0,0,1,1,0,1,0,0,0,1,0|100, 280, 1,0,0,0,1,1,0,0,1,0,1|240, 240, 0,0,0,0,0,1,0,1,0,1,1|420, 180, 0,0,0,0,0,1,1,0,1,0,1|360, 280, 0,0,0,0,0,0,0,1,1,1,0",
 "30, 180, 0,1,0,0,0,0,1,0,0,0,0| 100,  80, 1,0,1,0,1,0,0,0,0,0,0| 370,  50, 0,1,0,0,0,1,0,0,0,0,1| 110, 200, 0,0,0,0,1,0,1,1,0,0,0| 140, 130, 0,1,0,1,0,1,0,1,0,0,0| 230, 110, 0,0,1,0,1,0,0,1,1,0,0| 150, 270, 1,0,0,1,0,0,0,1,0,0,1| 200, 160, 0,0,0,1,1,1,1,0,0,1,0| 310, 150, 0,0,0,0,0,1,0,0,0,1,1| 240, 190, 0,0,0,0,0,0,0,1,1,0,1| 350, 240, 0,0,1,0,0,0,1,0,1,1,0",
 "100, 100, 0,1,0,1,1,1,0,0,0,0,0,0|200,  60, 1,0,1,0,0,1,1,0,0,0,0,0|320, 100, 0,1,0,0,0,0,1,1,0,0,0,0| 40, 140, 1,0,0,0,1,0,0,0,1,0,0,0|170, 160, 1,0,0,1,0,1,0,0,1,1,0,1|220, 170, 1,1,0,0,1,0,1,0,0,0,1,1|300, 180, 0,1,1,0,0,1,0,0,0,0,1,0|420, 200, 0,0,1,0,0,0,0,0,0,0,1,0|100, 230, 0,0,0,1,1,0,0,0,0,0,0,1|160, 220, 0,0,0,0,1,0,0,0,0,0,0,1|340, 260, 0,0,0,0,0,1,1,1,0,0,0,1|220, 280, 0,0,0,0,1,1,0,0,1,1,1,0"
 ];

 var challenge1 = ["1, 8, 3", "4, 3, 10", "6, 3, 8", "1, 5, 7", "4, 2, 9", "6, 10, 3, 8", "1, 10", "6, 2, 11", "6, 1, 10", "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11"];
 
//easterEgg
easterEnabled = false;

// Node template for symbol
var nodeColor = {
	default: '#9d9d9d',
	red: '#ff1d25',
	blue: '#3fa9f5',
	green: '#7ac943',
	orange: '#ff931e',
	pink: '#ff7bac',
	array: ['#ff1d25', '#3fa9f5', '#7ac943', '#ff931e', '#ff7bac']
};

var nodeIcon = {
	default: 'img/icon_obj_default.png',
	start: 'img/icon_obj_start.png',
    easter: 'img/easter.png',
    traveler: 'img/traveller_rocket.png',
	array: ['img/icon_obj_01.png','img/icon_obj_02.png','img/icon_obj_03.png']
}

var nodeArray = [];

/*var node = new Path.Circle(new Point(0,0), 12.5);
node.style = {

	fillColor: nodeColor.default
}
var nodeSymbol = new Symbol(node);
node.remove();*/

var defaultNodeStyle = {
	center: [0,0],
	radius: 12.5,
	fillColor: nodeColor.default,
	name: 'node'
}

// Path Styles
var pathStyle = {
	default: {
		strokeColor: '#555555',
		strokeWidth: 8,
	},
	selected: {
		strokeColor: '#fceebf',
		strokeWidth: 3,
		dashArray: [4,4]
	},
	travelled: {
		strokeColor: '#fceebf',
		strokeWidth: 3
	}
}

var coords = function(node) {
	var point = new Point(node.position.x, node.position.y);
	return point;
}

var readMapMatrix = function(num) {
	var mapMatrix = [];
	var nodeLines = inputTable[num].split('\|');
	for (i = 0; i < nodeLines.length; i++){
		var nodePoints = nodeLines[i].split('\,');
		for (j = 0; j < nodePoints.length; j++) {
			nodePoints[j] = parseInt(nodePoints[j]);
		}
		mapMatrix.push(nodePoints);
	}
	return mapMatrix;
};

function setupMap(num) {
	inputMap = readMapMatrix(num);
	for (i=0; i < inputMap.length; i++) {
		var newNode = new Shape.Circle(defaultNodeStyle);
		newNode.position = new Point(inputMap[i][0],inputMap[i][1]);
		var newNodeIcon = new Raster(nodeIcon.default);
		newNodeIcon.position = new Point(newNode.position);
		newNode.name = 'node';
		newNodeIcon.name = 'icon';
		nodeArray.push(new Group([newNode, newNodeIcon]));
	}

	for (i = 0; i < inputMap.length; i++) {
		for (j = 2; j < inputMap[i].length; j++) {
			if(inputMap[i][j]) {
				var path = new Path.Line(coords(nodeArray[i]),coords(nodeArray[j-2]));
				path.style = pathStyle.default;
				path.insertBelow(nodeArray[0]);
			}
		};
	}

}

var setupObjectives = function(num, start){
	var node = nodeArray[num-1].children[defaultNodeStyle.name];
	var icon = nodeArray[num-1].children['icon'];
    if(!start)
        node.fillColor = nodeColor.array[Math.floor(Math.random() * nodeColor.array.length)];
	if (start) {
		icon.source = nodeIcon.start;
        if(easterEnabled) {
            icon.source = nodeIcon.easter;
        } else {
            icon.source = nodeIcon.traveler;
        }
	} else {
		icon.source = nodeIcon.array[Math.floor(Math.random() * nodeIcon.array.length)];

	}
}


var resetMap = function() {
	nodeArray = [];
	project.clear();
}

var resetNodes = function(){
	if (nodeArray.length > 0) {
		for (var i = 0; i < nodeArray.length; i++) {
			nodeArray[i].children[defaultNodeStyle.name].fillColor = nodeColor.default;
			nodeArray[i].children['icon'].source = nodeIcon.default;
		}
	}
}

var randomObjectives = function() {
	resetNodes();
	console.log(nodeArray.length);
	var randomNodeNumber = Math.floor(nodeArray.length * Math.random());
	for (var i = randomNodeNumber; i >= 1; i--) {
		if (i == 1) {
			setupObjectives(Math.floor(nodeArray.length * Math.random()), true);
		} else {
			setupObjectives(Math.floor(nodeArray.length * Math.random()));
		}
	}
}


var setObjective = function(obj) {
	resetNodes();
	console.log(nodeArray.length);
	var challengeMatrix = [];
	var objective = challenge1[obj].split(",");
	setupObjectives(parseInt(objective[0]), true);
	for(i = 1; i < objective.length; i++) {
		setupObjectives(parseInt(objective[i]));

	}
}

var lvlCount = 1;

document.getElementById('course01').onclick = function() {
	resetMap();
	setupMap(lvlCount);
    startCountDown();
}

document.getElementById('update').onclick = function() {
	chosen = [];
	count = 0;
	setObjective(0);
	
}

var chosen = [];
var count = 0;
document.getElementById('next').onclick = function () {
	if(count == 8) {
		setObjective(challenge1.length-1);
		return;
	}
	var truth = true;
	while(truth) {
	    var challenge = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
	    
	    var id = 0;
	    for(i = 0; i < chosen.length; i++) {
	    	if(chosen[i] == challenge) {
	    		id++;
	    		break;
	    	}
	    }

	    if(id==0) {
	    	truth = false;
	    	id = 0;
	    	chosen[i] = challenge;
	    	count++;
	    	setObjective(challenge);
	    }
	}

}







//THIS STUFF WORKS BUT WE DONT NEED IT RIGHT NOW
/*
document.getElementById('nextMap').onclick = function() {
	resetMap();
	setupMap(lvlCount);
	lvlCount++;
	if (lvlCount >= inputTable.length) {
		lvlCount = 0;
	}
}
document.getElementById('prevMap').onclick = function() {
	resetMap();
	setupMap(lvlCount);
	lvlCount--;
	if (lvlCount < 0){
		lvlCount = inputTable.length - 1;
	}
	console.log(lvlCount);
}

document.getElementById('objectives').onclick = function() {
	randomObjectives();
}
*/