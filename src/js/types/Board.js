export class Board{

    rows = 0;
    columns = 0;
    board = [];

    constructor(rows, columns){

        this.columns = columns;
        this.rows = rows;
        this.generateBoard()

    }

    generateBoard(){

        this.board = new Array(this.rows).fill([]);

        for (let row = 0; row < this.board.length; row++) {
            this.board[row] = new Array(this.columns).fill(0)
        }

    }

    getFilledBoxes(){

        let filledBoxes = [];

        this.board.forEach((row, y) => {

            row.forEach((value, x) => {
    
                if (value === 1) {
    
                    filledBoxes.push({x : x, y : y});
    
                }
    
            });
    
        });

        return filledBoxes;

    }

    generateRandomApple(){

        this.board[Math.floor(Math.random() * this.board.length)][Math.floor(Math.random() * this.board[0].length)] = 1;

    }

    foundApplePosition(x, y){

        return (this.board[y][x] === 1) ? true : false;

    }

    deleteApple(x, y){

        this.board[y][x] = 0;

    }


}