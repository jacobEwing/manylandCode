var speechBuffer = function(){
	this.queue = [];
	this.lastSpoke = 0;
	this.frequency = 1600;
}

speechBuffer.prototype.say = function(speech){
	var parts, n, str;
	var maxLength = 20;

	// Speech output from the user can only be 20 characters or less, so we might
	// need to split it up.  Note that this won't account for strings that have
	// more than twenty characters without a space.
	parts = speech.split(' ');
	str = parts[0];
	for(n = 1; n < parts.length; n++){
		if((str + ' ' + parts[n]).length > maxLength){
			this.queue[this.queue.length] = str;
			str = parts[n];
		}else{
			str += ' ';
			str += parts[n];
		}
	}
	if(str.length > 0){
		this.queue[this.queue.length] = str;
	}
}

speechBuffer.prototype.speak = function(){
	var rval = null;
	var now = new Date().getTime();
	if(this.queue.length > 0){
		if(this.lastSpoke < now - this.frequency){
			this.lastSpoke = now;
			rval = this.queue.shift();
		}
	}
	return rval;
}

var itemList = {};
var speech = new speechBuffer();
var ignoreList = buildIgnoreList();

function update(my) {
	var reaction = {};
	var block, x, y, n, placements;
	var dx, dy, found;

	logFresh();

	for(y = 0; y <= 2 * my.sight.scope; y++){
		for(x = 0; x <= 2 * my.sight.scope; x++){
			block = my.sight.placements[x][y];
			if(!block){
				continue;
			}

			if(block.type != enumType.veryBigThing && block.type != enumType.bigThing && block.type != enumType.dynamic){
				continue;
			}
			if(ignoreList.indexOf(block.name) >= 0){
				log('skipping ' + block.name);
				continue;
			}

			// looks good, now record and count it
			if(itemList[block.id] == undefined){
				itemList[block.id] = {
					name : block.name,
					placements: [
						{
							x : block.x,
							y : block.y
						}
					]
				};
			}else{
				placements = itemList[block.id].placements;
				for(n = 0; n < placements.length; n++){
					if(placements[n].x == block.x && placements[n].y == block.y){
						break;
					}
				}
				if(n >= placements.length){
					// same item, but different place
					speech.say("duplicate found:");
					speech.say(block.name);
					dx = Math.round((block.x - my.x) / 19);
					dy = Math.round((block.y - my.y) / 19);
					speech.say(Math.abs(dx) + ' ' + (dx >= 0 ? 'right' : 'left'));
					speech.say(Math.abs(dy) + ' ' + (dy >= 0 ? 'down' : 'up'));
					itemList[block.id].placements[placements.length] = {
						x : block.x,
						y : block.y
					}

				}
			}
		}
	}

	// now let's check for any additional commands
	for(n in my.hearing){
		if(my.hearing[n].fromId == my.id){
			switch(my.hearing[n].content){
				case ':help': case 'help':
					list_commands();
					break;
				case ':list':
					list_doubles();
					break;
				case ':closest':
					found = find_closest_double(my);
					if(found != undefined){
						speech.say(found.name);
						dx = Math.round((found.x - my.x) / 19);
						dy = Math.round((found.y - my.y) / 19);
						speech.say(Math.abs(dx) + ' ' + (dx >= 0 ? 'right' : 'left'));
						speech.say(Math.abs(dy) + ' ' + (dy >= 0 ? 'down' : 'up'));
					}
					break;
				case ':quit':
					reaction.unequip = true;
					break;
				default:
					break;
			}
			
		}
	}

	reaction.speech = speech.speak();

	return reaction;
}

function list_commands(){
	speech.say('Available Commands:');
	speech.say(':list - describe any duplicates found');
	speech.say(':closest - find the closest duplicate');
	speech.say(':quit - detach this brain');
}

function list_doubles(){
	var id;
	for(id in itemList){
		if(itemList[id].placements.length > 1){
			speech.say(itemList[id].name);
		}
	}
}

function find_closest_double(my){
	var n, placements, id;
	var best = null;
	var dist, minDist = undefined;
	for(id in itemList){
		placements = itemList[id].placements
		if(placements.length > 1){
			for(n in placements){
				dist = squareDist(placements[n], my);
				if(minDist == undefined || dist < minDist){
					minDist = dist;
					best = {
						'name' : itemList[id].name,
						'x' : placements[n].x,
						'y' : placements[n].y
					};
				}
			}
		}
	}
	return best;
}

// returns the square of the hypotenuse, which is sufficient when comparing distances - no need to find its root
function squareDist(p1, p2){
	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function buildIgnoreList(){
	return Array(

		// very big things that are doubled in compositions
		"that funny look",
		"knack's gaze",
		"broos leal",
		"eye close",
		"ear rape",
		"eye",
		"ripple disc",
		"stretchy eyelids",
		"andy's eye is probably screwed",

		// dynamics that are used in the gallery
		"big thing frame",
		"empty centered picture frame",
		"ceiling fan",
		"vertical tile",
		"light test",
		"display win" + "dow"
	);
}
