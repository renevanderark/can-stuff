export default function(vWidth, vHeight, listeners) {
	const aspectRatio = vHeight / vWidth;

	function invokeListeners(width, height, scale) {
		listeners.forEach(listener =>	listener(scale, width, height));
	}

	function onResize() {
		const { innerWidth, innerHeight } = window;
		if (innerWidth * aspectRatio > innerHeight) {
			invokeListeners(parseInt(Math.floor(innerHeight / aspectRatio), 10), innerHeight, (innerHeight / aspectRatio) / vWidth)
		} else {
			invokeListeners(innerWidth, parseInt(Math.floor(innerWidth * aspectRatio), 10), innerWidth / vWidth)
		}
	}

	onResize();
	window.addEventListener("resize", onResize);
}
