const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1280
canvas.height = 720

function initialDraw() {
    c.fillStyle = 'green'
    c.fillRect(0, 0, canvas.width, canvas.height - 70)
    c.fillStyle = 'black'
    c.fillRect(0, canvas.height - 70, canvas.width, canvas.height)
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
const finished = [];

//Generates the specified amount of horses.
function genHorses() {
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
console.log(horses.length)

//initializes horse icons
function initHorses() {
    for (let i = 0; i < horses.length; i++) {
        horses[i].draw()
    }
}
initHorses();

//defines and runs a timer on screen during the race.
let timer = 0.00
function increaseTimer() {
    if (crossFin.length < horses.length) {
        setTimeout(increaseTimer, 5)
        timer = timer + 1 / 200;
        document.querySelector('#timer').innerHTML = timer.toFixed(3);
    }
}

//runs the race. 
function race() {
    let crossFinCheck = crossFin.length
    raceRunning = true
    window.requestAnimationFrame(race)
    initialDraw()
    for (let i = 0; i < horses.length; i++) {
        horses[i].update()
    }
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > canvas.width - 50) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 2]) {
                    console.log(horses[i].color + ' finished in ' + finPlace[crossFin.indexOf(horses[i].color)] + ' at ' + timer.toFixed(3) + '!');
                    finished.push(finPlace[crossFin.indexOf(horses[i].color)]);
                    document.querySelector('#FirstPlace').innerHTML = `${finished[0]}: ${crossFin[0]} ${finTime[0]}`
                    document.querySelector('#SecondPlace').innerHTML = `${finished[1]}: ${crossFin[1]} ${finTime[1]}`
                    document.querySelector('#ThirdPlace').innerHTML = `${finished[2]}: ${crossFin[2]} ${finTime[2]}`
                    document.querySelector('#FourthPlace').innerHTML = `${finished[3]}: ${crossFin[3]} ${finTime[3]}`
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

//currently useless and non-functional attempt to reset the race without needing to refresh.
function restart() {
    initHorses();
    raceRunning = false;
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'r' && raceRunning === false) {
        race();
        increaseTimer();
    } else if (event.key === 't' && crossFin.length === 4) {
        restart()
    }
    //console.log(event.key)
})