var canvas;
var board;
var inputTable = [
"80,  60, 0,1,1,0,0,0,0,0,0,0,0,0|200,  60, 1,0,1,1,0,0,0,0,0,0,0,0|140, 110, 1,1,0,1,0,0,0,0,0,0,0,0|270, 110, 0,1,0,0,1,0,1,1,0,0,0,0|400,  80, 0,0,0,1,0,0,0,1,0,0,0,0| 90, 200, 0,0,1,0,0,0,0,0,0,1,0,0|200, 190, 0,0,1,1,0,0,0,0,0,0,1,0|340, 170, 0,0,0,1,1,0,0,0,1,0,0,0|340, 230, 0,0,0,0,0,0,0,1,0,0,1,1|100, 280, 0,0,0,0,0,1,0,0,0,0,1,0|240, 300, 0,0,0,0,0,0,1,0,1,1,0,1|420, 320, 0,0,0,0,0,0,0,0,1,0,1,0",
"40, 160, 0,1,0,0,1,0,0,1,0,0,0|100, 100, 1,0,1,0,1,0,0,0,0,0,0|220,  60, 0,1,0,1,1,1,1,0,0,0,0|380,  40, 0,0,1,0,0,0,1,0,0,0,0|140, 180, 1,1,1,0,0,1,0,1,0,0,0|240, 180, 0,0,1,0,1,0,1,1,1,1,0|340, 130, 0,0,1,1,0,1,0,0,0,1,0|100, 280, 1,0,0,0,1,1,0,0,1,0,1|240, 240, 0,0,0,0,0,1,0,1,0,1,1|420, 180, 0,0,0,0,0,1,1,0,1,0,1|360, 280, 0,0,0,0,0,0,0,1,1,1,0",
 "30, 180, 0,1,0,0,0,0,1,0,0,0,0| 100,  80, 1,0,1,0,1,0,0,0,0,0,0| 370,  50, 0,1,0,0,0,1,0,0,0,0,1| 110, 200, 0,0,0,0,1,0,1,1,0,0,0| 140, 130, 0,1,0,1,0,1,0,1,0,0,0| 230, 110, 0,0,1,0,1,0,0,1,1,0,0| 150, 270, 1,0,0,1,0,0,0,1,0,0,1| 200, 160, 0,0,0,1,1,1,1,0,0,1,0| 310, 150, 0,0,0,0,0,1,0,0,0,1,1| 240, 190, 0,0,0,0,0,0,0,1,1,0,1| 350, 240, 0,0,1,0,0,0,1,0,1,1,0",
 "100, 100, 0,1,0,1,1,1,0,0,0,0,0,0|200,  60, 1,0,1,0,0,1,1,0,0,0,0,0|320, 100, 0,1,0,0,0,0,1,1,0,0,0,0| 40, 140, 1,0,0,0,1,0,0,0,1,0,0,0|170, 160, 1,0,0,1,0,1,0,0,1,1,0,1|220, 170, 1,1,0,0,1,0,1,0,0,0,1,1|300, 180, 0,1,1,0,0,1,0,0,0,0,1,0|420, 200, 0,0,1,0,0,0,0,0,0,0,1,0|100, 230, 0,0,0,1,1,0,0,0,0,0,0,1|160, 220, 0,0,0,0,1,0,0,0,0,0,0,1|340, 260, 0,0,0,0,0,1,1,1,0,0,0,1|220, 280, 0,0,0,0,1,1,0,0,1,1,1,0"
 ];
 
