export default function(ctx, can) {
	let scale;
	let clearRequested = false;

	return {
		onResize(s) {
			scale = s;
		},
		clear() {
			clearRequested = true;
		},
		render(drawables) {
			if (clearRequested) {
				ctx.clearRect(0, 0, can.width, can.height);
				clearRequested = false;
			} else {
				drawables.filter(d => d.updated()).forEach(d => d.clear(ctx, scale));
			}
			drawables.filter(d => d.updated()).forEach(d => d.draw(ctx, scale));
		}
	}
}
