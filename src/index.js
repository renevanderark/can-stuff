import getFrameRenderer from "./can/frame-renderer";
import getTextRenderer from "./can/text-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";

import makeLevel from "./gm/make-level";
import gridMaker from "./gm/grid";

const VIRT_WIDTH = 1000;
const VIRT_HEIGHT = 1000;

const fooLayer = document.getElementById("foo-layer");
const barLayer = document.getElementById("bar-layer");

const fooFrameRenderer = getFrameRenderer(fooLayer.getContext('2d'), fooLayer);
const barTextRenderer = getTextRenderer(barLayer.getContext("2d"), barLayer);

const eventListeners = getEventListeners();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barTextRenderer.onResize
));

const gridKit = gridMaker(21, VIRT_WIDTH);
const gm = makeLevel(gridKit);

const makePuppet = () => {
  const { getP, getScreenPos, getGridSize, SIZE, getRect, getX, getY } = gridKit;
  let pos = getP((SIZE - 1) / 2, (SIZE - 1) / 2)

  return {
    move(x, y) {
      let newPos = getP(getX(pos) + x, getY(pos) + y);
      if (newPos > -1 && gridKit.gridSpaceIsFree(gm.walls, -1)(newPos)) {
        pos = newPos;
      }
    },
    draw(ctx, scale) {
      ctx.beginPath()
      ctx.arc(...getScreenPos(pos, scale), getGridSize(scale) / 6, 0, 2 * Math.PI, false);
      ctx.fill();
    },
    clear(ctx, scale) {
      ctx.clearRect(...getRect(pos, scale));
    },
    updated: () => true
  }
}

const puppet = makePuppet();

const renderLoop = () => {
  fooFrameRenderer.render(gm.walls.concat(puppet));
  requestAnimationFrame(renderLoop);
}
renderLoop();



eventListeners.add("click", (ev, scale) => {
  gm.walls
    .map((w, wIdx) => ({w: w, wIdx: wIdx}))
    .filter(({w}) => w.isAt(
      ev.clientX - ev.target.offsetLeft,
      ev.clientY - ev.target.offsetTop,
      scale
    ))
    .forEach(({w, wIdx}) => {
      w.clear(fooLayer.getContext('2d'), scale);
      w.rotate(gridKit.gridSpaceIsFree(gm.walls, wIdx))
    });
}, barLayer);

eventListeners.add("keypress", (ev, scale) => {
  puppet.clear(fooLayer.getContext('2d'), scale);

  switch (ev.keyCode) {
    case 37: puppet.move(-1, 0); break;
    case 38: puppet.move(0, -1); break;
    case 39: puppet.move(1, 0); break;
    case 40: puppet.move(0, 1); break;
  }
});



/* ANT
fooLayer.style.backgroundImage = "url(http://www.allwhitebackground.com/images/2/2297.jpg)";
fooLayer.style.backgroundSize = "cover";
const makeAnt = () => {
  let forcedUpdate = false;
  const size = 1;
  return {

    drawSegment(ctx, trans, rot, flatten) {
      ctx.save();
      ctx.rotate(rot * Math.PI / 180);
      ctx.translate(...trans);
      ctx.beginPath();
      ctx.scale(...flatten);
      ctx.arc(90, 0, 80,  0, 2 * Math.PI, false);
      ctx.fill();
      ctx.restore();
    },
    draw(ctx, scale) {
      ctx.fillStyle = "rgba(0,255,255,0.5)";
      ctx.save();
      ctx.translate(730 * scale, 520 * scale);
      ctx.scale(scale * size, scale * size);
      this.drawSegment(ctx, [-260,0], 310, [1.6, 1]);
      this.drawSegment(ctx, [0,0], 10, [1.5, 0.9]);
      this.drawSegment(ctx, [230,0], 8, [0.7, 0.9]);
      this.drawSegment(ctx, [330,0], 0, [0.4, 0.4]);
      this.drawSegment(ctx, [360, -40], 0, [2.5, 1.5]);
      ctx.restore();
      forcedUpdate = false;
    },
    clear(ctx, scale) {

    },
    forceUpdate() { forcedUpdate = true; },
    updated: () => forcedUpdate
  }
};

const ant = makeAnt();

const renderLoop = () => {
  fooFrameRenderer.render([ant]);

	requestAnimationFrame(renderLoop);
};
renderLoop();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barTextRenderer.onResize,
  () => ant.forceUpdate()
));
*/
/* CLOCK
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
*/