var challenge1 = [[0, 7, 2], [3, 2, 9], [5, 2, 7], [1, 5, 7], [4, 2, 8], [5, 9, 2, 7], [0, 9], [5, 1, 10], [5, 0, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];

//easterEgg
easterEnabled = false;

// Style data for Node and Path objects
var nodeColor = {
	default: '#9d9d9d',
	red: '#ff1d25',
	blue: '#3fa9f5',
	green: '#7ac943',
	orange: '#ff931e',
	pink: '#ff7bac',
	array: ['#ff1d25', '#3fa9f5', '#7ac943', '#ff931e', '#ff7bac']
};

var nodeState = {
	s0: 'default',
	s1: 'selected',
	s2: 'objective',
	s3: 'startPoint'
}

var nodeIcon = {
	default: 'img/icon_obj_default.png',
	start: 'img/icon_obj_start.png',
	array: ['img/icon_obj_01.png','img/icon_obj_02.png','img/icon_obj_03.png']
}

var pathStyle = {
	default: {
		strokeColor: '#333333',
		strokeWidth: 8,
		dashArray: [1,0]
	},
	selected: {
		strokeColor: '#fceebf',
		strokeWidth: 3,
		dashArray: [4,4]
	},
	travelled: {
		strokeColor: '#fceebf',
		strokeWidth: 3,
		dashArray: [1,0]
	}
}


function Node(xpos, ypos, name) {
	this.name = name;
	this.selectable = false;
	this.nodeState = nodeState.s0;
	this.node = new paper.Shape.Circle({
		center: [xpos, ypos],
		radius: 12.5,
		fillColor: nodeColor.default
	});
	this.icon = new paper.Raster({
		name: name,
		source: nodeIcon.default,
		position: [xpos, ypos]
	});

	
	
	this.getCoords = function() {
		var point = new paper.Point(this.node.position.x, this.node.position.y);
		return point;
	}

	this.setObjective = function(start) {
		this.node.fillColor = nodeColor.array[Math.floor(Math.random() * nodeColor.array.length)];
		if (start) {
			this.icon.source = nodeIcon.start;
			this.nodeState = nodeState.s3;
		} else {
			this.icon.source = nodeIcon.array[Math.floor(Math.random() * nodeIcon.array.length)];
			this.nodeState = nodeState.s2;
		}
	}

	this.setSelectable = function(state) {
		if (state && this.nodeState != nodeState.s1) {
			this.selectable = true;
			this.node.style = {
				shadowColor: '#82F5F5',
				shadowBlur: 12
			}
		} else {
			this.selectable = false;
			this.node.style = {
				shadowColor: 0,
				shadowBlur: 0
			}
		}
	}

	this.resetNode = function() {
		this.node.fillColor = nodeColor.default;
		this.icon.source = nodeIcon.default;
		this.setSelectable(false);
		this.nodeState = nodeState.s0
	}

	this.icon.onClick = function(event) {
		console.log(this.name);
		parseInt(this.name.substring(3));
		
	}
 };

function Path(startPos, endPos) {
	this.line = new paper.Path.Line({
		from: startPos,
		to: endPos,
		strokeColor: pathStyle.default.strokeColor,
		strokeWidth: pathStyle.default.strokeWidth
	});
	this.userLine = new paper.Path.Line({
		from: startPos,
		to: endPos
	});
	this.userLine.moveAbove(this.line);

	this.setUserSelected = function() {
		this.userLine.style = pathStyle.selected;
	}

	this.setUserTravelled = function() {
		this.userLine.style = pathStyle.travelled;
	}

	this.resetUserLine = function() {
		this.userLine.style = pathStyle.default;
	}

}

function Traveller(posPoint) {
	this.icon = new paper.Raster({
		source: easterEnabled?'img/easter.png':'img/traveller_rocket.png',
		position: posPoint
			});

}

function GameBoard() {
	this.nodeArray = [];
	this.pathArray = [];
	this.mapMatrix = [];
	this.activeChallenge = [];
	this.traveller;

	this.resetMap = function() {
		this.nodeArray = [];
		this.pathArray = [];
		paper.project.clear();
	}

	this.readMapMatrix = function(inputString){
		this.mapMatrix = [];
		var nodeLines = inputString.split('\|');
		for (i = 0; i < nodeLines.length; i++) {
			var nodePoints = nodeLines[i].split('\,');
			for (j = 0; j < nodePoints.length; j++) {
				nodePoints[j] = parseInt(nodePoints[j]);
			}
		this.mapMatrix.push(nodePoints);
		}
		return this.mapMatrix;
	};

	this.setupBoard = function(levelNum) {
		if (this.nodeArray.length > 0) {
			this.resetMap();
		}
		inputMap = this.readMapMatrix(inputTable[levelNum]);
		for (i = 0; i < inputMap.length; i++) {
			var node = new Node(inputMap[i][0], inputMap[i][1], 'node' + i);
			this.nodeArray.push(node);
		}
		for (i = 0; i < inputMap.length; i++) {
			for (j = 2; j < inputMap[i].length; j++) {
				if (inputMap[i][j]) {
					var path = new Path(this.nodeArray[i].getCoords(), this.nodeArray[j-2].getCoords());
					path.line.sendToBack();
					this.pathArray.push(path);
				}
			}
		}
	}

	this.setSelectables = function(nodeNum) { 
		for (var i = 2; i < this.mapMatrix[nodeNum].length; i++) {
			var node = this.nodeArray[i-2];
			if (this.mapMatrix[nodeNum][i] == 1) {
				node.setSelectable(true);
			 
			} else {
				node.setSelectable(false);
			}
		}
	} 

	this.setObjectives = function(objectiveArray) {
		this.resetNodes();
		this.activeChallenge = objectiveArray;
		for (var i = 0; i < objectiveArray.length; i++) {
			if ( i == 0) {
				this.nodeArray[objectiveArray[i]].setObjective(true);
				this.traveller = new Traveller(this.nodeArray[objectiveArray[i]].getCoords());
				this.setSelectables(objectiveArray[i]);
			} else {
				this.nodeArray[objectiveArray[i]].setObjective(false);
			}
		}
	}

	this.resetNodes = function() {
		if (this.nodeArray.length > 0) {
			for (var i = 0; i < this.nodeArray.length; i++) {
				this.nodeArray[i].resetNode();
			}
		}
		if (this.traveller != null) {
			this.traveller.icon.remove();
			this.traveller = null;
		}
	}

	// moveTraveller requires param as {x:n1, y:n2}, {x:n3, y:n4}
	this.moveTraveller = function(endPos){
		traveller.icon.rotation = 0;
		this.icon.rotate(
			(Math.atan2(endPos.y - this.icon.position.y, endPos.x - this.icon.position.x) * 180 / Math.PI) + 90);
		var destination = new paper.Point(endPos);
		this.icon.onFrame = function(event) {
			console.log(this);
			var vector = destination - this.icon.position;

			this.icon.position += vector / 30;
		}
	}
}

var chosen = [];
var count = 0;

document.getElementById('course01').onclick = function() {
	board.resetNodes();
	board.setupBoard(1);
    startCountDown();
}

document.getElementById('update').onclick = function() {
	chosen = [];
	count = 0;
    board.setObjectives(challenge1[0]);
}

document.getElementById('next').onclick = function () {
	if(count == 8) {
		board.setObjectives(challenge1[challenge1.length-1]);
		return;
	}
	while(true) {
	    var challenge = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
	    var id = 0;
	    for(i = 0; i < chosen.length; i++) {
	    	if(chosen[i] == challenge) {
	    		id++;
	    		break;
	    	}
	    }
	    if(id==0) {
	    	chosen[count++] = challenge;
	    	board.setObjectives(challenge1[challenge]);
            break;
	    }
	}
}

window.onload = function() {
	canvas = document.getElementById('GameBoard');
	paper.setup(canvas);
	board = new GameBoard();
	board.setupBoard(1);

}