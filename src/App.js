import React, { Component } from 'react';
import GameOfLife from './GameOfLife';

class App extends Component {
  render() {
    return (
      <GameOfLife worldSize={180} squareSize={10} generationSpeed={5} population={16000} gliderGun={false}/>
    );
  }
}

export default App;
