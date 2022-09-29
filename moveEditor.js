var scanInterval;

function createTab(){
	let tabStyle = {
		'display' : 'block',
		'position' : 'absolute',
		'height' : '16px',
		'width' : '48px',
		'background' : '#989898',
		'border': '2px solid rgb(184, 184, 184)',
		'border-width' : '2px 2px 0',
		'border-radius' : '6px 6px 0 0'
	};

	// first, get the editor nodes and make sure we're actually in an editor
	let nodes = [document.getElementById('painter'), document.getElementById('nameInput')];
	if(nodes[0] == null || nodes[1] == null){
		return null;
	}

	// make sure we're not duplicating a tab
	if(document.getElementById('editorDragger') !== null){
		return;
	}

	// build and stylize a tab at the top of the editor to accomodate it
	let button = document.createElement('div');
	Object.assign(button.style, tabStyle);

	let pos = nodes[0].getBoundingClientRect();
	let editorPos = {
		x : pos.x,
		y : pos.y
	};

	button.style.top = (pos.y - 16) + 'px';
	button.style.left = (pos.x + 15) + 'px';

	button.setAttribute('id', 'editorDragger');

	nodes[0].parentNode.appendChild(button);
	nodes[nodes.length] = button;

	// now add event handling.
	button.onmousedown = function(e){
		var lastpoint = {
			x : e.clientX,
			y : e.clientY,
		};
		// disable selection of element contents while we're dragging

		document.onmouseup = function(){
			document.onmouseup = null;
			document.onmousedown = null;
			document.onmousemove = null;

			// need to clear selection as dragging highlights the name field
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else if (document.selection) {
				document.selection.empty();
			}
		}

		document.onmousemove = function(e){
			e.stopPropagation();

			let delta = {
				x : e.clientX - lastpoint.x,
				y : e.clientY - lastpoint.y
			};
			lastpoint = {
				x : e.clientX,
				y : e.clientY,
			};
			for(let node of nodes){
				let pos = node.getBoundingClientRect();
				node.style.left = (pos.x + delta.x) + 'px';
				node.style.top = (pos.y + delta.y) + 'px';
			}

			let pos = nodes[0].getBoundingClientRect();
			editorPos = {
				x : pos.x,
				y : pos.y
			};

		}
	}
	scanInterval = setInterval(function(){
		if(document.getElementById('painter') === null){
			cleanup();
		};

		// check to see if something else has moved the editor div
		let pos = nodes[0].getBoundingClientRect();
		var delta = {
			x : pos.x - editorPos.x,
			y : pos.y - editorPos.y
		}
		if(delta.x != 0 || delta.y != 0){
			// easiest way to account for the window being reset on change of item type
			cleanup();
			setTimeout(createTab, 0);
		}

	}, 60);
}

function cleanup(){
	clearInterval(scanInterval);
	for(let n of document.querySelectorAll('[id="editorDragger"]')){
		n.parentNode.removeChild(n);
	}
}

