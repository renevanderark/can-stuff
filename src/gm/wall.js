export default function(gridKit) {
  const { getOpen, Types, getScreenPos, getGridSize, getRect } = gridKit;

  const _makeWall = (initWallDims) => {
    let wallSpaces = initWallDims;
    let test = "black";
    return {
      getSpaces: () => wallSpaces,
      isAt(screenX, screenY, scale) {
        const siz = getGridSize(scale) / 2;
        for (let i = 0; i < wallSpaces.length; i++) {
          const [x, y] = getScreenPos(wallSpaces[i], scale);
          if (y - siz < screenY && y + siz > screenY &&
              x - siz < screenX && x + siz > screenX
          ) { return true; }
        }
        return false;
      },
      rotate() {
        test = "red";
      },
      draw(ctx, scale) {
        ctx.beginPath();
        ctx.lineWidth = Math.floor(getGridSize(scale));
        ctx.strokeStyle = test;
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
