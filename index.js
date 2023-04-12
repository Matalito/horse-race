const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 720;

function initialDraw() {
    c.fillStyle = 'green'
    c.fillRect(0, 0, canvas.width, canvas.height - 70)
    c.fillStyle = 'brown'
    for (let i = 0; i < 16; i++) {
        c.fillRect(0, 9 + 40 * i, canvas.width, 27)
    }
    c.fillStyle = 'white'
    c.fillRect(canvas.width - 50, 0, 12, canvas.height - 70)
}
initialDraw();

class Runner {
    constructor({ position, color }) {
        this.position = position
        this.velocity = { x: 2 + Math.random() / 6, y: 0 }
        this.height = 25
        this.width = 75
        this.color = color
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        if (this.position.x + this.width >= canvas.width) {
            this.velocity.x = 0
        } else this.position.x += this.velocity.x + Math.random() * Math.random()
    }
}

let raceRunning = false;
const horses = [];
const colors = ['Aqua', 'Black', 'Blue', 'Fuchsia', 'Gray', 'Green', 'Lime', 'Maroon', 'Navy', 'Olive', 'Purple', 'Red', 'Silver', 'Teal', 'White', 'Yellow'];
const finPlace = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th'];
const crossFin = [];
const finTime = [];
const quarterPos = [];
const halfPos = [];
const threeQuarterPos = [];
const finished = [];
const allDone = [];
let currentPos = [];

//Generates the specified amount of horses. Also resets their positions and arrays when reset is called after a race is complete.
function genHorses() {
    if (horses.length !== 0) {
        for (let i = 0; i < horses.length; i++) {
            c.clearRect(horses[i].position.x, horses[i].position.y, horses[i].position.x + horses[i].width, horses[i].position.y + horses[i].height)
        }
        initialDraw()
        horses.length = 0
        crossFin.length = 0
        finTime.length = 0
        quarterPos.length = 0
        halfPos.length = 0
        threeQuarterPos.length = 0
        finished.length = 0
        allDone.length = 0
        currentPos.length = 0
        timer = 0.00
    }
    for (let i = 0; i < 16; i++) {
        horses[i] = new Runner({
            position: {
                x: 0,
                y: 10 + 40 * i
            },
            color: colors[i]
        })
    }
}
genHorses()

//initializes horse icons
function initHorses() {
    for (let i = 0; i < horses.length; i++) {
        horses[i].draw()
    }
}
initHorses();

//defines and runs a timer on screen during the race.
let timer = 0.000
let startTime = '';
function increaseTimer() {
    if (crossFin.length < horses.length) {
    if (raceRunning === true) {
        if (!startTime) {
            startTime = new Date();
            setTimeout(increaseTimer, 5)
        } else {
            let currentTime = new Date();
            timer = (currentTime - startTime) / 1000;
            setTimeout(increaseTimer, 5)
            document.querySelector('#timer').innerHTML = timer.toFixed(3);
        }
    }}
}

//moves the horses.
function run() {
    for (let i = 0; i < horses.length; i++) {
        horses[i].update()
    }
}

//logs each horse's current position and sorts the array.
function checkPosition() {
    for (let i = 0; i < horses.length; i++) {
        currentPos.push(horses[i])
    }
    currentPos.sort((firstItem, secondItem) => secondItem.position.x - firstItem.position.x);
    for (let i = 1; i < horses.length; i++) {
        if (currentPos[i].position.x !== currentPos[i - 1].position.x) {
        } else {
            for (let j = 1; horses.length; j++) {
                if (currentPos[i].position.x !== currentPos[i - j].position.x) {
                }
            }
        }
    }
}

//generate position boxes to report the live position of the horses.
function posBox() {
    for (let i = 0; i < horses.length; i++) {
        if (!document.querySelector('#posDiv' + i)) {
            const posDiv = document.createElement('div');
            posDiv.id = 'posDiv' + i;
            posDiv.className = 'currentPos';
            posDiv.style.left = horses[i].position.x + horses[i].width;
            posDiv.style.top = horses[i].position.y;
            document.body.insertBefore(posDiv, document.getElementById('#posBar'))
        } 
    }
}

