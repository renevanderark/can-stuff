export default function(gridKit) {
  const { getOpen, Types, getScreenPos, getGridSize, getRect, getX, getY, getP } = gridKit;

  const _makeWall = (initWallDims) => {
    let wallSpaces = initWallDims;
    let pivotIdx = Math.floor(Math.random() * initWallDims.length);
    let pivot = wallSpaces[pivotIdx];
    let updated = true;
    let animatingRotation = 0;
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
      return 0;
    };

    const drawStrokes = (ctx, scale, strokeStyle, redux = 0) => {
      ctx.save();
      const pivotScreenPos = getScreenPos(pivot, scale);
      ctx.translate(...pivotScreenPos);
      ctx.rotate(animatingRotation * Math.PI / 180)
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = Math.floor(getGridSize(scale) - (2*redux));
      wallSpaces.forEach((p, i) => {
        if (i === 0) {
          ctx.moveTo(...(getScreenPos(p, scale)
            .map((p, i) => p - pivotScreenPos[i])
            .map(p => p - redux)));
        } else {
          ctx.lineTo(...(getScreenPos(p, scale)
            .map((p, i) => p - pivotScreenPos[i])
            .map(p => p - redux)));
        }
      });
      ctx.stroke();
      ctx.restore();
    };

    const drawPivot = (ctx, scale) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "rgb(96, 0, 0)";
      ctx.translate(...getScreenPos(pivot, scale));
      ctx.arc(-1, -1, getGridSize(scale) / 10, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgb(196, 96, 96)";
      const gridSize = getGridSize(scale);
      ctx.lineWidth = Math.round(gridSize / 14);
      ctx.moveTo(-1, -1);
      ctx.lineTo(-3 * scale, -0.4 * gridSize * scale);
      ctx.stroke();
      ctx.restore();
    }

    let currentRotation = determineCurrentRotation();

    return {
      movePivot: () => {
        pivotIdx = pivotIdx < wallSpaces.length - 1 ? pivotIdx + 1 : 0;
        pivot = wallSpaces[pivotIdx];
        initWallDims = wallSpaces;
        currentRotation = determineCurrentRotation();
        updated = true;
      },
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

        animatingRotation = lastRotation < currentRotation
          ? Math.abs(lastRotation - currentRotation) * -90
          : lastRotation > currentRotation
          ? Math.abs((lastRotation - 4) - currentRotation) * -90
          : 0;
        console.log(lastRotation, currentRotation, animatingRotation);
        updated = true;
        return currentRotation;
      },
      animateRotation() {
        if (animatingRotation > 0) {
          animatingRotation--;
          updated = true;
        } else if (animatingRotation < 0) {
          animatingRotation++;
          updated = true;
        }
      },
      draw(ctx, scale) {
        drawStrokes(ctx, scale, "rgba(96, 0, 0, 0.6)", 0);
        drawStrokes(ctx, scale, "rgba(128, 0, 0, 0.8)", 1);
        drawStrokes(ctx, scale, "rgb(196, 0, 0)", 2);
        drawPivot(ctx, scale);

        updated = false;
      },
      clear(ctx, scale) {
        wallSpaces.forEach(p => {
          ctx.clearRect(...getRect(p, scale).map((p, i) => i < 2 ? p - 1 : p + 1));
        });
      },
      forceUpdate() { updated = true; },
      updated: () => updated
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
