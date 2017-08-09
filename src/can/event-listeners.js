export default () => {
	let scale;
	let registered = [];

	return {
		onResize: (w, h, s) => {
			scale = s;
		},
		add: (eventName, onEvent, elem = window) => {
			const fn = ev => onEvent(eventName, ev, scale);

			registered.push({
				elem: elem,
				eventName:
				eventName,
				fn: fn
			});

			elem.addEventListener(eventName, fn);
		},
		clear: () => {
			registered.forEach(({elem, eventName, fn}) =>
				elem.removeEventListener(eventName, fn)
			)
		}
	}

};
