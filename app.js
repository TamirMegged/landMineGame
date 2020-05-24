var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let level = 1;

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

//Draw Finish Spot
drawFinish();
function drawFinish() {
    ctx.fillStyle = 'navy';
    ctx.fillRect(canvas.width - 40, canvas.height - 40, 40, 40);
}

//Draw Mine
var minesNum = 3;
let xMine = [];
let yMine = [];
createMine();

function mineXY () {
    for (var index = 0; index < minesNum; index++) {
        xMine[index] = 20 * Math.ceil(Math.random() * 40);
        yMine[index] = 20 * Math.ceil(Math.random() * 25);
    }
}

function createMine() {
    mineXY();
    for (var index = 0; index < minesNum; index++) {
        let stop = 0;
        while (stop === 0) {
            if (xMine[index] < (canvas.width - 40) && yMine[index] < (canvas.height - 40) && xMine !== 20 && yMine !== 20) {
                ctx.beginPath();
                ctx.arc(xMine[index], yMine[index], 20, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                // ctx.fillStyle = 'rgb(252, 225, 152)';
                ctx.fill();
                stop = 1;
            } else {
                xMine[index] = 20 + 20 * Math.ceil(Math.random() * 40);
                yMine[index] = 20 + 20 * Math.ceil(Math.random() * 25);
            }
        }
    }
}


//Player Movements
document.addEventListener('keydown', playerMove);
function playerMove(e) {
    if (document.getElementById('gameOver').style.visibility === 'visible' || document.getElementById('levelFinished').style.visibility === 'visible') {
        return;
    }
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

    //Check if the player stepped on the mine and if he finished the level
    boomOrFinish();
    
    function boomOrFinish() {
        //Check Game Over
        for (var index = 0; index < minesNum; index++) {
            if(xPlayer === xMine[index] && yPlayer === yMine[index]) {
                document.getElementById('gameOver').style.visibility = 'visible';
            }
        }

        //Check Level Finished
        if(xPlayer === canvas.width - 20 && yPlayer === canvas.height - 20) {
            document.getElementById('levelXFinished').innerText = `Level ${level} Finished`;
            document.getElementById('levelFinished').style.visibility = 'visible';
            level++;
        }
    }
}

//Close Game Over Alert
function closeGameOver() {
    document.getElementById('gameOver').style.visibility = 'hidden';
    minesNum = 3;
    level = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createMine();
    xPlayer = 20;
    yPlayer = 20;
    drawPlayer();
    drawFinish();
}

//Close Level Finished Alert
function closeLevelFinished() {
    document.getElementById('levelFinished').style.visibility = 'hidden';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'navy';
    ctx.fillRect(canvas.width - 40, canvas.height - 40, 40, 40);
    xPlayer = 20;
    yPlayer = 20;
    drawPlayer();
    add2Mines();
}

//Next Level Mines
function add2Mines() {
    minesNum += 3;
    xMine = [];
    yMine = [];
    createMine();
}