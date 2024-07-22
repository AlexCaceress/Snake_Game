const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const DIRECTIONS = {
    LEFT : "ArrowLeft",
    RIGHT : "ArrowRight",
    DOWN : "ArrowDown",
    UP : "ArrowUp",
}

const rows = 20;
const columns = 40;

const board = new Array(rows).fill([]);

for(let row = 0; row < board.length; row++){
    board[row] = new Array(columns).fill(0)
}

randomApple();

const snake = {
    position : {x : 5, y : 5},
    shape : [
        [1]
    ]
}


function resizeCanvas() {
    canvas.width = window.innerWidth - 160;
    canvas.height = window.innerHeight - 80;
    draw();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let timeMoveSnake = 0;
let lastTime = 0;

function update(time = 0){

    let deltaTime = time - lastTime;
    lastTime = time;
    timeMoveSnake += deltaTime

    if(timeMoveSnake > 100){
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

            if(value === 1){

                context.fillStyle = "red";
                context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight)

            }

        });

    });

    snake.shape.forEach((row, y) => {

        row.forEach((value, x) => {
            
            if(value === 1){

                context.fillStyle = "green";
                context.fillRect((x + snake.position.x) * blockWidth, (y + snake.position.y) * blockHeight, blockWidth, blockHeight);

            }

        });

    });


}

let directionSnake = "";
document.addEventListener("keydown", (event) => {
    directionSnake = event.key;
});

function moveSnake(){

    if(directionSnake === DIRECTIONS.LEFT) snake.position.x--;
    if(directionSnake === DIRECTIONS.RIGHT) snake.position.x++;
    if(directionSnake === DIRECTIONS.DOWN) snake.position.y++;
    if(directionSnake === DIRECTIONS.UP) snake.position.y--;

    checkOutsideMap();
    checkEatApple();
}

function checkOutsideMap(){

    if(snake.position.x >= columns){
        snake.position.x = 0;
    }
    else if(snake.position.x < 0){
        snake.position.x = columns - 1;
    }
    else if(snake.position.y >= rows){
        snake.position.y = 0;
    }
    else if(snake.position.y < 0){
        snake.position.y = rows - 1;
    }

}

function randomApple(){
    board[Math.floor(Math.random() * board.length)][Math.floor(Math.random() * board[0].length)] = 1;
}

function checkEatApple(){

    if(board[snake.position.y][snake.position.x] === 1){
        board[snake.position.y][snake.position.x] = 0;
        randomApple();
    }

}

update();
