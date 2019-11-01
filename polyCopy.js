function change(creation){
	var n, x, y, sourcePoints, targetPoints;
	var cell = creation.cells[0];
	var width = cell.length;
	var height = cell[0].length;

	sourcePoints = [
		{x : 0, y : 0},
		{x : width - 1, y : 0},
		{x : width - 1, y : height - 1},
		{x : 0, y : height - 1}
	];

	targetPoints = [
		{x : width >> 1, y : 0},
		{x : width - 1, y : height >> 1},
		{x : width >> 1, y : height - 1},
		{x : 0, y : height >> 1}
	];

	copyTexturePoly(cell, targetPoints, cell, sourcePoints);
	return creation;
}

// copies the contents of a source polygon into a target polygon
function copyTexturePoly(target, destpoint, source, sourcepoint){

	var done = 0;
	var minpoint, current_pointnum = [], n;
	var t_deltax = [], t_deltay = [];
	var t_sgndeltax = [], t_sgndeltay = [];
	var t_deltaxabs = [], t_deltayabs = [], t_deltax_tally = [];
	var t_lastcornerx = [], t_lastcornery = [], t_nextcornerx = [], t_nextcornery = [];
	var t_borderx = [], t_bordery = [];
	var s_deltax = [], s_deltay = [];
	var s_sgndeltax = [], s_sgndeltay = [];
	var s_deltaxabs = [], s_deltayabs = [], s_deltax_tally = [], s_deltay_tally = [];
	var s_lastcornerx = [], s_lastcornery = [], s_nextcornerx = [], s_nextcornery = [];
	var s_borderx = [], s_bordery = [];

	var rval = 0;
	var numpoints = destpoint.length;
	source = cloneObject(source);
	if(numpoints != sourcepoint.length || numpoints <= 2){
		return rval;
	}

	/***** find the starting point ******/
	minpoint = 0;
	for(n = 1; n < numpoints; n++){
		if(destpoint[n].y < destpoint[minpoint].y){
			minpoint = n;
		}
	}

	/******** initialize the starting points *********/
	for(n = 0; n < 2; n++){
		t_lastcornerx[n] = destpoint[minpoint].x;
		t_lastcornery[n] = destpoint[minpoint].y;
		s_lastcornerx[n] = sourcepoint[minpoint].x;
		s_lastcornery[n] = sourcepoint[minpoint].y;

		current_pointnum[n] = minpoint - (n << 1) + 1;
		if(current_pointnum[n] < 0) current_pointnum[n] += numpoints;
		else current_pointnum[n] %= numpoints;


		t_nextcornerx[n] = destpoint[current_pointnum[n]].x;
		t_nextcornery[n] = destpoint[current_pointnum[n]].y;
		s_nextcornerx[n] = sourcepoint[current_pointnum[n]].x;
		s_nextcornery[n] = sourcepoint[current_pointnum[n]].y;

		t_deltax[n] = t_nextcornerx[n] - t_lastcornerx[n];
		t_deltay[n] = t_nextcornery[n] - t_lastcornery[n];
		s_deltax[n] = s_nextcornerx[n] - s_lastcornerx[n];
		s_deltay[n] = s_nextcornery[n] - s_lastcornery[n];
		t_deltaxabs[n] = Math.abs(t_deltax[n]);
		t_deltayabs[n] = Math.abs(t_deltay[n]);
		s_deltaxabs[n] = Math.abs(s_deltax[n]);
		s_deltayabs[n] = Math.abs(s_deltay[n]);
		t_sgndeltax[n] = Math.sign(t_deltax[n]);
		t_sgndeltay[n] = Math.sign(t_deltay[n]);
		s_sgndeltax[n] = Math.sign(s_deltax[n]);
		s_sgndeltay[n] = Math.sign(s_deltay[n]);
		t_deltax_tally[n] = t_deltayabs[n] >> 1;
		s_deltax_tally[n] = 0;//t_deltayabs[n] >> 1;
		s_deltay_tally[n] = 0;//t_deltayabs[n] >> 1;
		t_borderx[n] = t_lastcornerx[n];
		t_bordery[n] = t_lastcornery[n];
		s_borderx[n] = s_lastcornerx[n];
		s_bordery[n] = s_lastcornery[n];
	}

	/******** draw the polygon *********/
	while(!done){
		copy_dline_to_hline(target, t_borderx[0], t_borderx[1], t_bordery[0], source,
					s_borderx[0], s_bordery[0], s_borderx[1], s_bordery[1]);
		for(n = 0; n < 2; n++){
			if(t_bordery[n] == t_nextcornery[n]){
				if(t_nextcornery[0] == t_nextcornery[1] && t_nextcornerx[0] == t_nextcornerx[1]){
					done = 1;
				}else{
					t_lastcornerx[n] = t_nextcornerx[n];
					t_lastcornery[n] = t_nextcornery[n];
					s_lastcornerx[n] = s_nextcornerx[n];
					s_lastcornery[n] = s_nextcornery[n];

					current_pointnum[n] = current_pointnum[n] - (n << 1) + 1;
					if(current_pointnum[n] < 0) current_pointnum[n] += numpoints;
					else current_pointnum[n] %= numpoints;

					t_nextcornerx[n] = destpoint[current_pointnum[n]].x;
					t_nextcornery[n] = destpoint[current_pointnum[n]].y;
					s_nextcornerx[n] = sourcepoint[current_pointnum[n]].x;
					s_nextcornery[n] = sourcepoint[current_pointnum[n]].y;

					t_deltax[n] = t_nextcornerx[n] - t_lastcornerx[n];
					t_deltay[n] = t_nextcornery[n] - t_lastcornery[n];
					s_deltax[n] = s_nextcornerx[n] - s_lastcornerx[n];
					s_deltay[n] = s_nextcornery[n] - s_lastcornery[n];

					t_deltaxabs[n] = Math.abs(t_deltax[n]);
					t_deltayabs[n] = Math.abs(t_deltay[n]);
					s_deltaxabs[n] = Math.abs(s_deltax[n]);
					s_deltayabs[n] = Math.abs(s_deltay[n]);

					t_sgndeltax[n] = Math.sign(t_deltax[n]);
					t_sgndeltay[n] = Math.sign(t_deltay[n]);
					s_sgndeltax[n] = Math.sign(s_deltax[n]);
					s_sgndeltay[n] = Math.sign(s_deltay[n]);

					t_deltax_tally[n] = t_deltayabs[n] >> 1;
					s_deltax_tally[n] = t_deltayabs[n] >> 1;
					s_deltay_tally[n] = t_deltayabs[n] >> 1;

					t_borderx[n] = t_lastcornerx[n];
					t_bordery[n] = t_lastcornery[n];
					s_borderx[n] = s_lastcornerx[n];
					s_bordery[n] = s_lastcornery[n];
				}
			}

			t_deltax_tally[n] += t_deltaxabs[n];
			while(t_deltax_tally[n] >= t_deltayabs[n]){
				t_deltax_tally[n] -= t_deltayabs[n] + (t_deltayabs[n] == 0 ? 1 : 0);
				t_borderx[n] += t_sgndeltax[n];
			}
			s_deltax_tally[n] += s_deltaxabs[n];
			while(s_deltax_tally[n] >= t_deltayabs[n]){
				s_deltax_tally[n] -= t_deltayabs[n] + (t_deltayabs[n] == 0 ? 1 : 0);
				s_borderx[n] += s_sgndeltax[n];
			}
			s_deltay_tally[n] += s_deltayabs[n];
			while(s_deltay_tally[n] >= t_deltayabs[n]){
				s_deltay_tally[n] -= t_deltayabs[n] + (t_deltayabs[n] == 0 ? 1 : 0);
				s_bordery[n] += s_sgndeltay[n];
			}

			t_bordery[n] += t_sgndeltay[n];
		}
	}
}

