import React, { Component } from 'react';
import GameOfLife from './GameOfLife';

class App extends Component {
  render() {
    return (
      <GameOfLife worldSize={35} squareSize={45} generationSpeed={5} population={350} gliderGun={false}/>
    );
  }
}

export default App;
