export default (gridKit, walls) => {
  const { getP, getScreenPos, getGridSize, SIZE, getRect, getX, getY } = gridKit;
  let pos = getP((SIZE - 1) / 2, (SIZE - 1) / 2)

  return {
    getPos: () => pos,
    move(x, y) {
      let newPos = getP(getX(pos) + x, getY(pos) + y);
      if (newPos > -1 && gridKit.gridSpaceIsFree(walls, -1)(newPos)) {
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
