import React from 'react';

class GameOfLife extends React.Component {

  constructor(props) {
    super(props);

    if (!props)
      return;

    var worldSize = this.props.worldSize;

    if (this.props.gliderGun && worldSize < 37) {
      worldSize = 39;
    }

    this.world = {
      size: worldSize || 25,
      square: {
        size: this.props.squareSize || 25
      },
      generationSpeed: this.props.generationSpeed || 200
    }

    var world = this.createWorld(worldSize);

    if (this.props.gliderGun) {
      gliderGun(0, 0);
    }

    populate(this.props.population);

    this.state = {
      generation: 1,
      world: world
    };

    function rnd(n) {
      return Math.floor(Math.random() * n);
    }
    function populate(n) {
      for (var i = 0; i < n; i++) {
        world[rnd(worldSize)][rnd(worldSize)] = 1;
      }
    }

    function gliderGun(x, y) {
      if (worldSize < 37 || !(world[0][y] + 11)) {
        console.warn("Glider gun needs more cells");
        return;
      }

      var gliderGunMatrix = [
        [
          1, 6
        ],
        [
          1, 7
        ],
        [
          2, 6
        ],
        [
          2, 7
        ],
        [
          11, 6
        ],
        [
          11, 7
        ],
        [
          11, 8
        ],
        [
          12, 5
        ],
        [
          12, 9
        ],
        [
          13, 4
        ],
        [
          13, 10
        ],
        [
          14, 4
        ],
        [
          14, 10
        ],
        [
          15, 7
        ],
        [
          16, 5
        ],
        [
          16, 9
        ],
        [
          17, 6
        ],
        [
          17, 8
        ],
        [
          17, 7
        ],
        [
          18, 7
        ],
        [
          21, 6
        ],
        [
          21, 5
        ],
        [
          21, 4
        ],
        [
          22, 6
        ],
        [
          22, 5
        ],
        [
          22, 4
        ],
        [
          23, 3
        ],
        [
          23, 7
        ],
        [
          25, 3
        ],
        [
          25, 7
        ],
        [
          25, 2
        ],
        [
          25, 8
        ],
        [
          35, 4
        ],
        [
          35, 5
        ],
        [
          36, 4
        ],
        [
          36, 5
        ]
      ];
      for (var i = 0; i < gliderGunMatrix.length; i++) {
        var cellPos = gliderGunMatrix[i];
        world[x + cellPos[0]][y + cellPos[1]] = 1;
      }
    }
  }

  componentDidMount() {
    var c = this.refs.canvas;
    var ctx = c.getContext("2d");
    var squareSize = this.world.square.size;
    var worldSize = this.world.size;

    c.width = worldSize * squareSize;
    c.height = worldSize * squareSize;

    drawWorldGrid();
    drawCells(this.state.world);

    setInterval(passGeneration.bind(this), this.world.generationSpeed);

    function passGeneration() {
      var world = this.state.world;
      var newWorld = this.createWorld(worldSize);

      for (var row = 0; row < world.length; row++) {
        var currRow = world[row];

        for (var column = 0; column < currRow.length; column++) {
          var currColumn = currRow[column];
          var neighbors = getNeighbors(world, row, column);

          newWorld[row][column] = currColumn;

          if (neighbors >= 4 || neighbors < 2) {
            if (currColumn === 1) {
              newWorld = kill(newWorld, row, column, neighbors);
            }
          }
          if (neighbors === 3) {
            newWorld = born(newWorld, row, column);
          }

        }
      }

      ctx.clearRect(0, 0, c.width, c.height);
      drawWorldGrid();
      drawCells(newWorld);

      function kill(world, x, y, neighbors) {
        world[x][y] = 0;
        return world;
      }

      function born(world, x, y) {
        world[x][y] = 1;
        return world;
      }

      this.setState((prev) => {
        return {
          generation: ++prev.generation,
          world: newWorld
        }
      });

      function getNeighbors(world, x, y) {
        var neighbors = [
          world[x - 1]
            ? world[x - 1][y - 1]
            : 0,
          world[x]
            ? world[x][y - 1]
            : 0,
          world[x + 1]
            ? world[x + 1][y - 1]
            : 0,

          world[x - 1]
            ? world[x - 1][y]
            : 0,

          world[x + 1]
            ? world[x + 1][y]
            : 0,

          world[x - 1]
            ? world[x - 1][y + 1]
            : 0,
          world[x]
            ? world[x][y + 1]
            : 0,
          world[x + 1]
            ? world[x + 1][y + 1]
            : 0
        ];
        return neighbors.reduce(function(a, b) {
          if (b) {
            a += 1;
          }
          return a;
        }, 0);
      }

    }
    function drawCells(world) {
      for (var row = 0; row < world.length; row++) {
        var currRow = world[row];

        for (var column = 0; column < currRow.length; column++) {
          var currColumn = currRow[column];
          if (currColumn) {
            square(row, column);
          }
        }
      }
    }
    function drawWorldGrid() {
      ctx.fillStyle = "#f9f9f9";
      for (var i = 0; i < worldSize; i++) {
        line(i * squareSize, 0, 'vertical');
        line(0, i * squareSize, 'horizontal');
      }
    }

    function line(x, y, order) {

      var w = 1,
        h = 1;
      switch (order) {
        case 'horizontal':
          w = c.width;
          break;
        case 'vertical':
          h = c.height;
          break;
        default:
          break;
      }

      ctx.fillRect(x, y, w, h);
    }
    function square(x, y) {
      ctx.fillStyle = "#721b0d";
      ctx.fillRect(1 + x * squareSize, 1 + y * squareSize, squareSize - 1, squareSize - 1);
    }
  }

  createWorld(size) {
    return Array.apply(null, Array(size)).map(function() {
      return Array.apply(null, Array(size)).map(function() {
        return 0
      })
    });
  }

  render() {
    return <div className='react-gameoflife'>
      <h1>Current generation: {this.state.generation}</h1>
      <canvas ref='canvas'></canvas>
    </div>
  }

}

export default GameOfLife;
