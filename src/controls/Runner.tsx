// tslint:disable:no-console

class MazeRunner {
    maze: number[][];
    positionX: number = 0;
    positionY: number = 0;
    range: number;

    wasHere: boolean[][] = [[], [], [], [], [], [], [], [], [], [], 
                            [], [], [], [], [], [], [], [], [], []];
    correctPath: boolean[][] = [[], [], [], [], [], [], [], [], [], [], 
                                [], [], [], [], [], [], [], [], [], []]; // Lösungsweg

    constructor(maze: number[]) {
        this.range = Math.round(Math.sqrt(maze.length));

        this.maze = maze.reduce(
            (rows: number[][], key: number, index: number) => 
                (index % this.range === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, 
            []
        ) as number[][];
        console.log(this.range, this);
        
    }

    solve() {        
        for (let row = 0; row < this.range; row++) {
            for (let col = 0; col < this.range; col++) {
                this.wasHere[row][col] = false;
                this.correctPath[row][col] = false;
            }
        }
        // Start ist logischerweise immer true
        // this.wasHere[0][0] = true;
        // this.correctPath[0][0] = true;

        let end = false;
        let emergencyCounter = 0;
        
        while (!end && emergencyCounter < 1000) {
            emergencyCounter++;
            if (this.maze[this.positionY][this.positionX] === 8) {
                console.log('EEEENNNNNDD');
                end = true;
                break;
            }
            
            if (this.goWest() && 
                this.wasHere[this.positionY][this.positionX - 1] === false &&
                this.checkNextField(-1, 0)) {
                console.log('WEST');

                this.positionX--;
                this.wasHere[this.positionY][this.positionX] = true;
                this.correctPath[this.positionY][this.positionX] = true;
            } else {
                if (this.goSouth() && 
                    this.wasHere[this.positionY + 1][this.positionX] === false &&
                    this.checkNextField(0, 1)) {
                    console.log('SOUTH');
                    
                    this.positionY++;
                    this.wasHere[this.positionY][this.positionX] = true;
                    this.correctPath[this.positionY][this.positionX] = true;
                } else {
                    if (this.goEast() && 
                        this.wasHere[this.positionY][this.positionX + 1] === false &&
                        this.checkNextField(1, 0)) {
                        console.log('EAST');
                        
                        this.positionX++;
                        this.wasHere[this.positionY][this.positionX] = true;
                        this.correctPath[this.positionY][this.positionX] = true;
                    } else {
                        if (this.goNorth() && 
                        this.wasHere[this.positionY - 1][this.positionX] === false &&
                        this.checkNextField(0, -1)) {
                            console.log('NORTH');
                            
                            this.positionY--;
                            this.wasHere[this.positionY][this.positionX] = true;
                            this.correctPath[this.positionY][this.positionX] = true;
                        } else {
                            // SACKGASSE
                            if (this.goWest() && 
                                this.correctPath[this.positionY][this.positionX - 1] === true &&
                                this.checkNextField(-1, 0)) {
                                console.log('SACKGASSE WEST');

                                this.correctPath[this.positionY][this.positionX] = false;
                                this.positionX--;
                            } else {
                                if (this.goSouth() && 
                                    this.correctPath[this.positionY + 1][this.positionX] === true &&
                                    this.checkNextField(0, 1)) {
                                    console.log('SACKGASSE SOUTH');

                                    this.correctPath[this.positionY][this.positionX] = false;
                                    this.positionY++;
                                } else {
                                    if (this.goEast() && 
                                        this.correctPath[this.positionY][this.positionX + 1] === true &&
                                        this.checkNextField(1, 0)) {
                                        console.log('SACKGASSE EAST');

                                        this.correctPath[this.positionY][this.positionX] = false;
                                        this.positionX++;
                                    } else {
                                        if (this.goNorth() && 
                                            this.correctPath[this.positionY - 1][this.positionX] === true &&
                                            this.checkNextField(0, -1)) {
                                            console.log('SACKGASSE NORTH');

                                            this.correctPath[this.positionY][this.positionX] = false;
                                            this.positionY--;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (end) {
                console.log(end);
                break;
            }
        }   
    }

    checkNextField(x: number, y: number): boolean {
        if (this.maze[this.positionY + y][this.positionX + x] === 0 ||
            this.maze[this.positionY + y][this.positionX + x] === 8 ||
            this.maze[this.positionY + y][this.positionX + x] === 9) {
            return true;
        }
        return false;
    }

    getCorrectPath(): number[] {
        let flattenedMaze = this.maze.reduce((acc, cur) => {
            return acc.concat(cur);
        });
        const flattenedCorrectPath = this.correctPath.reduce((acc, cur) => {
            return acc.concat(cur);
        });
        flattenedCorrectPath.forEach((ele, index) => {
            if (ele) {
                // um das Ende nicht zu überschreiben
                if (flattenedMaze[index] === 8) {
                    return;
                }
                flattenedMaze[index] = 2;
            }
        });
        return flattenedMaze;
    }

    goSouth(): boolean {
        if (this.positionY < this.range - 1) {
            return true;
        }
        return false;
    }

    goNorth(): boolean {        
        if (this.positionY > 0) {
            return true;
        }
        return false;
    }

    goEast() {        
        if (this.positionX < this.range - 1) {
            return true;
        }
        return false;
    }

    goWest() {        
        if (this.positionX > 0) {
            return true;
        }
        return false;
    }
}

export default MazeRunner;