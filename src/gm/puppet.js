export default (gridKit, walls) => {
  const { getP, getScreenPos, getGridSize, SIZE, getRect, getX, getY } = gridKit;
  let pos = getP((SIZE - 1) / 2, (SIZE - 1) / 2);
  let lastPos = pos;
  let updated = true;
  return {
    getPos: () => pos,
    move(x, y) {
      let newPos = getP(getX(pos) + x, getY(pos) + y);
      lastPos = pos;
      if (newPos > -1 && gridKit.gridSpaceIsFree(walls, -1)(newPos)) {
        pos = newPos;
      }
      updated = true;
    },
    draw(ctx, scale) {
      ctx.beginPath();
      ctx.fillStyle = "rgb(128,128,255)";
      ctx.arc(...getScreenPos(pos, scale), getGridSize(scale) / 3, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = `normal ${getGridSize(scale) * 0.75}px sans-serif`;
      ctx.save();
      ctx.translate(-(getGridSize(scale) / 4), getGridSize(scale) / 10);
      ctx.fillText("∞", ...getScreenPos(pos, scale));
      ctx.restore();
      updated = false;
    },
    clear(ctx, scale) {
      ctx.clearRect(...getRect(lastPos, scale));
    },
    forceUpdate() { updated = true; },
    updated: () => updated
  }
}
