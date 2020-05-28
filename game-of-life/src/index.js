import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/mainPage.css';
import Buttons from './components/Buttons';
import Grid from './components/Grid';
import Rules from './components/Rules';

class App extends React.Component {
  // Define variables and set state
  // Create grid with two arrays that are empty by default. Will be created in Grid component
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generations: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  // Selects of deselects box and sets state in copy of array
  selectBox = (row, col) => {
    let gridCopy = arrayCopy(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  // Randomly seeds the grid with live boxes
  seed = () => {
    let gridCopy = arrayCopy(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Selects number between 0 and 4 giving 25% chance of turning box on
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    // Sets state to grid copy with random boxes
    this.setState({
      gridFull: gridCopy,
    });
  };

  // Randomly seeds grid when app launches
  componentDidMount() {
    this.seed();
    this.playButton();
  }

  // onClick functions for buttons
  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  stopButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 500;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generations: 0,
    });
  };

  gridSize = (size) => {
    switch (size) {
      case '1':
        this.cols = 20;
        this.rows = 10;
        break;
      case '2':
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  };

  // Make two grids to keep track of changes
  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayCopy(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // Define the rules of the game
        // Each box has eight neighbors so 
        // each if checks for a neighbor and increases count accordingly
        // then determines if box dies or lives
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    // Sets state of arrayCopy and increases generation
    this.setState({
      gridFull: g2,
      generations: this.state.generations + 1,
    });
  };

  

  render() {
    return (
      <div className='container'>
        <h1 className='header'>Conway's Game of Life</h1>
        <Rules />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2 className='generations'>Generations: {this.state.generations}</h2>
        <Buttons
          playButton={this.playButton}
          stopButton={this.stopButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
      </div>
    );
  }
}

// Makes a copy of array
function arrayCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<App />, document.getElementById('root'));
