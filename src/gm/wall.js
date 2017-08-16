export default function(gridKit) {
  const { getOpen, Types, getScreenPos, getGridSize, getRect, getX, getY, getP } = gridKit;

  const _makeWall = (initWallDims) => {
    let wallSpaces = initWallDims;

    const pivot = wallSpaces[0];

    const getPivotPos = () => ({ x: getX(pivot), y: getY(pivot) });

    const rotateVec2 = (pivotPos, vec, rad) => ({
      x: pivotPos.x + Math.round(vec.x * Math.cos(rad) - vec.y * Math.sin(rad)),
      y: pivotPos.y + Math.round(vec.x * Math.sin(rad) + vec.y * Math.cos(rad))
    });

    const getRotatedPositions = (positions, pivotPos, pivotDeltae, rad) =>
      positions
        .map((p, i) => rotateVec2(pivotPos, pivotDeltae[i], rad))
        .map(({x, y}) => getP(x, y));

    const determineCurrentRotation = () => {
      const pivotPos = getPivotPos();
      const positions = initWallDims.map(w => ({x: getX(w), y: getY(w)}));
      const pivotDeltae = positions.map(p => ({x: pivotPos.x - p.x, y: pivotPos.y - p.y}));
      for (let rot = 0; rot < 4; rot++) {
        const rad = (rot * 90) * (Math.PI / 180);
        const rotatedSpaces = getRotatedPositions(positions, pivotPos, pivotDeltae, rad);
        if (rotatedSpaces.filter((r, i) => r === initWallDims[i]).length === initWallDims.length) {
          return rot;
        }
      }
      console.log("never reached?")
      return 0;
    };

    let currentRotation = determineCurrentRotation();



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

      rotate(gridSpaceIsFree) {
        const pivotPos = getPivotPos();
        const positions = initWallDims.map(w => ({x: getX(w), y: getY(w)}));
        const pivotDeltae = positions.map(p => ({x: pivotPos.x - p.x, y: pivotPos.y - p.y}));

        const lastRotation = currentRotation;

        do {
          currentRotation = currentRotation === 3 ? 0 : currentRotation + 1;
          const rad = (currentRotation * 90) * (Math.PI / 180);
          const rotatedSpaces = getRotatedPositions(positions, pivotPos, pivotDeltae, rad);
          if (rotatedSpaces.indexOf(-1) < 0 && rotatedSpaces.filter(rs => !gridSpaceIsFree(rs)).length === 0) {
            wallSpaces = rotatedSpaces;
            break;
          }
        } while (currentRotation !== lastRotation);
      },

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
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(...getScreenPos(pivot, scale), getGridSize(scale) / 6, 0, 2 * Math.PI, false);

        ctx.fill();
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
      return wall.length < 1 ? null : _makeWall(wall.concat(p));
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
