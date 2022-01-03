var itemList = []; 
var placements = {};
const blockSize = 19;
console.log('Say "listitems" to show on console');
var center = null;
var tally = 0;
var row, transformation;
function update(my) {
	var n, x, y;
	var item, idx;
	var placement;
	var mapx, mapy;
	if(center == null){
		center = {x : Math.round(my.x / blockSize) - 16, y : Math.round(my.y / blockSize) - 16};
	}

	// loop through all placements in our viewrange
	for(x = 0; x < 2 * my.sight.scope; x++){
	    for(y = 0; y < 2 * my.sight.scope; y++){
		item = my.sight.placements[x][y];

		if(item != undefined){
			mapx = item.x / blockSize;
			mapy = item.y / blockSize;
			if(placements[mapx] == undefined){
				placements[mapx] = {};
			}else if(placements[mapx][mapy] != undefined){
				continue;
			}



			// get the id and store it if we haven't already
			idx = itemList.indexOf(item.id);
			if(idx == -1){
				idx = itemList.length;
				itemList[idx] = item.id;
			}

			row = [idx];

			// check for transformations
			transformation = item.rotation == undefined ? 0 : Math.floor(item.rotation / 90);
			transformation += item.isFlipped ? 4 : 0;
			if(transformation != 0){
				row[row.length] = transformation;
			}

			// record the placement
			placements[mapx][mapy] = row.join(',');

		}
	    }
	}

	// check whether we said the command "listitems"
	for(n in my.hearing){
		if(my.hearing[n].fromId == my.id){
			if(my.hearing[n].content == 'listitems'){
				// display a list of items and placements that we've seen
				listItems();
				break;
			}
		}
	}
}

function listItems(){
	var n, m;
	var output = '\n\n//============ item ids ===========\n';
	output += "var itemList = ['";
	output += itemList.join("', '");
	output += "'];";

	output += '\n\n//============ placements ============\n';

	output += 'var blocks = ' + JSON.stringify(placements) + ';\n';
	output += 'var offset = {x : ' + center.x + ', y : ' + center.y + '};\n';
	console.log(output);
}
