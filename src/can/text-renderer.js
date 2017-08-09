export default (ctx) => {
	let scale;
	let activeMessage = null;

	const drawText = (txt, {x = 50, y = 50, size = 50, timeout = null, fill = null, font = null, shade = false, shadeDistance = null}) => {
		if (timeout === null) {
			activeMessage = {
				txt: txt, x: x, y: y, fill: fill, font: font, shade: shade, shadeDistance: shadeDistance
			};
		}
		const _x = parseInt(Math.ceil(x * scale), 10);
		const _y = parseInt(Math.ceil(y * scale), 10);
		ctx.font = font || `bold ${size * scale}px sans-serif`;
		if (shade) {
			ctx.fillStyle = shade;
			ctx.fillText(txt, _x + (shadeDistance || 2), _y + (shadeDistance || 2));
		}
		ctx.fillStyle = fill || "#a00";
		ctx.fillText(txt, _x, _y);

		const doClear = () => {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			activeMessage = null;
		};

		if (timeout) {
			setTimeout(doClear, timeout || 500);
		}
		return doClear;
	};

	return {
		onResize: (w, h, s) => {
			scale = s;
		},
		drawText: drawText,
		redrawText: () => {
			if (activeMessage) {
				drawText(activeMessage.txt, activeMessage);
			}
		}
	}
}
