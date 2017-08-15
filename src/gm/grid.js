export default function(SIZE) {
  const Types = {
    OpenSpace: 0,
    PathSpace: 1,
    ClosedSpace: 2
  };

  const getX = p => p % SIZE;
  const getY = p => (p - (p % SIZE)) / SIZE;
  const getP = (x, y) => x + (y * SIZE);
  const getDirs = (x, y) => [
    y > 0 ? getP(x, y - 1) : null, // up
    y < SIZE - 1 ? getP(x, y + 1) : null, // down
    x > 0 ? getP(x - 1, y) : null, // left
    x < SIZE - 1 ? getP(x + 1, y) : null // right
  ];

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

  return {
    SIZE: SIZE,
    getX: getX,
    getY: getY,
    getP: getP,
    getOpen: getOpen,
    Types: Types,
    initGrid: initGrid
  }
}
