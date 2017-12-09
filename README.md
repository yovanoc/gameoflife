# Game of Life made with ReactJS


# How to use

Simply:

```
    ReactDOM.render(
        <GameOfLife worldSize={1} squareSize={5} generationSpeed={20} population={0} gliderGun={true}/>,
        document.querySelector('.gameoflife-shell')
    );
```

Where:

| attribute | value |
| ---       | ---   |
|`worldSize`| amount of cells |
|`squareSize`| cell size |
|`generationSpeed`| milliseconds to parse the next generation |
|`population`| amount of lifes |
|`gliderGun`| print Glider Gun (the world size will be adjusted to fit the Glider Gun) |

# Example
