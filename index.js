const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
let appleVal = false;

const rows = 20;
const columns = 40;

const board = new Array(rows).fill([]);

for(let row = 0; row < board.length; row++){
    board[row] = new Array(columns).fill(0)
}

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

function update(){
    draw()
    window.requestAnimationFrame(update)
}

function draw() {
    const blockWidth = canvas.width / columns;
    const blockHeight = canvas.height / rows;

    context.fillStyle = "#52BE80"
    context.fillRect(0, 0, canvas.width, canvas.height);

    //veure cuadricula

    // for (let y = 0; y < rows; y++) {
    //     for (let x = 0; x < columns; x++) {
    //         context.fillStyle = "red";
    //         context.strokeRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
    //     }
    // }

    randomApple();

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

document.addEventListener("keydown", (event) => {

    if(event.key === "ArrowLeft") snake.position.x--;
    if(event.key === "ArrowRight") snake.position.x++;
    if(event.key === "ArrowDown") snake.position.y++;
    if(event.key === "ArrowUp") snake.position.y--;
    
    checkOutsideMap();
    playerEatApple();

});

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

    if(!appleVal){
        board[Math.floor(Math.random() * board.length)][Math.floor(Math.random() * board[0].length)] = 1;
        appleVal = true;
    }

}

function playerEatApple(){

    if(board[snake.position.y][snake.position.x] === 1){
        board[snake.position.y][snake.position.x] = 0;
        appleVal = false;
    }

}

update();
