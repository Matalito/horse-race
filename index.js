const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;
canvas.center = canvas.width / 2;
const posBarHeight = 70
const posBarTop = canvas.height - posBarHeight;
const timerHeight = 50;
const timerWidth = 100;
const finishLine = canvas.width - 50;
let raceRunning = false;
const colors = ['Aqua', 'Black', 'Blue', 'Fuchsia', 'Gray', 'Green', 'Lime', 'Maroon', 'Navy', 'Olive', 'Purple', 'Red', 'Silver', 'Teal', 'White', 'Yellow'];
const finPlace = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th'];
const horses = [];
let currentPos = [];
const quarterPos = [];
const halfPos = [];
const threeQuarterPos = [];
const crossFin = [];
const finTime = [];
const posAssigned = [];
const allDone = [];
let startTime = '';
let timer = 0.000;

//draws the racing field and position bar.
function initialDraw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, posBarTop);
    ctx.fillStyle = 'brown';
    for (let i = 0; i < 16; i++) {
        ctx.fillRect(0, 9 + 40 * i, canvas.width, 27);
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(finishLine, 0, 5, posBarTop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, posBarTop, canvas.width, posBarHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.center - timerWidth / 2, posBarTop + (posBarHeight - timerHeight) / 2, timerWidth, timerHeight)
}
initialDraw();

class Runner {
    constructor({ position, color }) {
        this.position = position;
        this.velocity = { x: 2 + Math.random() / 4, y: 0 };
        this.height = 25;
        this.width = 75;
        this.color = color;
    }

    draw() {
        this.horseNose = this.position.x + this.width;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        ctx.fillStyle = 'goldenrod';
        ctx.fillRect(this.position.x - 45, this.position.y + 2, 40, 21);
        if (this.horseNose >= canvas.width) {
            this.velocity.x = 0;
        } else this.position.x += this.velocity.x + Math.random() * (Math.random());
    }
}

//Generates the specified amount of horses. Also resets their positions when reset is called after a race is complete.
function genHorses() {
    if (horses.length !== 0) {
        for (let i = 0; i < horses.length; i++) {
            ctx.clearRect(horses[i].position.x, horses[i].position.y, horses[i].width, horses[i].height);
        }
    }
    for (let i = 0; i < 16; i++) {
        horses[i] = new Runner({
            position: {
                x: 0,
                y: 10 + 40 * i
            },
            color: colors[i]
        })
        horses[i].draw();
    }
}
genHorses();

//defines and places a timer on screen during the race.
function displayTimer() {
    ctx.fillStyle = 'black';
    ctx.font = "25px Trebuchet MS"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timer.toFixed(3), canvas.center, posBarTop + posBarHeight / 2);
}
displayTimer();

//runs the timer.
function increaseTimer() {
    if (!startTime) {
        startTime = Date.now();
    } else if (crossFin.length < horses.length) {
        let currentTime = Date.now();
        timer = (currentTime - startTime) / 1000;
    }
}

//moves the horses.
function run() {
    for (let i = 0; i < horses.length; i++) {
        horses[i].update();
    }
}

//logs each horse's current position and sorts the array.
function checkPosition() {
    for (let i = 0; i < horses.length; i++) {
        currentPos.push(horses[i]);
    }
    currentPos.sort((firstItem, secondItem) => secondItem.position.x - firstItem.position.x);
}

//Logs positions at the 1/4 mark.
function checkQuarter() {
    let quarterPosCheck = quarterPos.length;
    for (let i = 0; i < horses.length; i++) {
        if (quarterPos.includes(horses[i].color) === false && horses[i].horseNose > (finishLine) / 4) {
            quarterPos.push(horses[i].color);
        }
    }
    if (quarterPosCheck !== quarterPos.length && quarterPos.length === horses.length) {
        console.log(quarterPos);
    }
}

//Logs positions at the 1/2 mark.
function checkHalf() {
    let halfPosCheck = halfPos.length;
    for (let i = 0; i < horses.length; i++) {
        if (halfPos.includes(horses[i].color) === false && horses[i].horseNose > (finishLine) / 2) {
            halfPos.push(horses[i].color);
        }
    }
    if (halfPosCheck !== halfPos.length && halfPos.length === horses.length) {
        console.log(halfPos);
    }
}

