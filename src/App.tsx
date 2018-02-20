// tslint:disable:no-console
import * as React from 'react';
import './App.css';
import { Board } from './controls/Board';

interface State {
  side: string;
  squares: number[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = { 
      side: '',
      squares: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMaze = this.setMaze.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const inputNumber = parseInt(event.currentTarget.value, 10);
    console.log('ugha', inputNumber, this.state);

    if (inputNumber <= 0 || isNaN(inputNumber) ) {
      this.setState({side: ''});
      return;
    }

    let array: number[] = Array(inputNumber * inputNumber).fill(0);
    array[0] = 9;
    array[array.length - 1] = 8;

    this.setState({side: inputNumber + '', squares: array});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  setMaze(maze: number[]) {
    this.setState({squares: maze});
  }

  render() {
    console.log('render');
    const textareaText = this.state.squares + '';
    return (
      <div className="controls">
        <div className="inputs">
          <form onSubmit={this.handleSubmit}>
            <label>
              Maze:<br />
              <textarea className="mazeTextarea" value={textareaText} />
            </label>
            <br />
            <label>
              Row/Col:
              <input type="text" value={this.state.side} onChange={this.handleChange}/>
            </label>
          </form>
        </div>
        < Board side={this.state.side} squares={this.state.squares} callback={this.setMaze} />
      </div>
    );
  }
}

export default App;
