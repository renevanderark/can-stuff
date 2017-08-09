export default (canvases, ...listeners) => {
	function rescaleGame(width, height) {
		canvases.forEach(canvas => {
			canvas.style.left = parseInt(Math.floor((window.innerWidth - width) / 2), 10);
			canvas.style.top = parseInt(Math.floor((window.innerHeight - height) / 2), 10);
			canvas.width = width;
			canvas.height = height;
		});
	}

	return [rescaleGame].concat(listeners);
};
