
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
    y > 0 ? getP(x, y - 1) : null, // up
    y < SIZE - 1 ? getP(x, y + 1) : null, // down
    x > 0 ? getP(x - 1, y) : null, // left
    x < SIZE - 1 ? getP(x + 1, y) : null // right
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
      cur = open[Math.floor(Math.random() * open.length)];
      open.filter(p => cur !== p).forEach(p => grid[p] = Types.ClosedSpace);
      grid[cur] = Types.PathSpace;
    }
    return true;
  }



  const makeWall = (p, len = 1, wall = []) => {
    grid[p] = Types.ClosedSpace;
    const open = getOpen(p);
    if (open.length === 0 || len === 1) {
      return wall.concat(p);
    } else {
      return makeWall(open[parseInt(Math.random() * open.length, 10)], len - 1, wall.concat(p));
    }
  }

  while (!makePath()) { }
  grid = grid.map(g =>  g === Types.ClosedSpace ? Types.OpenSpace : g);

  let walls = [];
  while (grid.filter(g => g === Types.OpenSpace).length > 0) {
    const openSpaces = grid
      .map((g, i) => ({g: g, i: i}))
      .filter(({g}) => g === Types.OpenSpace);
    const cur = openSpaces[Math.floor(Math.random() * openSpaces.length)].i;
    walls.push(makeWall(cur, Math.floor(Math.random() * 6) === 0 ? 3 : 2));
  }
  return {
    walls: walls,
    print: (walls) => {
      for (let y = 0; y < SIZE; y++) {
        let row = '';
        for (let x = 0; x < SIZE; x++) {
          row += walls.reduce((a,b) => a.concat(b)).indexOf(getP(x, y)) > - 1  ? 'X'  : '·'
        }
        console.log(`${y < 10 ? "0" + y : y}: ${row}`);
      }
    }
  };
};