//Logs positions at the 3/4 mark.
function checkThreeQuarter() {
    let threeQuarterPosCheck = threeQuarterPos.length;
    for (let i = 0; i < horses.length; i++) {
        if (threeQuarterPos.includes(horses[i].color) === false && horses[i].horseNose > (finishLine) * 3 / 4) {
            threeQuarterPos.push(horses[i].color);
        }
    }
    if (threeQuarterPosCheck !== threeQuarterPos.length && threeQuarterPos.length === horses.length) {
        console.log(threeQuarterPos);
    }
}

//tracks horses as they cross the finish line and awards positions, checks for ties.
function checkFinish() {
    let crossFinCheck = crossFin.length;
    for (let i = 0; i < horses.length; i++) {
        if (horses[i].horseNose > finishLine && !crossFin.includes(horses[i].color)) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 2]) {
                    posAssigned.push(finPlace[crossFin.indexOf(horses[i].color)]);
                } else {
                    for (let j = 1; posAssigned.length !== crossFin.length; j++) {
                        if (finTime[crossFin.length - 1] !== finTime[crossFin.length - j - 2]) {
                            posAssigned.push(finPlace[crossFin.indexOf(horses[i].color) - j]);
                        }
                    }
                }
            }
        }
    }
}

//displays current positions next to each horse during the race.
function displayPos() {
    ctx.fillStyle = 'black';
    ctx.font = "17px Trebuchet MS"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < horses.length; i++) {
        if (horses[i].horseNose < finishLine) {
            ctx.fillText(finPlace[currentPos.indexOf(horses[i])], horses[i].position.x - 27, horses[i].position.y + 13);
        } else ctx.fillText(posAssigned[crossFin.indexOf(horses[i].color)], horses[i].position.x - 25, horses[i].position.y + 13);
    }
}

//Allows the horses to reach the end of the screen before stopping.
function checkAllDone() {
    for (let i = 0; i < horses.length; i++) {
        if (allDone.includes(horses[i].color) === false && horses[i].horseNose > canvas.width - 1) {
            allDone.push(horses[i].color);
        }
    }
}

function finalResults() {
        for (let i = 0; i < horses.length; i++) {
            setTimeout(() => {
            ctx.fillStyle = 'goldenrod';
            ctx.strokeStyle = 'black';
            ctx.strokeRect(canvas.center - 200, 5 + ((canvas.height - posBarHeight - 10) / horses.length) * i, 400, (canvas.height - posBarHeight - 10) / horses.length);
            ctx.fillRect(canvas.center - 200, 5 + ((canvas.height - posBarHeight - 10) / horses.length) * i, 400, (canvas.height - posBarHeight - 10) / horses.length);
            ctx.fillStyle = crossFin[i];
            ctx.fillText(crossFin[i] + ' finished in ' + posAssigned[i] + ' at ' + finTime[i] + '!', canvas.center, 25 + ((canvas.height - posBarHeight - 10) / horses.length) * i);
        }, 500 * (i + 1));
    }
}

//runs the race. 
function race() {
    if (allDone.length !== horses.length) {
        currentPos = [];
        raceRunning = true;
        initialDraw();
        run();
        checkPosition();
        checkQuarter();
        checkHalf();
        checkThreeQuarter();
        checkFinish();
        displayPos();
        checkAllDone();
        increaseTimer();
        displayTimer();
        setTimeout(race, 10);
    } else finalResults();
}

//Resets the horses and arrays.
function restart() {
    initialDraw();
    raceRunning = false;
    horses.length = 0;
    currentPos.length = 0;
    quarterPos.length = 0;
    halfPos.length = 0;
    threeQuarterPos.length = 0;
    crossFin.length = 0;
    finTime.length = 0;
    posAssigned.length = 0;
    allDone.length = 0;
    startTime = '';
    timer = 0.000;
    displayTimer();
    genHorses();
}

//Defines keys. R: start race; T: reset race
window.addEventListener('keydown', (event) => {
    if (event.key === 'r' && raceRunning === false) {
        race();
    } else if (event.key === 't' && allDone.length === horses.length) {
        restart();
    }
})