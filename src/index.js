const Board = document.getElementById("board");

const config = {
  MAP_SIZE: 50,
  TILE_SIZE: "50px"
};

function random(max) {
  return Math.floor(Math.random() * max);
}

function createEmpty2DArray(size) {
  return Array(size)
    .fill(undefined)
    .map(() =>
      Array(size)
        .fill(undefined)
        .map(
          () =>
            `<div><img src='sprites/brick.png' style='width:${config.TILE_SIZE}'></div>`
        )
    );
}

function randomArrayElements(array, number) {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(array[random(array.length - 1)]);
  }
  return result;
}

function Cord(x, y) {
  return {
    x,
    y
  };
}

function randomChoice(a, b) {
  return Math.random() > 0.5 ? a : b;
}

function randomDirection(current, limit) {
  if (limit === current + 1) {
    return current + randomChoice(0, -1);
  }
  if (0 === current) {
    return current + randomChoice(0, 1);
  }
  return current + randomChoice(1, -1);
}

function randomMoves(startPosition, tries) {
  const result = [startPosition];
  for (let i = 0; i < tries; i++) {
    const lastCords = result[i];

    let newCords = null;

    if (randomChoice(true, false)) {
      newCords = Cord(
        randomDirection(lastCords.x, config.MAP_SIZE),
        lastCords.y
      );
    } else {
      newCords = Cord(
        lastCords.x,
        randomDirection(lastCords.y, config.MAP_SIZE)
      );
    }

    result.push(newCords);
  }
  return result;
}

//css dynamic layout
Board.style.grid = `repeat(${config.MAP_SIZE}, ${config.TILE_SIZE}) / repeat(${config.MAP_SIZE}, ${config.TILE_SIZE})`;

const emptyMap = createEmpty2DArray(config.MAP_SIZE);

const start = Cord(random(config.MAP_SIZE), random(config.MAP_SIZE));

const moves = randomMoves(start, 5000);
console.log(moves);

moves.forEach(cord => {
  console.log(cord);
  emptyMap[cord.x][
    cord.y
  ] = `<div><img src='sprites/floor.png' style='width:${config.TILE_SIZE}'></div>`;
});

const enemies = randomArrayElements(moves, 13);
console.log(enemies);

enemies.forEach(cord => {
  console.log(cord);
  emptyMap[cord.x][
    cord.y
  ] = `<div><img src='sprites/enemy.png' style='width:${config.TILE_SIZE}'></div>`;
});

console.log(emptyMap);

const str = emptyMap.map(row => row.join("")).join("");

Board.innerHTML = str;
