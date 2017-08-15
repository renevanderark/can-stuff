export default function(gridKit) {
  const { getOpen, Types, getScreenPos, getGridSize, getRect } = gridKit;

  const _makeWall = (initWallDims) => {
    let wallSpaces = initWallDims;
    return {
      getSpaces: () => wallSpaces,
      draw(ctx, scale) {
        ctx.beginPath();
        ctx.lineWidth = Math.floor(getGridSize(scale));
        ctx.lineCap = 'round';
        if (wallSpaces.length === 1) {
          ctx.moveTo(...getScreenPos(wallSpaces[0], scale));
          ctx.lineTo(...getScreenPos(wallSpaces[0], scale));
        } else {
          wallSpaces.forEach((p, i) => {
            if (i === 0) {
              ctx.moveTo(...getScreenPos(p, scale));
            } else {
              ctx.lineTo(...getScreenPos(p, scale));
            }
          });
        }
        ctx.stroke();
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
