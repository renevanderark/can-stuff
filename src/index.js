import getFrameRenderer from "./can/frame-renderer";
import getTextRenderer from "./can/text-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";

const VIRT_WIDTH = 1600;
const VIRT_HEIGHT = 900;

const fooLayer = document.getElementById("foo-layer");
const fooLayerCtx = fooLayer.getContext('2d');
const barLayer = document.getElementById("bar-layer");
const barLayerCtx = barLayer.getContext("2d");

const fooFrameRenderer = getFrameRenderer(fooLayerCtx, VIRT_WIDTH, VIRT_HEIGHT);
const barTextRenderer = getTextRenderer(barLayerCtx, VIRT_WIDTH, VIRT_HEIGHT);

const eventListeners = getEventListeners();


let clearText = () => {};
let text = "test", lastText = "";

eventListeners.add("mousemove", (ev, scale) => {
  text = `mousemove at ${Math.round((ev.clientX - ev.target.offsetLeft) / scale)}` +
    ` ${Math.round((ev.clientY - ev.target.offsetTop) / scale)}`;
}, barLayer);


const seconds = {
  clearRect: [0, 0, 0, 0],
  draw(ctx, scale) {
    const dd = new Date();
    const secDeg = (dd.getSeconds() / 60 * 360) * (Math.PI / 180);
    const p1 = [(VIRT_WIDTH / 2) * scale, (VIRT_HEIGHT / 2) * scale];
    const p2 = [
      (VIRT_WIDTH / 2 + Math.cos(secDeg) * 200) * scale,
      (VIRT_HEIGHT / 2 + Math.sin(secDeg) * 200) * scale
    ];
    ctx.beginPath();
    ctx.moveTo(...p1);
    ctx.lineTo(...p2);
    ctx.stroke();
    this.clearRect = [
      p1[0] < p2[0] ? p1[0] - 1 : p2[0] - 1,
      p1[1] < p2[1] ? p1[1] - 1 : p2[1] - 1,
      p1[0] > p2[0] ? p1[0] + 1 : p2[0] + 1,
      p1[1] > p2[1] ? p1[1] + 1 : p2[1] + 1
    ];
  },
  clear(ctx, scale) {
    ctx.clearRect(...this.clearRect);
  },
  updated: true,
  lastSec: -1
};

const renderLoop = () => {
  if (text !== lastText) {
    clearText();
    clearText = barTextRenderer.drawText(text, 5, 50, 40);
    lastText = text;
  }
  fooFrameRenderer.render([seconds]);

	requestAnimationFrame(renderLoop);
};
renderLoop();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barTextRenderer.onResize,
  (s, w, h) => {
    text = `w=${w}, h=${h}, s=${s}, ts=${new Date().getTime()}`;
  }
));
