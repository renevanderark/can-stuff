export default function(SIZE, VIRT_WIDTH) {
  const Types = {
    OpenSpace: 0,
    PathSpace: 1,
    ClosedSpace: 2
  };

  const screenSize = VIRT_WIDTH / SIZE;

  const getX = p => p % SIZE;
  const getY = p => (p - (p % SIZE)) / SIZE;
  const getP = (x, y) => x >= 0  && x < SIZE && y >= 0 && y < SIZE
    ?  x + (y * SIZE)
    : -1;
  const getDirs = (x, y) => [
    y > 0 ? getP(x, y - 1) : null, // up
    y < SIZE - 1 ? getP(x, y + 1) : null, // down
    x > 0 ? getP(x - 1, y) : null, // left
    x < SIZE - 1 ? getP(x + 1, y) : null // right
  ];
  const getScreenPos = (p, scale) => [
    (getX(p) * screenSize * scale) + (screenSize * scale * 0.5),
    (getY(p) * screenSize * scale) + (screenSize * scale * 0.5)
  ];
  const getRect = (p, scale) => [
    getX(p) * screenSize * scale, getY(p) * screenSize * scale,
    screenSize * scale, screenSize * scale
  ];
  const getGridSize = (scale) => screenSize * scale;
  const getVirtPos = p => [getX(p) * screenSize + (screenSize / 2), getY(p) * screenSize + (screenSize / 2)];

  const isOpen = (p, grid) => grid[p] === Types.OpenSpace;
  const getOpen = (p, grid) => getDirs(getX(p), getY(p)).filter(p => isOpen(p, grid));

  const initGrid = () => {
    let grid = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        grid[getP(x, y)] = Types.OpenSpace;
      }
    }
    return grid;
  }

  const gridSpaceIsFree = (walls, wallIdx) => (spaceIdx) => walls
    .filter((w, idx) => idx !== wallIdx)
    .map(w => w.getSpaces())
    .reduce((a, b) => a.concat(b))
    .indexOf(spaceIdx) < 0;


  return {
    SIZE: SIZE,
    getRect: getRect,
    getScreenPos: getScreenPos,
    getGridSize: getGridSize,
    getVirtPos: getVirtPos,
    getX: getX,
    getY: getY,
    getP: getP,
    getOpen: getOpen,
    Types: Types,
    initGrid: initGrid,
    gridSpaceIsFree: gridSpaceIsFree
  }
}