// copies pixels from an arbitrary line to a horizontal line
function copy_dline_to_hline(target, drawx1, drawx2, drawy, source, sx1, sy1, sx2, sy2){

	var hdelta, xtally = 0, ytally = 0, drawx, readx, ready, sgnhdelta;
	var deltax, deltay, sgndeltax, sgndeltay, absdeltax, absdeltay;
	readx = sx1;
	ready = sy1;
	hdelta = drawx2 - drawx1;
	if(hdelta < 0){
		hdelta *= -1;
		sgnhdelta = -1;
	}else{
		sgnhdelta = 1;
	}
	hdelta++;
	drawx = drawx1;
	deltax = sx2 - sx1;
	deltay = sy2 - sy1;
	absdeltax = Math.abs(deltax);
	absdeltay = Math.abs(deltay);
	sgndeltax = Math.sign(deltax);
	sgndeltay = Math.sign(deltay);
	for(drawx = drawx1; drawx != drawx2; drawx += sgnhdelta){
		xtally += absdeltax;
		ytally += absdeltay;
		while(xtally > hdelta){
			xtally -= hdelta;
			readx += sgndeltax;
		}
		while(ytally > hdelta){
			ytally -= hdelta;
			ready += sgndeltay;
		}
		if(
			drawx >= 0 &&
			drawx < target.length &&
			drawy >= 0 &&
			drawy < target[0].length
		){
			target[drawx][drawy] = source[readx][ready];
		}
	}
}
