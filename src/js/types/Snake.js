import { DIRECTIONS, ROWS, COLUMNS } from "../constants";

export class Snake{

    body = [];

    constructor(startPosition){

        this.body.push(startPosition);

    }

    getBody(){
        return this.body;
    }

    getHeadPosition(){

        return this.body[0];

    }

    moveSnake(playerDirection){
        
        for(let i = this.body - 1; i >= 0; i--){

            this.body[i].direction = (i === 0) ? playerDirection : this.body[i-1].direction;

            if (this.body[i].direction === DIRECTIONS.LEFT){
                this.body[i].x--;
            }
            if (this.body[i].direction === DIRECTIONS.RIGHT){
                this.body[i].x++;
            }
            if (this.body[i].direction === DIRECTIONS.DOWN){
                this.body[i].y++;
            }
            if (this.body[i].direction === DIRECTIONS.UP){
                this.body[i].y--;
            }
    
        }
    
        checkOutsideBoard();
        checkCollisions();
        // checkEatApple();    

    }

    checkOutsideBoard(){

        for(let i = 0; i < this.body.length; i++){

            if (this.body[i].x >= COLUMNS) {
                this.body[i].x = 0;
            }
            else if (this.body[i].x < 0) {
                this.body[i].x = COLUMNS - 1;
            }
            else if (this.body[i].y >= ROWS) {
                this.body[i].y = 0;
            }
            else if (this.body[i].y < 0) {
                this.body[i].y = ROWS - 1;
            }
    
        }

    }

    checkCollisions(){

        for(let i = 1; i < this.body.length - 1; i++){

            if(this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y){
                alert("Game Over");
                break;
            }
    
        }

    }

    setPartOfBody(){
        
        this.body.push(structuredClone(this.body[this.body.length - 1]));

        if (this.body[this.body.length - 1].direction === DIRECTIONS.LEFT){
            this.body[this.body.length - 1].x++;
        }
        if (this.body[this.body.length - 1].direction === DIRECTIONS.RIGHT){
            this.body[this.body.length - 1].x--;
        }
        if (this.body[this.body.length - 1].direction === DIRECTIONS.DOWN){
            this.body[this.body.length - 1].y--;
        }
        if (this.body[this.body.length - 1].direction === DIRECTIONS.UP){
            this.body[this.body.length - 1].y++;
        }

    }

    

}