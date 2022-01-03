 // This generator reads data output by the "copy map" brain.  The data output by
 // that brain should be copied and pasted in this blank area:







function generate(data) {
	var placements = [], params;
	var readx, ready, item;

	for (var i = 0; i < data.sectors.length; i++) {
		var sector = data.sectors[i];
		for (var x = sector.x1; x <= sector.x2; x++) {
			readx = x + offset.x;
			if(blocks[readx] == undefined) continue;
			for (var y = sector.y1; y <= sector.y2; y++) {
				ready = y + offset.y;
				if(blocks[readx][ready] == undefined) continue;

				params = blocks[readx][ready].split(',').map(function(item) { return parseInt(item, 10); });


				item = {id: itemList[params[0]], x: x, y: y};
				if(params[1] != undefined){
					item.rotation = params[1] & 3;
                                        item.flip = (params[1] & 4) != 0 ? 1 : 0;
				}

				placements.push(item);
			}
		}
	}
	
	return {placements: placements};
}

