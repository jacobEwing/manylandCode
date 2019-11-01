var scribe = function(creation){
	this.font = null;
	this.align;
	this.position = {x : 0, y : 0};
	this.activeCell = 0;
	this.creation = creation;
	this.colour = 0;
};

scribe.prototype.setColour = function(c){
	c  = Math.round(1 * c);
	if(c >= 0 && c <= 55){
		this.colour = c;
	}
}

scribe.prototype.setCell = function(idx){
	idx = Math.round(1 * idx);
	if(idx >= 0 || idx < this.creation.cells.length){
		this.activeCell = idx;
	}
}

scribe.prototype.drawLetter = function(character, x, y, cellindex){
	var n, drawx, drawy;
	if(x == undefined) x = this.position.x;
	if(y == undefined) y = this.position.y;
	if(cellindex == undefined) cellindex = this.creation.info.selectedCell;

	if(this.font.letters[character] == undefined){
		character = ' ';
	}
	var fontDat = this.font.letters[character];

	
	for(n = 0; n < this.font.letters[character].length; n++){
		if(fontDat[n]){
			drawx = x + (n % this.font.charWidth);
			drawy = y + Math.floor(n / this.font.charWidth);
			if(drawx >= 0 && drawx < this.creation.cells[cellindex].length){
				if(drawy >= 0 && drawy < this.creation.cells[cellindex][drawx].length){
					console.log('drawing pixel @ (' + drawx + ', ' + drawy + ')');
					this.creation.cells[cellindex][drawx][drawy] = this.colour;
				}
			}
		}
	}
}

scribe.prototype.write = function(text){
	if(text == undefined) return;
	var n;

	for(n = 0; n < text.length; n++){
		this.drawLetter(text[n]);
		this.position.x += this.font.charWidth + this.font.characterMargin;
	}
}

scribe.prototype.setFont = function(fontName){
	// this could be a one-liner at the moment, but I'd like to add more fonts
	switch(fontName){
		case 'simple':
		default:
			this.font = this.buildSimpleFont();
			break;
	}
}

scribe.prototype.setPosition = function(x, y){
	this.position = {
		x : 1 * x,
		y : 1 * y
	}
}

scribe.prototype.buildSimpleFont = function(){
	var rval = {
		charWidth : 3,
		charHeight : 5,
		topMargin: 1,
		bottomMargin: 1,
		characterMargin: 1
	};

	rval.letters = {
		' ' : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		'a' : [ 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
		'b' : [ 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
		'c' : [ 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1],
		'd' : [ 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
		'e' : [ 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1],
		'f' : [ 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
		'g' : [ 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
		'h' : [ 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
		'i' : [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
		'j' : [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
		'k' : [ 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
		'l' : [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
		'm' : [ 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
		'n' : [ 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
		'o' : [ 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
		'p' : [ 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0],
		'q' : [ 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
		'r' : [ 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
		's' : [ 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
		't' : [ 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
		'u' : [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
		'v' : [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
		'w' : [ 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
		'x' : [ 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
		'y' : [ 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
		'z' : [ 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
		'0' : [ 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
		'1' : [ 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
		'2' : [ 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
		'3' : [ 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
		'4' : [ 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
		'5' : [ 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
		'6' : [ 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
		'7' : [ 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
		'8' : [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
		'9' : [ 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0],
		',' : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
		'.' : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
		':' : [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
		'"' : [ 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		"'" : [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	};

	// duplicate the lower case letters above as capitals also.
	var capsDelta = "a".charCodeAt(0) - "A".charCodeAt(0);
	for(var n = "A".charCodeAt(0); n <= "Z".charCodeAt(0); n++){
		rval.letters[String.fromCharCode(n)] = rval.letters[String.fromCharCode(n + capsDelta)];
		
	}


	return rval;
}


function change(creation){
	var writer = new scribe(creation);
	writer.setFont('simple');
	writer.setCell(0);
	writer.setPosition(1, 1);
	writer.write("Hi eh!");
	return creation;
}

