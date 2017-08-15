import wallMaker from "./wall";

export default function(gridKit) {
  const { initGrid, Types, getP, getX, getY, getOpen, SIZE } = gridKit;
  const { makeWall } = wallMaker(gridKit);

  const makePath = () => {
    let grid = initGrid();
    let cur = getP((SIZE - 1) / 2, (SIZE - 1) / 2);
    grid[cur] = Types.PathSpace;

    while (getX(cur) > 0 && getX(cur) < SIZE - 1 && getY(cur) > 0 && getY(cur) < SIZE - 1) {
      const open = getOpen(cur, grid);
      if (open.length === 0) { return makePath(); }
      cur = open[Math.floor(Math.random() * open.length)];
      open.filter(p => cur !== p).forEach(p => grid[p] = Types.ClosedSpace);
      grid[cur] = Types.PathSpace;
    }
    return grid;
  }

  let grid = makePath().map(g =>  g === Types.ClosedSpace ? Types.OpenSpace : g);

  let walls = [];
  while (grid.filter(g => g === Types.OpenSpace).length > 0) {
    const openSpaces = grid
      .map((g, i) => ({g: g, i: i}))
      .filter(({g}) => g === Types.OpenSpace);
    const cur = openSpaces[Math.floor(Math.random() * openSpaces.length)].i;
    walls.push(makeWall(cur, grid, Math.floor(Math.random() * 6) === 0 ? 3 : 2));
  }

  return {
    walls: walls
  };
};
