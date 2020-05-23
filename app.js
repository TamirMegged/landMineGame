var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


//Draw Player
var xPlayer = 20;
var yPlayer = 20;
drawPlayer();
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(xPlayer, yPlayer, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}


//Draw Mine
var xMine;
var yMine;
createMine();

function mineXY () {
    xMine = 20 + 20 * Math.ceil(Math.random() * 40);
    yMine = 20 + 20 * Math.ceil(Math.random() * 25);
}

function createMine() {
    mineXY();
    if (xMine < (canvas.width - 20) && yMine < (canvas.height - 20)) {
        ctx.beginPath();
        ctx.arc(xMine, yMine, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    else {
        createMine();
    }
}


//Player Movements
document.addEventListener('keydown', playerMove);
function playerMove(e) {
    //Up
    if (e.code === 'ArrowUp' && yPlayer >= 40) {
        ctx.clearRect(xPlayer - 20, yPlayer - 20, 40, 40);
        yPlayer += -20;
        drawPlayer();
    }
    //Down
    if (e.code === 'ArrowDown' && yPlayer <= canvas.height - 40) {
        ctx.clearRect(xPlayer - 20, yPlayer - 20, 40, 40);
        yPlayer += 20;
        drawPlayer();
    }
    //Right
    if (e.code === 'ArrowRight' && xPlayer <= canvas.width - 40) {
        ctx.clearRect(xPlayer - 20, yPlayer - 20, 40, 40);
        xPlayer += 20;
        drawPlayer();
    }
    //Left
    if (e.code === 'ArrowLeft' && xPlayer >= 40) {
        ctx.clearRect(xPlayer - 20, yPlayer - 20, 40, 40);
        xPlayer += -20;
        drawPlayer();
    }
    //Check if the player stepped on the mine
    setTimeout(boomOrNot, 500);
    
    function boomOrNot() {
        if(xPlayer === xMine && yPlayer === yMine) {
            document.getElementById('gameOver').style.visibility = 'visible';
        }
    }
}

function closeModal() {
    document.getElementById('gameOver').style.visibility = 'hidden';
    createMine();
}