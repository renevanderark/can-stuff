import getFrameRenderer from "./can/frame-renderer";
import getTextRenderer from "./can/text-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";

import makeLevel from "./gm/make-level";
import gridMaker from "./gm/grid";
import makePuppet from "./gm/puppet";
import { initGameEvents, clearGameEvents } from "./gm/game-events";
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


let gridKit;
let gm = {walls: []};
let puppet = null;

function startLevel(size = 11, lvl = 1) {
  fooFrameRenderer.clear();
  gridKit = gridMaker(size, VIRT_WIDTH);
  gm = makeLevel(gridKit);
  puppet = makePuppet(gridKit, gm.walls);

  initGameEvents(gm, puppet, gridKit, eventListeners, barLayer, fooLayer,
    () => clearLevel(() => startLevel()), // onGameOver
    () => clearLevel(() => startLevel(size + 2, lvl + 1))  // onSolveLevel
  );
}

function clearLevel(startNextLevel) {
  clearGameEvents(eventListeners);
  puppet = null;
  gm.walls = [];
  startNextLevel();
}

startLevel();

const renderLoop = () => {
  fooFrameRenderer.render([puppet].filter(p => p !== null).concat(gm.walls));
  requestAnimationFrame(renderLoop);
}
renderLoop();
