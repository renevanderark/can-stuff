import wallMaker from "./wall";

export default function(gridKit) {
  const { initGrid, Types, getP,  getY, SIZE } = gridKit;
  const { makeWall } = wallMaker(gridKit);

  let grid = initGrid();
  grid[getP((SIZE - 1) / 2, (SIZE - 1) / 2)] = Types.ClosedSpace;
  let walls = [];
  for (let i = 0; i < SIZE * SIZE; i += Math.floor(Math.random() * 3) + 1) {
    let cur = i + getY(i) % 2;
    if (grid[cur] !== Types.ClosedSpace) {
      const newWall = makeWall(cur, grid, Math.floor(Math.random() * 3) === 0 ? 3 : 2);
      if (newWall !== null) { walls.push(newWall); }
    }
  }

  return {
    walls: walls,
    complexity: walls.length
  };
};