//displays the live posotions in the position boxes.
function displayPos() {
    for (let i = 0; i < horses.length; i++) {
        document.querySelector('#posDiv' + i).innerHTML = finPlace[currentPos.indexOf(horses[i])];
    }
} 

//Logs positions at the 1/4 mark.
function checkQuarter() {
    let quarterPosCheck = quarterPos.length
    for (let i = 0; i < horses.length; i++) {
        if (quarterPos.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > (canvas.width - 50) / 4) {
            quarterPos.push(horses[i].color);
        }
    }
    if (quarterPosCheck !== quarterPos.length && quarterPos.length === horses.length) {
        console.log(quarterPos)
    }
}

//Logs positions at the 1/2 mark.
function checkHalf() {
    let halfPosCheck = halfPos.length
    for (let i = 0; i < horses.length; i++) {
        if (halfPos.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > (canvas.width - 50) / 2) {
            halfPos.push(horses[i].color);
        }
    }
    if (halfPosCheck !== halfPos.length && halfPos.length === horses.length) {
        console.log(halfPos)
    }
}

//Logs positions at the 3/4 mark.
function checkThreeQuarter() {
    let threeQuarterPosCheck = threeQuarterPos.length
    for (let i = 0; i < horses.length; i++) {
        if (threeQuarterPos.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > (canvas.width - 50) * 3 / 4) {
            threeQuarterPos.push(horses[i].color);
        }
    }
    if (threeQuarterPosCheck !== threeQuarterPos.length && threeQuarterPos.length === horses.length) {
        console.log(quarterPos)
    }
}

//tracks horses as they cross the finish line and awards positions, checks for ties.
function checkFinish() {
    let crossFinCheck = crossFin.length
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > canvas.width - 50) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 2]) {
                    console.log(horses[i].color + ' finished in ' + finPlace[crossFin.indexOf(horses[i].color)] + ' at ' + timer.toFixed(3) + '!');
                    finished.push(finPlace[crossFin.indexOf(horses[i].color)]);
                    document.querySelector('#FirstPlace').innerHTML = `${finished[0]}: ${crossFin[0]} ${finTime[0]}`;
                    document.querySelector('#SecondPlace').innerHTML = `${finished[1]}: ${crossFin[1]} ${finTime[1]}`;
                    document.querySelector('#ThirdPlace').innerHTML = `${finished[2]}: ${crossFin[2]} ${finTime[2]}`;
                    document.querySelector('#FourthPlace').innerHTML = `${finished[3]}: ${crossFin[3]} ${finTime[3]}`;
                } else {
                    for (let j = 1; finished.length !== crossFin.length; j++) {
                        if (finTime[crossFin.length - 1] !== finTime[crossFin.length - j - 2]) {
                            console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - j] + ' at ' + timer.toFixed(3) + '!');
                            finished.push(finPlace[crossFin.indexOf(horses[i].color) - j]);
                        }
                    }
                }
            }
        }
    }
}

//Allows the horses to reach the end of the screen before stopping.
function checkAllDone() {
    for (let i = 0; i < horses.length; i++) {
        if (allDone.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > canvas.width - 1) {
            allDone.push(horses[i].color);
        }
    }
}


//runs the race. 
function race() {
    if (allDone.length !== horses.length) {
        currentPos = [];
        raceRunning = true
        window.requestAnimationFrame(race)
        initialDraw()
        run()
        checkPosition()
        displayPos()
        checkQuarter()
        checkHalf()
        checkThreeQuarter()
        checkFinish()
        checkAllDone()
    }
}

//Resets the horses.
function restart() {
    initHorses();
    raceRunning = false;
}

//Defines keys. R: start race; T: reset race
window.addEventListener('keydown', (event) => {
    if (event.key === 'r' && raceRunning === false) {
        posBox();      
        race();
        increaseTimer();
    } else if (event.key === 't' && crossFin.length === horses.length) {
        startTime = '';
        genHorses()
        restart()
    }
})