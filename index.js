const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const DIRECTIONS = {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    UP: "ArrowUp",
}

const rows = 20;
const columns = 40;

const board = new Array(rows).fill([]);

for (let row = 0; row < board.length; row++) {
    board[row] = new Array(columns).fill(0)
}

randomApple();

const snake = [{x : 5, y : 5, direction : ""}]

function resizeCanvas() {
    canvas.width = window.innerWidth - 160;
    canvas.height = window.innerHeight - 80;
    draw();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let timeMoveSnake = 0;
let lastTime = 0;

function update(time = 0) {

    let deltaTime = time - lastTime;
    lastTime = time;
    timeMoveSnake += deltaTime

    if (timeMoveSnake > 100) {
        moveSnake();
        timeMoveSnake = 0;
    }

    draw()
    window.requestAnimationFrame(update)
}

function draw() {
    const blockWidth = canvas.width / columns;
    const blockHeight = canvas.height / rows;

    context.fillStyle = "#52BE80"
    context.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {

        row.forEach((value, x) => {

            if (value === 1) {

                context.fillStyle = "red";
                context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight)

            }

        });

    });

    snake.forEach((part) => {

        context.fillStyle = "green";
        context.fillRect(part.x * blockWidth, part.y * blockHeight, blockWidth, blockHeight);

    })


}

let directionSnake = "";
document.addEventListener("keydown", (event) => {
    directionSnake = event.key;
});

function moveSnake() {

    for(let i = snake.length - 1; i > 0; i--){
        
        snake[i].direction = snake[i-1].direction;

        if (snake[i].direction === DIRECTIONS.LEFT){
            snake[i].x--;
        }
        if (snake[i].direction === DIRECTIONS.RIGHT){
            snake[i].x++;
        }
        if (snake[i].direction === DIRECTIONS.DOWN){
            snake[i].y++;
        }
        if (snake[i].direction === DIRECTIONS.UP){
            snake[i].y--;
        }

        
    }

    snake[0].direction = directionSnake;

    if (directionSnake === DIRECTIONS.LEFT){
        snake[0].x--;
    }
    if (directionSnake === DIRECTIONS.RIGHT){
        snake[0].x++;
    }
    if (directionSnake === DIRECTIONS.DOWN){
        snake[0].y++;
    }
    if (directionSnake === DIRECTIONS.UP){
        snake[0].y--;
    }

    checkOutsideMap();
    checkEatApple();

}

function checkOutsideMap() {

    for(let i = 0; i < snake.length; i++){

        if (snake[i].x >= columns) {
            snake[i].x = 0;
        }
        else if (snake[i].x < 0) {
            snake[i].x = columns - 1;
        }
        else if (snake[i].y >= rows) {
            snake[i].y = 0;
        }
        else if (snake[i].y < 0) {
            snake[i].y = rows - 1;
        }

    }

}

function randomApple() {
    board[Math.floor(Math.random() * board.length)][Math.floor(Math.random() * board[0].length)] = 1;
}

function checkEatApple() {

    if (board[snake[0].y][snake[0].x] === 1) {
        
        board[snake[0].y][snake[0].x] = 0;

        snake.push(structuredClone(snake[snake.length - 1]));

        if (snake[snake.length - 1].direction === DIRECTIONS.LEFT){
            snake[snake.length - 1].x++;
        }
        if (snake[snake.length - 1].direction === DIRECTIONS.RIGHT){
            snake[snake.length - 1].x--;
        }
        if (snake[snake.length - 1].direction === DIRECTIONS.DOWN){
            snake[snake.length - 1].y--;
        }
        if (snake[snake.length - 1].direction === DIRECTIONS.UP){
            snake[snake.length - 1].y++;
        }

        randomApple();

    }

}

update();
