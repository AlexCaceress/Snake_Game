import { DIRECTIONS, ROWS, COLUMNS, START_POSITION_SNAKE} from "./constants";
import { Snake } from "./types/Snake";
import { Board } from "./types/Board";

let snake = new Snake(START_POSITION_SNAKE);
let board = new Board(ROWS, COLUMNS);

let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

let timeMoveSnake = 0;
let lastTime = 0;

let playerDirection = "";

window.addEventListener('resize', resizeCanvas);

document.addEventListener("keydown", (event) => {
    playerDirection = (validateDirection(event.key) || snake.body.length === 1) ? event.key : directionSnake;
});

function resizeCanvas() {
    canvas.width = window.innerWidth - 160;
    canvas.height = window.innerHeight - 80;
    draw();
}

function update(time = 0){

    let deltaTime = time - lastTime;
    lastTime = time;
    timeMoveSnake += deltaTime

    if (timeMoveSnake > 50) {
        snake.moveSnake(playerDirection);
        checkEatApple();
        timeMoveSnake = 0;
    }

    draw()
    window.requestAnimationFrame(update)

}

function draw(){

    const blockWidth = canvas.width / COLUMNS;
    const blockHeight = canvas.height / ROWS;

    context.fillStyle = "#52BE80"
    context.fillRect(0, 0, canvas.width, canvas.height);

    board.getFilledBoxes().forEach((box) => {

        context.fillStyle = "red";
        context.fillRect(box.x * blockWidth, box.y * blockHeight, blockWidth, blockHeight)

    });

    snake.getBody().forEach((part) => {

        context.fillStyle = "green";
        context.fillRect(part.x * blockWidth, part.y * blockHeight, blockWidth, blockHeight);

    });


}

function validateDirection(direction){

    if(direction === DIRECTIONS.DOWN && playerDirection !== DIRECTIONS.UP) return true;
    if(direction === DIRECTIONS.LEFT && playerDirection !== DIRECTIONS.RIGHT) return true;
    if(direction === DIRECTIONS.RIGHT && playerDirection !== DIRECTIONS.LEFT) return true;
    if(direction === DIRECTIONS.UP && playerDirection !== DIRECTIONS.DOWN) return true;

    return false;

}

function checkEatApple(){

    let snakeHeadPos = snake.getHeadPosition();

    if(board.foundApplePosition(snakeHeadPos.x, snakeHeadPos.y)){

        board.deleteApple(snakeHeadPos.x, snakeHeadPos.y);

        snake.setPartOfBody();

        board.generateRandomApple()


    }

}

resizeCanvas();
update();
