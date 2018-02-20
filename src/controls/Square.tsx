import * as React from 'react';

interface Props {
    value: number;
    onClick: Function;
    positon: number;
    len: number;
}

export class Square extends React.Component<Props, {}> {
    render() {
        let isWay = true;
        let isCorrectWay = false;
        if (this.props.value === 1) {
            isWay = false;
        } else if (this.props.value === 2) {
            isCorrectWay = true;
        }

        if (this.props.positon === 0) {
            return (
                <button className="first-element way">
                    S
                </button>
            );
        } else if (this.props.positon === this.props.len - 1) {
            return (
                <button className="last-element way">
                    E
                </button>
            );
        } else {
            return (
                <button 
                    className={isCorrectWay ? 'correctWay' : isWay ? 'way' : 'wall'} 
                    onClick={() => this.props.onClick()}
                >
                    {this.props.value}
                </button>
            );
        }
    }
}