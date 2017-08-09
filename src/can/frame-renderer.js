export default function(ctx) {
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
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				clearRequested = false;
			} else {
				drawables.filter(d => d.updated).forEach(d => d.clear(ctx, scale));
			}
			drawables.filter(d => d.updated).forEach(d => d.draw(ctx, scale));
		}
	}
}
