export default (ctx) => {
	let width, height, scale;
	let clearRequested = false;

	return {
		onResize: (w, h, s) => {
			width = w;
			height = h;
			scale = s;
		},
		clear: () => {
			clearRequested = true;
		},
		render: (drawables) => {
			if (clearRequested) {
				ctx.clearRect(0, 0, width, height);
				clearRequested = false;
			} else {
				drawables.filter(d => d.updated)
					.forEach(d => d.clear(ctx, scale));
			}
			drawables.filter(d => d.updated)
				.forEach(d => d.draw(ctx, scale));
		}
	}
}
