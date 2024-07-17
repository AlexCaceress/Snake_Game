const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const rows = 20;
const columns = 40;

const board = new Array(rows).fill([]);

for(let row = 0; row < board.length; row++){
    board[row] = new Array(columns).fill(0)
}

board[19][39] = 1;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
    
    context.fillStyle = "#73C6B6"
    context.fillRect(0, 0, canvas.width, canvas.height);

    //veure cuadricula

    // for (let y = 0; y < rows; y++) {
    //     for (let x = 0; x < columns; x++) {
    //         context.fillStyle = "red";
    //         context.strokeRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
    //     }
    // }

    board.forEach((row, y) => {

        row.forEach((value, x) => {

            if(value === 1){

                context.fillStyle = "red";
                context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight)

            }

        });

    });


}

update();
