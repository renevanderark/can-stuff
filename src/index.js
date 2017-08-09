import getFrameRenderer from "./can/frame-renderer";
import getTextRenderer from "./can/text-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";

const VIRT_WIDTH = 1600;
const VIRT_HEIGHT = 900;

const fooLayer = document.getElementById("foo-layer");
const barLayer = document.getElementById("bar-layer");

const fooFrameRenderer = getFrameRenderer(fooLayer.getContext('2d'), fooLayer);
const barTextRenderer = getTextRenderer(barLayer.getContext("2d"), barLayer);

const eventListeners = getEventListeners();


let clearText = () => {};
let text = "test", lastText = "";

eventListeners.add("mousemove", (ev, scale) => {
  text = `mousemove at ${Math.round((ev.clientX - ev.target.offsetLeft) / scale)}` +
    ` ${Math.round((ev.clientY - ev.target.offsetTop) / scale)}`;
}, barLayer);



const makeClock = () => {
  let lastSec = -1, forcedUpdate = true;

  return {
    draw(ctx, scale) {
      const dd = new Date();
      const secDeg = (dd.getSeconds() / 60 * 360) * (Math.PI / 180);
      ctx.beginPath();
      ctx.moveTo((VIRT_WIDTH / 2) * scale, (VIRT_HEIGHT / 2) * scale);
      ctx.lineTo(
        (VIRT_WIDTH / 2 + Math.cos(secDeg) * 200) * scale,
        (VIRT_HEIGHT / 2 + Math.sin(secDeg) * 200) * scale);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc((VIRT_WIDTH / 2) * scale, (VIRT_HEIGHT / 2) * scale, 200 * scale,  0, 2 * Math.PI, false);
      ctx.stroke();
      lastSec = dd.getSeconds();
      forcedUpdate = false;
    },
    clear(ctx, scale) {
      ctx.clearRect(
        (VIRT_WIDTH / 2 - 200) * scale,
        (VIRT_HEIGHT / 2 - 200) * scale,
        400 * scale,
        400 * scale
      );
    },
    forceUpdate() { forcedUpdate = true; },
    updated: () =>
      forcedUpdate || lastSec !== new Date().getSeconds()
  }
};

const clock = makeClock();

const renderLoop = () => {
  if (text !== lastText) {
    clearText();
    clearText = barTextRenderer.drawText(text, 5, 50, 40);
    lastText = text;
  }
  fooFrameRenderer.render([clock]);

	requestAnimationFrame(renderLoop);
};
renderLoop();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barTextRenderer.onResize,
  (s, w, h) => {
    clock.forceUpdate();
    text = `w=${w}, h=${h}, s=${s}, ts=${new Date().getTime()}`;
  }
));
