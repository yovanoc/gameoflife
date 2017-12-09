import React, { Component } from 'react';
import GameOfLife from './GameOfLife';
import './App.scss';

class App extends Component {
  render() {
    return (
      <GameOfLife worldSize={1} squareSize={5} generationSpeed={20} population={0} gliderGun={true}/>
    );
  }
}

export default App;
