import getFrameRenderer from "./can/frame-renderer";
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
const bazLayer = document.getElementById("baz-layer");
const scores = document.getElementById("scores");

const fooFrameRenderer = getFrameRenderer(fooLayer.getContext('2d'), fooLayer);
const barFrameRenderer = getFrameRenderer(barLayer.getContext('2d'), barLayer);
const bazFrameRenderer = getFrameRenderer(bazLayer.getContext('2d'), barLayer);
const eventListeners = getEventListeners();

let gridKit;
let gm = {walls: []};
let puppet = null;
let thoughtCloud = makeThoughtCloud(VIRT_WIDTH);
let isWelcome = true;
let moves = 0;

const getHighScores = () => JSON.parse(localStorage.getItem("high-scores") || "[]");
console.log(getHighScores());

initViewPort(VIRT_WIDTH, VIRT_HEIGHT, getResizeListeners([fooLayer, barLayer, bazLayer],
  eventListeners.onResize,
  fooFrameRenderer.onResize,
  barFrameRenderer.onResize,
  bazFrameRenderer.onResize,
  () => [puppet].filter(p => p !== null).concat(thoughtCloud).concat(gm.walls).forEach(d => d.forceUpdate()),
  (s, w, h) => {
    const { innerWidth, innerHeight } = window;
    if (innerWidth >= innerHeight) {
      scores.style.left = w;
      scores.style.width = innerWidth - w;
      scores.style.height = h;
      scores.style.top = 0;
    } else {
      scores.style.width = w;
      scores.style.top = h;
      scores.style.height = innerHeight - h;
      scores.style.left = 0;
    }
  }
));

setInterval(
  () => gm.walls.forEach(w => w.animateRotation(bazFrameRenderer.clear)),
  2
)

function startLevel(siz = 11, lvl = 1) {
  const size = siz > 51 ? 51 : siz;
  moves = lvl === 1 ? 0 : moves;
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("level").innerHTML = lvl;
  fooFrameRenderer.clear();
  bazFrameRenderer.clear();
  gridKit = gridMaker(size, VIRT_WIDTH);
  gm = makeLevel(gridKit);
  puppet = makePuppet(gridKit, gm.walls);
  thoughtCloud.followPuppet(...gridKit.getVirtPos(puppet.getPos()));
  if (isWelcome) {
    thoughtCloud.setTrainOfThoughtAndAppear([
      "Welcome to my confused mind!",
      "I have to find a way out of here!",
      "Use the arrow keys to move me around...",
      "left click to rotate my brain barriers...",
      "and right click to move the rotation point...",
      "of a brain barrier.",
      "Press any key to suppress my thought bubble...",
      "Be careful not to squash me!"
    ]);
    isWelcome = false;
  }
  initGameEvents(gm, puppet, gridKit, eventListeners, barLayer, fooLayer, thoughtCloud,
    () => clearLevel(() => startLevel()), // onGameOver
    () => clearLevel(() => startLevel(size + 2, lvl + 1)),  // onSolveLevel
    () => { document.getElementById("moves").innerHTML =  ++moves; }
  );
}

function clearLevel(startNextLevel) {
  puppet = null;
  gm.walls = [];
  startNextLevel();
}

startLevel();

const renderLoop = () => {
  fooFrameRenderer.render([puppet]
    .filter(p => p !== null)
    .concat(gm.walls.filter(w => !w.isAnimating())));
  barFrameRenderer.render([thoughtCloud]);
  bazFrameRenderer.render(gm.walls.filter(w => w.isAnimating()));
  requestAnimationFrame(renderLoop);
}
renderLoop();
