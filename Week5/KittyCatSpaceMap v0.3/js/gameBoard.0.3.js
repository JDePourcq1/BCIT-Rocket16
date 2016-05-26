var canvas;
var board;
var chosen = [];
var count = 0;
var challenges = [];
var currentCourse;

//easterEgg
easterEnabled = false;

/**
 * Style data for Node and Path objects
 */
var nodeColor = {
	default: '#9d9d9d',
	red: '#ff1d25',
	blue: '#3fa9f5',
	green: '#7ac943',
	orange: '#ff931e',
	pink: '#ff7bac',
	array: ['#ff1d25', '#3fa9f5', '#7ac943', '#ff931e', '#ff7bac']
};

/**
 * node state enum object
 */
var nodeState = {
	s0: 'default',
	s1: 'selected',
	s2: 'objective',
	s3: 'last',
	s4: 'startPoint'
}

/**
 * node icon url
 */
var nodeIcon = {
	default: 'img/icon_obj_default.png',
	start: 'img/icon_obj_start.png',
	array: ['img/icon_obj_01.png','img/icon_obj_02.png','img/icon_obj_03.png']
}

/**
 * traveller icon url
 */
var travellerIcon = {
	"default": 'img/traveller_rocket.png',
	"1": 'img/traveller_rocket.png',
    "2": 'img/traveller_rocket.png',
    "3": 'img/traveller_rocket.png',
    "4": 'img/traveller_rocket.png',
    "5": 'img/traveller_rocket.png',
    "easter": 'img/easter.png',
	
}


/**
 * style for the paths
 */
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

/**
 * node class
 */
