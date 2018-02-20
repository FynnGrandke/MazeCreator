// tslint:disable:no-console
import * as React from 'react';
import { Square } from './Square';
import Runner from './Runner';

interface Props {
  squares: number[];
  side: string;
  callback: Function;
}

interface State {
  squares: number[];
  side: string;
}

export class Board extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      squares: this.props.squares,
      side: ''
    };
  }

  handleClick(i: number) {
    // shadowed copy
    const squares = this.props.squares.slice();

    if (squares[i] === 1) {
      squares[i] = 0;
    } else {
      squares[i] = 1;
    }

    // this.setState({squares: squares});
    this.props.callback(squares);
  }

  renderSquare(i: number) {    
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.handleClick(i)}
        positon={i}
        len={this.props.squares.length}
      />
      );
  }

  createSolver() {
    const runner = new Runner(this.props.squares);
    runner.solve();
    const correctArray = runner.getCorrectPath();
    this.props.callback(correctArray);
  }

  render() {    
    let columns = [];
    const side = parseInt(this.props.side, 10);
    for (let i = 0; i < side; i++) {
      let rows = [];
      for (let k = i * side; k < i * side + side; k++) {
        rows.push(<div key={k}> {this.renderSquare(k)} </div>);
      }
      columns.push(<div className="board-row" key={i}> {rows} </div>);
    }

    return (
      <div className="board">
        {columns}
        <div className="buttonBox">
          <button onClick={() => this.createSolver()}>
            Solver
          </button>
        </div>
      </div>
    );
  }
}