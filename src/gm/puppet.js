export default (gridKit, walls) => {
  const { getP, getScreenPos, getGridSize, SIZE, getRect, getX, getY } = gridKit;
  let pos = getP((SIZE - 1) / 2, (SIZE - 1) / 2)
  let updated = true;
  return {
    getPos: () => pos,
    move(x, y) {
      let newPos = getP(getX(pos) + x, getY(pos) + y);
      if (newPos > -1 && gridKit.gridSpaceIsFree(walls, -1)(newPos)) {
        pos = newPos;
      }
      updated = true;
    },
    draw(ctx, scale) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(...getScreenPos(pos, scale), getGridSize(scale) / 8, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = `normal ${25 * scale}px sans-serif`;

      ctx.fillText("∞", ...(getScreenPos(pos, scale).map((p,i) => i === 0  ? p - (10 * scale) : p + (6 * scale))));
      updated = false;
    },
    clear(ctx, scale) {
      ctx.clearRect(...getRect(pos, scale));
    },
    forceUpdate() { updated = true; },
    updated: () => updated
  }
}
