import getFrameRenderer from "./can/frame-renderer";
import getTextRenderer from "./can/text-renderer";
import getResizeListeners from "./can/resize-listeners";
import initViewPort from "./can/viewport";
import getEventListeners from "./can/event-listeners";

import makeLevel from "./gm/make-level";
import gridMaker from "./gm/grid";
import makePuppet from "./gm/puppet";
import makeThoughtCloud from "./gm/thought-cloud";
import { initGameEvents, clearGameEvents } from "./gm/game-events";
const VIRT_WIDTH = 1000;
const VIRT_HEIGHT = 1000;

const fooLayer = document.getElementById("foo-layer");
const barLayer = document.getElementById("bar-layer");

const fooFrameRenderer = getFrameRenderer(fooLayer.getContext('2d'), fooLayer);
const barFrameRenderer = getFrameRenderer(barLayer.getContext('2d'), barLayer);
const barTextRenderer = getTextRenderer(barLayer.getContext("2d"), barLayer);

const eventListeners = getEventListeners();

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barTextRenderer.onResize,
  barFrameRenderer.onResize
));


let gridKit;
let gm = {walls: []};
let puppet = null;
let thoughtCloud = makeThoughtCloud(VIRT_WIDTH);

function startLevel(size = 11, lvl = 1) {
  fooFrameRenderer.clear();
  gridKit = gridMaker(size, VIRT_WIDTH);
  gm = makeLevel(gridKit);
  puppet = makePuppet(gridKit, gm.walls);
  thoughtCloud.followPuppet(...gridKit.getVirtPos(puppet.getPos()));

  initGameEvents(gm, puppet, gridKit, eventListeners, barLayer, fooLayer, thoughtCloud,
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
  barFrameRenderer.render([thoughtCloud]);
  requestAnimationFrame(renderLoop);
}
renderLoop();
