import wallMaker from "./wall";

export default function(gridKit) {
  const { initGrid, Types, getP, getX, getY, getOpen, SIZE, gridSpaceIsFree } = gridKit;
  const { makeWall } = wallMaker(gridKit);

  const makePath = () => {
    let grid = initGrid();
    let cur = getP((SIZE - 1) / 2, (SIZE - 1) / 2);
    let pathLen = 0;
    grid[cur] = Types.PathSpace;
    while (getX(cur) > 0 && getX(cur) < SIZE - 1 && getY(cur) > 0 && getY(cur) < SIZE - 1) {
      const open = getOpen(cur, grid);
      if (open.length === 0) { return makePath(); }
      cur = open[Math.floor(Math.random() * open.length)];
      open.filter(p => cur !== p).forEach(p => grid[p] = Types.ClosedSpace);
      grid[cur] = Types.PathSpace;
      pathLen++;
    }
    return [grid, pathLen];
  }

  let [grid, pathLen] = makePath().map(g =>  g === Types.ClosedSpace ? Types.OpenSpace : g);

  let walls = [];
  while (grid.filter(g => g === Types.OpenSpace).length > 0) {
    const openSpaces = grid
      .map((g, i) => ({g: g, i: i}))
      .filter(({g}) => g === Types.OpenSpace)
      .sort((a,b) => (Math.abs(SIZE - 1 - getX(a.i)) + Math.abs(SIZE - 1 - getY(a.i))) -   (Math.abs(SIZE - 1 - getX(b.i)) + Math.abs(SIZE - 1 - getY(b.i))))

    const cur = openSpaces[0].i;
    const newWall = makeWall(cur, grid, Math.floor(Math.random() * 6) === 0 ? 3 : 2);
    if (newWall !== null) { walls.push(newWall); }
  }

  let shuffles = {}, shuffleAmount = 0;
  for (let i = 0; i < 3; i++) {
    walls.forEach((w, wIdx) => {
      shuffles[wIdx] = shuffles[wIdx] || [];
      let rotBefore = w.getCurrentRotation();
      let rotAfter = w.rotate((spaceIdx) => gridKit.gridSpaceIsFree(walls, wIdx)(spaceIdx) && spaceIdx !== getP((SIZE - 1) / 2, (SIZE - 1) / 2))
      if (rotBefore !== rotAfter && shuffles[wIdx].indexOf(rotAfter) < 0) {
        shuffles[wIdx].push(rotAfter);
      }
    });
  }

  return {
    walls: walls,
    complexity: pathLen + walls.length
  };
};
