export default function(ctx) {
	let scale;
	return {
		onResize(s) {
			scale = s;
		},
		drawText(txt, x, y, size, fill, timeout) {
			ctx.font = `bold ${(size || 50) * scale}px sans-serif`;
			ctx.fillStyle = fill || "#fff";
			ctx.fillText(txt, Math.round(x * scale), Math.round(y * scale));
			const doClear = () => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (timeout) {
				setTimeout(doClear, timeout || 500);
			}
			return doClear;
		}
	}
}
