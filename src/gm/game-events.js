import { gameOverThought, salvationThought, strayThought } from "./thoughts";

function initGameEvents(gm, puppet, gridKit, eventListeners, barLayer, fooLayer, thoughtCloud,
   onGameOver, onSolveLevel) {

  let idleSecs = 0;
  let strayThoughtInterval = setInterval(() => {
     idleSecs++;
     if (idleSecs >= 10 && !thoughtCloud.isVisible()) {
       thoughtCloud.setTrainOfThoughtAndAppear(strayThought());
       idleSecs = 0;
     }
  }, 1000);


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
        w.rotate(gridKit.gridSpaceIsFree(gm.walls, wIdx));
      });

    if (!gridKit.gridSpaceIsFree(gm.walls, -1)(puppet.getPos())) {
      thoughtCloud.setTrainOfThoughtAndAppear([gameOverThought()]);
      clearInterval(strayThoughtInterval);
      eventListeners.clear();

      window.setTimeout(onGameOver, 2500);
    }

  }, barLayer);

  eventListeners.add("contextmenu", (ev, scale) => {
    gm.walls
      .filter(w => w.isAt(
        ev.clientX - ev.target.offsetLeft,
        ev.clientY - ev.target.offsetTop,
        scale
      ))
      .forEach(w => w.movePivot());

      return ev.preventDefault();
  })

  eventListeners.add("keypress", (ev, scale) => {
    idleSecs = 0;
    thoughtCloud.disappear();
    switch (ev.keyCode) {
      case 37: puppet.move(-1, 0); break;
      case 38: puppet.move(0, -1); break;
      case 39: puppet.move(1, 0); break;
      case 40: puppet.move(0, 1); break;
    }

    thoughtCloud.followPuppet(...gridKit.getVirtPos(puppet.getPos()));
    if (gridKit.getX(puppet.getPos()) === 0 || gridKit.getY(puppet.getPos()) === 0 ||
        gridKit.getX(puppet.getPos()) === gridKit.SIZE - 1 || gridKit.getY(puppet.getPos()) === gridKit.SIZE - 1) {

      clearInterval(strayThoughtInterval);
      eventListeners.clear();

      thoughtCloud.setTrainOfThoughtAndAppear([salvationThought()]);
      window.setTimeout(onSolveLevel, 1000);
    }

  });
}


export { initGameEvents }