function Node(xpos, ypos, id) {
	this.name = 'node' + id;
	this.selectable = false;
    //the primative shape and colour
	this.node = new paper.Shape.Circle({
		center: [xpos, ypos],
		radius: 12.5,
		fillColor: nodeColor.default
	});
    //the overlaid icon
	this.icon = new paper.Raster({
		data: {
			id: id,
			selectable: false,
			nodeState: nodeState.s0
		},
		source: nodeIcon.default,
		position: [xpos, ypos]
	});

	
	/**
     * gets the coordinates of this node
     * @return Point - the coordinates
     */
	this.getCoords = function() {
		var point = new paper.Point(this.node.position.x, this.node.position.y);
		return point;
	}

    /**
     * sets node as an objective
     * @param start - sets it as the start point or not
     */
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
    
    /**
     * sets the node to selectable or not, adds a glow if it is
     * @param state - the new state of the object
     */
	this.setSelectable = function(state) {
		if (state && this.icon.data.nodeState != nodeState.s1) {
			this.icon.data.selectable = true;
			this.node.style = {
				shadowColor: '#FFEE00',
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
    
    /**
     * resets the node to its default state
     */
	this.resetNode = function() {
		this.node.fillColor = nodeColor.default;
		this.icon.source = nodeIcon.default;
		this.setSelectable(false);
		this.icon.data.nodeState = nodeState.s0
	}

    /**
     * setup the click function for a node
     */
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

//path class
function Path(startPos, endPos) {
	this.line = new paper.Path.Line({
		from: startPos,
		to: endPos,
		strokeColor: pathStyle.default.strokeColor,
		strokeWidth: pathStyle.default.strokeWidth
	});
}

//userpath clas, sets the users path
function UserPath(startPos) {
	this.userLine = new paper.Path.Line({
		segments: [startPos],
		name: 'userPath'
	});
    /**
     * these make sure the user path is below the nodes
     */
	this.userLine.moveBelow(board.nodeArray[0].node);
	this.userLine.style = pathStyle.selected;

    /**
     * not currently used, is to set the line after the traveller moves over it
     */
	this.setUserTravelled = function() {
		this.userLine.style = pathStyle.travelled;
	}

    /**
     * adds a new segment to the path
     */
	this.addUserPath = function(endPos) {
		this.userLine.add(endPos);
		if (this.userLine.segments[0].equals(endPos)) {
			return true;
		} else {
			return false;
		}
	}

    /**
     * deletes the last segment
     */
	this.removeUserPath = function() {
		this.userLine.removeSegment(this.userLine.segments.length-1);
	}
}

/**
 * traveller Object - takes position and node to create it over
 */
function Traveller(posPoint, nodeId) {
	this.icon = new paper.Raster({
        
		source: travellerIcon["default"],
		position: posPoint,
		data: {
			id: nodeId
		}
			});
    
    /**
     * rotates the traveller to be pointing at the given point - returns the rotation in degrees
     */
	this.rotateT = function(endPoint){
		this.icon.rotation = 0;
		this.icon.rotate(
			(Math.atan2(endPoint.y - this.icon.position.y, endPoint.x - this.icon.position.x) * 180 / Math.PI) + 90);
            return this.icon.rotation;
	}
		
    /**
     * adds the final click function to traveller
     */
	this.icon.onClick = function(event) {
        //checks to see if the node below is clickable
		if(board.nodeArray[this.data.id].icon.data.selectable){
            //checks how the button shoud work - if only one user path is set, then it steps back
			if(board.pathArray.length <= 1) {
				board.stepBackUserPath();
			} else {
				board.setUserPath(this.data.id);
                //checks if the user path is complete
				if (board.isPathComplete()) {
					board.moveTraveller();
				} else {
                    //pops an alert and steps back path if not complete
					alert('You missed some objectives.');
					board.stepBackUserPath();
				}
			}
		}
	}
}

/**
 * GameBoard Object - main object that handles the viewable game pieces
 */
function GameBoard() {
	this.nodeArray = [];
	this.pathArray = [];
	this.mapMatrix = [];
	this.activeChallenge = [];
	this.traveller;
	this.userPath = null;
	this.activeNode;

    /**
     * clears and resets the entire game board
     */
	this.resetMap = function() {
		this.nodeArray = [];
		this.pathArray = [];
		this.activeChallenge = [];
		this.traveller = null;
		this.userPath = null;
		this.activeNode = null;
		paper.project.clear();
	}

    /**
     * reads a map matrix as a string and returns it as 2d array
     * @param inputString - the matrix as a string
     */
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

    /**
     * calls for the map matrix with the given level number and sets up the  default nodes and connecting paths.
     * also ensures that the board is centered and at the right zoom factor
     */
	this.setupBoard = function(levelNum) {
        var course = getCourse(levelNum);
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
        centerBoard();
        zoomBoard();
	}

    /**
     * sets the given node surrounding nodes as selectable and resets the others to unselectable
     * @param nodeNum - the node to be changed
     */
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
    
    /**
     * resets all nodes as unselectable
     */
    this.setAllUnSelectable = function() {
		this.nodeArray.forEach(function(node){
			node.setSelectable(false);
		});
	}

    /**
     * takes an array of challenges and sets them as an objective, it sets the first item as the start point.
     * @param objectiveArray - the array of numbers representing the challenge
     */
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

    /**
     * resets all nodes to default and clears the traveller and any user paths
     */
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

	/**
    * moveTraveller
    */
	this.moveTraveller = function(){
        
        this.setAllUnSelectable();
        
		var path = this.pathArray;
		path.push(this.pathArray[0]);
		var i = path.shift();
		var nodes = this.nodeArray;
		var endPoint = nodes[i].node.position;
        
        //total Length of path segment, current distance travelled, X dimension of path, Y dimension of path, anlge of path, speed factor
        var length = 0, travelled = 0, segX = 0, segY = 0, angle, speed = 3;
        
        /**
         * animates the traveller movement
         */
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
                    playerMoving = false;
				}
			}
			travelled += Math.sqrt(Math.pow(segX,2) + Math.pow(segY,2));
            this.position.x = this.position.x + segX;
            this.position.y = this.position.y + segY;
		}
	}

    /**
     * when user clicks a selectable node, this adds it to the pathArray, changes the selectables to the new node and changes node states
     * @param nodeNum - the node to be added
     */
	this.setUserPath = function(nodeNum) {
		console.log(nodeNum);
		if(this.pathArray.length == 0) {
			this.pathArray.push(this.activeChallenge[0]);
		} else {

			var lastPointState = this.nodeArray[this.pathArray[this.pathArray.length-1]].icon.data.nodeState;
			//checks if startpoint
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

    /**
     * steps the user path back to the last selected node.
     */
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

    /**
     * checks that the userpath passes through all of the activechallenge objectives.
     */
	this.isPathComplete = function(){
		var is = true;
		this.activeChallenge.forEach(function(id){
			if(board.pathArray.indexOf(id) < 0) {
				is = false;
			}
		});
		
		return is;
	}
    
    /**
     * setup the next randomish challenge
     */
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

var goToResults = function() {
    pauseGame();
    board.resetNodesAndPath();
    if(currentUser != null) {
        postScore(currentUser, currentCourse, min, sec, mil);
    } else {
        postScore("guest", currentCourse, min, sec, mil)
    }
    document.getElementById("resultScore").innerHTML = (min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec)+'.'+mil;
    $('#mainPage').attr('style', 'display: none;');
    $('#courseSelect').attr('style', 'display: none;');
    $('#loginPage').attr('style', 'display: none;');
    $('#gameScreen').attr('style', 'display: none;');
    $('#leaderboard').attr('style', 'display: none;');
    $('#profilePage').attr('style', 'display: none;');
    $('#resultsPage').attr('style', 'display: ;');
    stopGame();
}

function goToCourse(crsNo) {
    if (!menuOpen) {
        board.resetNodesAndPath();
        board.setupBoard(crsNo);
        startCountDown();
        challenges = getChallenges(crsNo);
        currentCourse = crsNo.toString();
        
        $('#mainPage').attr('style', 'display: none;');
        $('#courseSelect').attr('style', 'display: none;');
        $('#loginPage').attr('style', 'display: none;');
        $('#gameScreen').attr('style', 'display: ;');
        $('#leaderboard').attr('style', 'display: none;');
        $('#profilePage').attr('style', 'display: none;');
        $('#resultsPage').attr('style', 'display: none;');
    }
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

	// this resizes and centers the game board when the canvas is resized
	paper.view.onResize = function(event) {
		centerBoard();
		zoomBoard();
	}
}

/**
 * Center game board to canvas
 */
function centerBoard() {
	paper.project.activeLayer.position = paper.view.center;
}

/**
 * Zooms the game board in relation to the canvas
 */
 function zoomBoard() {
	var lbounds = paper.project.activeLayer.bounds;
	var vbounds = {
		width: document.body.offsetWidth,
		height: document.body.offsetHeight
	};

	var zoomFactorW = (vbounds.width * 0.9) / 480;
	var zoomFactorH = (vbounds.height * 0.9) / 320;

	zoomFactorW <= zoomFactorH ? paper.view.zoom = zoomFactorW : paper.view.zoom = zoomFactorH;
}
