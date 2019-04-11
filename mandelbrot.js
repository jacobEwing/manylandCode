/******************************************
 Stuff you may want to modify
******************************************/
/*
 The "viewRange" values below are the biggest factor
 in changing what the picture looks like.  These tell
 the program what part of the fractal to render.

 x and y mark the top/left corner of the view area.
 w and h are the width and height of the area rendered.

 As you may see, h (height) is not defined in the object,
 but is copied from w (width).  This is because the output
 will always be square, so w and h should generally be the
 same value, as having different ones will give you a
 squashed view on one axis.

 The full range of view for the entire fractal is from
 (-2, -2) to (2, 2).  So if you want to see the full
 picture, try changing x and y both to -2, and w and h
 both to 4.

 You can zoom in anywhere, but the best places are where
 you see noise.  Those are areas where you can zoom in
 infinitely, finding continuously changing and yet
 repeating patterns.
*/
var viewRange = {
	x : -1.9,
	y : -1.5,
	w : 3
};
viewRange.h = viewRange.w;

/*
 gridSize describes how many blocks should the picture fill
 in it's width and height.  With gridSize set to 1, the
 entire picture will be drawn on a single cell.  If you set
 it to 3, then the cells will be laid out in a 3x3 grid:

  123
  456
  789
*/
var gridSize = 1;

/*
 This function generates each colour in your palette.
 the index of the colour is passed in, and the function
 should return colour object in the usual RGBA format.
*/
function createColour(idx){
	var ang = idx * 2 * Math.PI / (maxColourIndex - 1);
	
	/*
	 Play with these numbers to fiddle with the colours,
	 but remember they have to be between 0 and 255
	 (or 0 and 1 for alpha).
	*/
	return {
		red :   Math.floor(128 + 127 * Math.sin(ang + 6)),
		green : Math.floor(128 + 127 * Math.sin(ang + .5)),
		blue :  Math.floor(128 + 127 * Math.sin(ang)),
		alpha : 1
	};
}
/********************************************
 Everything that you need to change in order
 to modify the output is above this line.
********************************************/

var gridx, gridy;
var resolution;
var creation;

var maxColourIndex = 55;


function change(c) {
	var n;
	creation = c;
	var isChanger = creation.type == enumType.changer;
	if(isChanger){
		// this is to make it easier to see what the whole picture is on the changer
		gridSize = 1;
	}
	
	buildPalette();
	
	checkParams();
	viewRange.w /= gridSize;
	viewRange.h /= gridSize;
	viewRange.x += (gridx - 1) * viewRange.w;
	viewRange.y += (gridy - 1) * viewRange.h;
	
	draw();
	if(isChanger){
		// just to make it clear what this is, add a border if we're editing
		// the changer.
		var cell = creation.cells[0];
		var cIndex = (cell[0][0] + 28) % 56
		for(n = 0; n < 19; n++){
			cell[n][0] = cIndex;
			cell[0][n] = cIndex;
			cell[n][18] = cIndex;
			cell[18][n] = cIndex;
		}
		
	}
	return creation;
}

function checkParams(){
	// we're looking for the co-ordinate in brackets - like (1, 2)
	var parts = creation.name.split('(');
	var foundPos = 0, baseName;
	if(parts.length == 2){
		baseName = parts[0];
		parts = parts[1].split(')');
		if(parts.length == 2){
			parts = parts[0].split(',');
			
			console.log(parts.length);
			if(parts.length == 2){
				gridx = 1 * parts[0];
				gridy = 1 * parts[1];
				gridx = gridx < 1 ? 1 : (gridx > gridSize ? gridSize : gridx);
				gridy = gridy < 1 ? 1 : (gridy > gridSize ? gridSize : gridy);
				foundPos = 1;
			}
		}
	}
	if(foundPos == 1){
		gridx = gridx % gridSize + 1;
		if(gridx == 1){
			gridy = gridy % gridSize + 1;
		}
		creation.name = baseName + '(' + gridx + ',' + gridy + ')';
	}else{
		gridx = 1;
		gridy = 1;
		creation.name += " (1, 1)";
	}
}

function buildPalette(){
	var n;
	creation.colors[maxColourIndex] = {red : 0, green : 0, blue : 0, alpha : 1};	
	for(n = 0; n < maxColourIndex; n++){
		creation.colors[n] = createColour(n);
	}
}

function draw(){
	var x, y, c;
	var cells = creation.cells;
	var x, y, cx, cy;
	
	resolution = {
		x : cells[0].length,
		y : cells[0][0].length
	};

	if(cells.length != 1){
		creation.feedback = "Expecting a one-cell item";
		return creation;
	}

	for (x = 0; x < resolution.x; x++) {
		for (y = 0; y < resolution.y; y++) {
			cells[0][x][y] = colour(
				x, y, viewRange
			);
		}
	}
	return creation;
}

function colour(x, y, viewRange){
	var rval = { red : 0, green : 0, blue : 0, alpha : 1 };
	var accuracy = 512;
	var c = (viewRange.w / resolution.x) * x + viewRange.x;
	var ci = (viewRange.h / resolution.y) * y + viewRange.y;
	var count = 0;
	var z = 0, zi = 0, zsq = 0;
	var zisq = 0, nz = 0, nzi = 0;

	while((count <= accuracy) && ((zsq + zisq) < 4.)){
		nz = zsq - zisq;
		nzi = (z * zi) * 2;
		z = nz + c;
		zi = nzi + ci;
		zsq = z * z;
		zisq = zi * zi;
		count++;
	}
	if(count > accuracy){
		return maxColourIndex;
	}else{
		count %= (maxColourIndex - 1);
		if(count >= 11) count++;
		return count;
	}
}
