export default function(gridKit) {
  const { getOpen, Types, getRect} = gridKit;

  const _makeWall = (initWallDims) => {
    let wallSpaces = initWallDims;
    return {
      getSpaces: () => wallSpaces,
      draw(ctx, scale) {
        wallSpaces.forEach(p => {
          ctx.fillRect(...getRect(p, scale))
        });
      },
      clear(ctx, scale) {
        wallSpaces.forEach(p => {
          ctx.clearRect(...getRect(p, scale))
        });
      },
      updated: () => true
    }
  };

  const makeWall = (p, grid, len = 1, wall = []) => {
    grid[p] = Types.ClosedSpace;
    const open = getOpen(p, grid);
    if (open.length === 0 || len === 1) {
      return _makeWall(wall.concat(p));
    } else {
      return makeWall(
        open[parseInt(Math.random() * open.length, 10)],
        grid,
        len - 1,
        wall.concat(p)
      );
    }
  };

  return {
    makeWall: makeWall
  }
}
