var canvas;
var board;
var chosen = [];
var count = 0;
var challenges = [];
var currentScore = [];

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
	s3: 'last',
	s4: 'startPoint'
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


function Node(xpos, ypos, id) {
	this.name = 'node' + id;
	this.selectable = false;
	this.node = new paper.Shape.Circle({
		center: [xpos, ypos],
		radius: 12.5,
		fillColor: nodeColor.default
	});
	this.icon = new paper.Raster({
		data: {
			id: id,
			selectable: false,
			nodeState: nodeState.s0
		},
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
			this.icon.data.nodeState = nodeState.s4;
		} else {
			this.icon.source = nodeIcon.array[Math.floor(Math.random() * nodeIcon.array.length)];
			this.icon.data.nodeState = nodeState.s2;
		}
	}

	this.setSelectable = function(state) {
		if (state && this.icon.data.nodeState != nodeState.s1) {
			this.icon.data.selectable = true;
			this.node.style = {
				shadowColor: '#82F5F5',
				shadowBlur: 12
			}
		} else {
			this.icon.data.selectable = false;
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
		this.icon.data.nodeState = nodeState.s0
	}

	this.icon.onClick = function(event) {
		if (this.data.selectable) {
			if (this.data.nodeState == nodeState.s3) {
				board.stepBackUserPath();
			} else {
				board.setUserPath(this.data.id);
			}
		}
	}
 };

function Path(startPos, endPos) {
	this.line = new paper.Path.Line({
		from: startPos,
		to: endPos,
		strokeColor: pathStyle.default.strokeColor,
		strokeWidth: pathStyle.default.strokeWidth
	});
}

function UserPath(startPos) {
	this.userLine = new paper.Path.Line({
		segments: [startPos],
		name: 'userPath'
	});
	this.userLine.moveBelow(board.nodeArray[0].node);
	this.userLine.style = pathStyle.selected;

	this.setUserTravelled = function() {
		this.userLine.style = pathStyle.travelled;
	}

	this.addUserPath = function(endPos) {
		this.userLine.add(endPos);
		if (this.userLine.segments[0].equals(endPos)) {
			return true;
		} else {
			return false;
		}
	}

	this.removeUserPath = function() {
		this.userLine.removeSegment(this.userLine.segments.length-1);
	}
}


function Traveller(posPoint, nodeId) {
	this.icon = new paper.Raster({
        
		source: easterEnabled?'img/easter.png':'img/traveller_rocket.png',
		position: posPoint,
		data: {
			id: nodeId
		}
			});

	this.rotateT = function(endPoint){
		this.icon.rotation = 0;
		this.icon.rotate(
			(Math.atan2(endPoint.y - this.icon.position.y, endPoint.x - this.icon.position.x) * 180 / Math.PI) + 90);
		return this.icon.rotation;
	}
		
	this.icon.onClick = function(event) {
		if(board.nodeArray[this.data.id].icon.data.selectable){
			if(board.pathArray.length <= 1) {
				board.stepBackUserPath();
			} else {
				board.setUserPath(this.data.id);
				if (board.isPathComplete()) {
					board.moveTraveller();
				} else {
					alert('You missed some objectives.');
					board.stepBackUserPath();
				}
			}
		}
	}
}

function GameBoard() {
	this.nodeArray = [];
	this.pathArray = [];
	this.mapMatrix = [];
	this.activeChallenge = [];
	this.traveller;
	this.userPath = null;
	this.activeNode;


	this.resetMap = function() {
		this.nodeArray = [];
		this.pathArray = [];
		this.activeChallenge = [];
		this.traveller = null;
		this.userPath = null;
		this.activeNode = null;
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
        var course;
        $.ajax({
            async: false,
            type: 'GET', 
            url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Course?q={"courseID":"' + levelNum +'"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB', 
            dataType: 'json',
            success: function (data) {
                course = data[0].courseData;
            }
        });
		if (this.nodeArray.length > 0) {
			this.resetMap();
		}
		inputMap = this.readMapMatrix(course);
		for (i = 0; i < inputMap.length; i++) {
			var node = new Node(inputMap[i][0], inputMap[i][1], i);
			this.nodeArray.push(node);
		}
		for (i = 0; i < inputMap.length; i++) {
            for (j = 2; j < inputMap[i].length; j++) {
                if (inputMap[i][j]) {
                    var path = new Path(this.nodeArray[i].getCoords(), this.nodeArray[j-2].getCoords());
                    path.line.sendToBack();
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
    
    this.setAllUnSelectable = function() {
		this.nodeArray.forEach(function(node){
			node.setSelectable(false);
		});
	}

	this.setObjectives = function(objectiveArray) {
		this.resetNodesAndPath();
		this.activeChallenge = objectiveArray;
		for (var i = 0; i < objectiveArray.length; i++) {
			if ( i == 0) {
				var startPoint = objectiveArray[i];
				this.nodeArray[startPoint].setObjective(true);
				this.traveller = new Traveller(this.nodeArray[startPoint].getCoords(), startPoint);
				this.setSelectables(startPoint);
				this.userPath = new UserPath(this.nodeArray[startPoint].getCoords());
				this.activeNode = startPoint;
			} else {
				this.nodeArray[objectiveArray[i]].setObjective(false);
			}
		}
	}

	this.resetNodesAndPath = function() {
		if (this.nodeArray.length > 0) {
			for (var i = 0; i < this.nodeArray.length; i++) {
				this.nodeArray[i].resetNode();
			}
		}
		if (this.traveller != null) {
			this.traveller.icon.remove();
			this.traveller = null;
		}
		if (this.userPath != null) {
			this.userPath.userLine.clear();
			console.log(this.userPath.userLine);

			this.userPath = null;
			console.log(paper.project.getItems({name: 'userPath'}));
			paper.project.getItem({name:'userPath'}).clear();
			this.pathArray = [];
		}		
	}

	// moveTraveller 
	this.moveTraveller = function(){
        
        this.setAllUnSelectable();
        
		var path = this.pathArray;
		path.push(this.pathArray[0]);
		var i = path.shift();
		var nodes = this.nodeArray;
		var endPoint = nodes[i].node.position;
		
		var length = 0, travelled = 0, segX = 0, segY = 0, angle, speed = 3;

		this.traveller.icon.onFrame = function(event) {
			if (length <= travelled) {
				this.position = endPoint;	
				i = path.shift();
				if (i != null) {
					travelled = 0;
					endPoint = nodes[i].node.position;
					length = this.position.getDistance(endPoint);
					angle = board.traveller.rotateT(endPoint);

					angle = (angle - 90) * (Math.PI / 180);
					segX = (Math.cos(angle)) * speed;
					segY = (Math.sin(angle)) * speed;

				} else {
					this.rotation = 0;
                    if(count != 9) {
                        board.nextChallenge();
                    } else {
                        this.off('frame');
                        goToResults();
                    }
                    
				}
			}
			travelled += Math.sqrt(Math.pow(segX,2) + Math.pow(segY,2));
			this.position.x = this.position.x + segX;
			this.position.y = this.position.y + segY;
		}
		
	}

	this.setUserPath = function(nodeNum) {
		console.log(nodeNum);
		if(this.pathArray.length == 0) {
			this.pathArray.push(this.activeChallenge[0]);
		} else {

			var lastPointState = this.nodeArray[this.pathArray[this.pathArray.length-1]].icon.data.nodeState;
			if (lastPointState != nodeState.s4){
				this.nodeArray[this.pathArray[this.pathArray.length-1]].icon.data.nodeState = nodeState.s1;
			}
			this.pathArray.push(this.activeNode);
			this.nodeArray[this.activeNode].icon.data.nodeState = nodeState.s3;
			

		}
		this.activeNode = nodeNum;
		this.userPath.addUserPath(this.nodeArray[nodeNum].getCoords());
		this.setSelectables(nodeNum);
	}

	this.stepBackUserPath = function() {
		var nodeNum = this.pathArray.pop();
		this.activeNode = nodeNum;
		this.userPath.removeUserPath();
		if (this.nodeArray[nodeNum].icon.data.nodeState != nodeState.s4) {
			this.nodeArray[nodeNum].icon.data.nodeState = nodeState.s0;
		}
		if (this.pathArray.length > 0) { 
			if (this.nodeArray[this.pathArray[this.pathArray.length-1]].icon.data.nodeState != nodeState.s4) {
				this.nodeArray[this.pathArray[this.pathArray.length-1]].icon.data.nodeState = nodeState.s3;
			}
		}
		this.setSelectables(nodeNum);
	}

	this.isPathComplete = function(){
		var is = true;
		this.activeChallenge.forEach(function(id){
			if(board.pathArray.indexOf(id) < 0) {
				is = false;
			}
		});
		
		return is;
	}
    
    this.nextChallenge = function () {
        if(count == 8) {
            board.setObjectives(challenges[challenges.length-1]);
            count++;
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
                chosen[count] = challenge;
                count++;
                board.setObjectives(challenges[challenge]);
                break;
            }
        }
    }
}

//REMEMBER TO CHANGE THIS TO BE THE CURRENT COURSE!!!!
var goToResults = function() {
    pauseGame();
    board.resetNodesAndPath();
    if(currentUser != null) {
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
                                            "username": currentUser,
                                            "courseID": "1",
                                            "score": {
                                                "min": min.toString(),
                                                "sec": sec.toString(),
                                                "mil": mil.toString()
                                            }} ),
                    type: "POST",
                    contentType: "application/json" 
                });
            }
        });
    } else {
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
                                            "username": "Guest",
                                            "courseID": "1",
                                            "score": {
                                                "min": min.toString(),
                                                "sec": sec.toString(),
                                                "mil": mil.toString()
                                            }} ),
                    type: "POST",
                    contentType: "application/json" 
                });
            }
        });
    }
    document.getElementById("resultScore").innerHTML = (min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec)+'.'+(mil<10?'0'+mil:mil);
    $('#mainPage').attr('style', 'display: none;');
    $('#courseSelect').attr('style', 'display: none;');
    $('#loginPage').attr('style', 'display: none;');
    $('#gameScreen').attr('style', 'display: none;');
    $('#leaderboard').attr('style', 'display: none;');
    $('#profilePage').attr('style', 'display: none;');
    $('#resultsPage').attr('style', 'display: ;');
    stopGame();
}

document.getElementById('course01').onclick = function() {
	board.resetNodesAndPath();
	board.setupBoard(1);
    startCountDown();
    $.ajax({
        type: 'GET',
        url: 'https://api.mlab.com/api/1/databases/kitty_cat_database/collections/Course?q={"courseID":"1"}&apiKey=AMVdmMQFjEHmgWz3ppXtWHqCaOaBm2XB',
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
}

document.getElementById('update').onclick = function() {
	chosen = [];
	count = 0;
    board.setObjectives(challenges[0]);
}

window.onload = function() {
	canvas = document.getElementById('GameBoard');
	paper.setup(canvas);
	board = new GameBoard();
}