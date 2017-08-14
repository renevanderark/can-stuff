
export default function(SIZE = 21) {
  const Types = {
    OpenSpace: 0,
    PathSpace: 1,
    ClosedSpace: 2
  };

  let grid = [];


  const getX = p => p % SIZE;
  const getY = p => (p - (p % SIZE)) / SIZE;
  const getP = (x, y) => x + (y * SIZE);
  const isOpen = p => grid[p] === Types.OpenSpace;
  const getDirs = (x, y) => [
    getP(x, y - 1), // up
    getP(x, y + 1), // down
    getP(x - 1, y), // left
    getP(x + 1, y) // right
  ];
  const getOpen = p => getDirs(getX(p), getY(p)).filter(p => isOpen(p))

  const initGrid = () => {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        grid[getP(x, y)] = Types.OpenSpace;
      }
    }
  }


  const makePath = () => {
    initGrid();
    let cur = getP((SIZE - 1) / 2, (SIZE - 1) / 2);
    grid[cur] = Types.PathSpace;

    while (getX(cur) > 0 && getX(cur) < SIZE - 1 && getY(cur) > 0 && getY(cur) < SIZE - 1) {
      const open = getOpen(cur);
      if (open.length === 0) { return false; }
      cur = open[parseInt(Math.random() * open.length, 10)];
      open.filter(p => cur !== p).forEach(p => grid[p] = Types.ClosedSpace);
      grid[cur] = Types.PathSpace;
    }
    return true;
  }

  while (!makePath()) { }

  for (let y = 0; y < SIZE; y++) {
    let row = '';
    for (let x = 0; x < SIZE; x++) {
      row += grid[getP(x, y)] === Types.PathSpace ? 'X'  : '-'
    }
    console.log(`${y < 10 ? "0" + y : y}: ${row}`);
  }
};
