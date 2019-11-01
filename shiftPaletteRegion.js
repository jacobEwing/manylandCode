function change(creation){
	var x, y, c, cell;
	var c1 = creation.info.selectedIndex;
	var c2 = creation.info.secondSelectedIndex;

	// ensure we have two distinct non-blank colours selected
	if(c1 == c2}{
		creation.feedback = "Please select two different colours";
		return creation;
	}

	if(c1 == 11 || c2 == 11){
		creation.feedback = "Neither selected colour can be blank";
		return creation;
	}

	// get rid of the erasing colour
	var newColours = creation.colors.slice();
	var eraseColour = newColours.slice(11, 1);

	// fix the colour indecies if they're greater than the number we just chopped out
	if(c1 > 11) c1--;
	if(c2 > 11) c2--;

	// switch them if c1 > c2
	if(c1 > c2){
		c1 += c2;
		c2 = c1 - c2;
		c1 -= c2;
	}

	// cut out the subset between our selected colours
	var setSize = c2 - c1 + 1;
	var subset = newColours.slice(c1, setSize);

	// now shift it
	var shuffle = subset.slice(0, 1);
	subset = subset.concat(shuffle);

	// put the subset back in.
	var args = [c1, 0].concat(subset);
	Array.prototype.splice.apply(newColours, args);

	// put the erasing colour back in
	newColours.splice(11, 0, eraseColour);

	//ok, colours are shuffled, now switch them back in the image
	creation.colors = newColours;

	for(c in creation.cells){
		cell = creation.cells[c];
		for(x = 0; x < cell.length; x++){
			for(y = 0; y < cell[x].length; y++){
				if(cell[x][y]
					for(y = 0; y < cell[x].length; y++){
					}c
			}
		}


