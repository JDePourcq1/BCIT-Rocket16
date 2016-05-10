var inputTable = [
[  80,  60, 0,1,1,0,0,0,0,0,0,0,0,0],
[ 200,  60, 1,0,1,1,0,0,0,0,0,0,0,0],
[ 140, 110, 1,1,0,1,0,0,0,0,0,0,0,0],
[ 266, 110, 0,1,0,0,1,0,1,1,0,0,0,0],
[ 368,  85, 0,0,0,1,0,0,0,1,0,0,0,0],
[  90, 200, 0,0,1,0,0,0,0,0,0,1,0,0],
[ 200, 185, 0,0,1,1,0,0,0,0,0,0,1,0],
[ 335, 170, 0,0,0,1,1,0,0,0,1,0,0,0],
[ 335, 230, 0,0,0,0,0,0,0,1,0,0,1,1],
[ 100, 275, 0,0,0,0,0,1,0,0,0,0,1,0],
[ 240, 300, 0,0,0,0,0,0,1,0,1,1,0,1],
[ 420, 315, 0,0,0,0,0,0,0,0,1,0,1,0]
];

// Node template for symbol
var nodeColor = {
	default: '#4d4d4d',
	red: '#ff1d25',
	blue: '#3fa9f5',
	green: '#7ac943',
	orange: '#ff931e',
	pink: '#ff7bac',
	array: ['#ff1d25', '#3fa9f5', '#7ac943', '#ff931e', '#ff7bac']
};

var nodeIcon = {
	default: 'img/icon_obj_default.png'
}

var nodeArray = [];

var node = new Path.Circle(new Point(0,0), 12.5);
node.style = {
	fillColor: nodeColor.default
}
var nodeSymbol = new Symbol(node);
node.remove();

// Path Styles
var pathStyle = {
	default: {
		strokeColor: '#333333',
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



var setupMap = function() {
	for (i=0; i < inputTable.length; i++) {
		var newNode = nodeSymbol.place();
		newNode.position = new Point(inputTable[i][0],inputTable[i][1]);
		var newNodeIcon = new Raster(nodeIcon.default);
		newNodeIcon.position = new Point(newNode.position);
		newNode.name = 'node';
		newNodeIcon.name = 'icon';
		nodeArray.push(new Group([newNode, newNodeIcon]));
	}

	for (i = 0; i < inputTable.length; i++) {
		for (j = 2; j < inputTable[i].length; j++) {
			if(inputTable[i][j]) {
				var path = new Path.Line(coords(nodeArray[i]),coords(nodeArray[j-2]));
				path.style = pathStyle.default;
				path.insertBelow(nodeArray[0]);
			}
		};
	}

}

var colorNodes = function(num) {
	nodeArray[num].children['node'].fillColor = 'green';
}


setupMap();
colorNodes(3);
colorNodes(0);
colorNodes(6);