const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576
function initialDraw() {
c.fillStyle = 'green'
c.fillRect(0, 0, canvas.width, canvas.height - 70)
c.fillStyle = 'black'
c.fillRect(0, canvas.height - 70, canvas.width, canvas.height)
c.fillStyle = 'brown'
c.fillRect(0, 9, canvas.width, 27)
c.fillRect(0, 49, canvas.width, 27)
c.fillRect(0, 89, canvas.width, 27)
c.fillRect(0, 129, canvas.width, 27)
c.fillStyle = 'white'
c.fillRect(975, 0, 12, canvas.height - 70)
}
initialDraw()

class Sprite {
    constructor({ position, velocity, color }) {
        this.position = position
        this.velocity = velocity
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
        } else this.position.x += this.velocity.x + Math.random()
    }
}

const horse1 = new Sprite({
    position: {
        x: 0,
        y: 10
    },
    velocity: {
        x: 3 + Math.random() / 6,
        y: 0
    },
    color: 'yellow'
})

const horse2 = new Sprite({
    position: {
        x: 0,
        y: 50
    },
    velocity: {
        x: 3 + Math.random() / 6,
        y: 0
    },
    color: 'red'
})

const horse3 = new Sprite({
    position: {
        x: 0,
        y: 90
    },
    velocity: {
        x: 3 + Math.random() / 6,
        y: 0
    },
    color: 'blue'
})

const horse4 = new Sprite({
    position: {
        x: 0,
        y: 130
    },
    velocity: {
        x: 3 + Math.random() / 6,
        y: 0
    },
    color: 'black'
})

const finPlace = ['1st', '2nd', '3rd', '4th'];
const horses = [horse1, horse2, horse3, horse4];
const colors = ['yellow', 'red', 'blue', 'black'];
const crossFin = [];
const finTime = [];

//initializes horse icons
horse1.draw()
horse2.draw()
horse3.draw()
horse4.draw()

//defines and runs a timer on screen during the race.
let timer = 0.00
function increaseTimer() {
    if (crossFin.length < horses.length) {
        setTimeout(increaseTimer, 5)
        timer = timer + 1 / 200;
        document.querySelector('#timer').innerHTML = timer.toFixed(3);
    }
}

let raceRunning = false;

/*
//runs the race. 1st iteration. Unable to account for ties.
function race() {
    let crossFinCheck = crossFin.length
    raceRunning = true
    window.requestAnimationFrame(race)
    c.fillStyle = 'green'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'white'
    c.fillRect(975, 0, 12, canvas.height)
    horse1.update()
    horse2.update()
    horse3.update()
    horse4.update()
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width >= 975) {
            crossFin.push(horses[i].color);
            if (crossFinCheck !== crossFin.length) {
                switch (crossFin.length) {
                    case 1:
                        console.log(horses[i].color + ' finished 1st at ' + timer.toFixed(3) + '!')
                        break
                    case 2:
                        console.log(horses[i].color + ' finished 2nd at ' + timer.toFixed(3) + '!')
                        break
                    case 3:
                        console.log(horses[i].color + ' finished 3rd at ' + timer.toFixed(3) + '!')
                        break
                    case 4:
                        console.log(horses[i].color + ' finished 4th at ' + timer.toFixed(3) + '!')
                        break
                }
            }
        }
    }
} */

/*
//runs the race. 2nd iteration. Accounts for ties. Doesn't account for 3-way ties. (yellow finished 1st, blue tied for 1st, red tied for 2nd, etc.)
function race() {
    let crossFinCheck = crossFin.length
    raceRunning = true
    window.requestAnimationFrame(race)
    initialDraw()
    horse1.update()
    horse2.update()
    horse3.update()
    horse4.update()
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > 975) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 2]) {
                console.log(horses[i].color + ' finished in ' + finPlace[crossFin.indexOf(horses[i].color)] + ' at ' + timer.toFixed(3) + '!');
                } else console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - 1] + ' at ' + timer.toFixed(3) + '!');
            }          
        }
    }
}*/

/*
//runs the race. 2nd iteration modified to check for ties of more than 2 racers. It would not need to be modified to add more horses. However logs them as tied for their position as well as the following position (i.e. yellow finished 1st, red tied for 1st, red finished 2nd, blue tied for 1st, blue tied for 2nd, blue finished 3rd etc.)
function race() {
    let crossFinCheck = crossFin.length
    raceRunning = true
    window.requestAnimationFrame(race)
    initialDraw()
    horse1.update()
    horse2.update()
    horse3.update()
    horse4.update()
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > 975) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                for (let j = 0; j < crossFin.length; j++) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - j - 2]) {
                console.log(horses[i].color + ' finished in ' + finPlace[crossFin.indexOf(horses[i].color)] + ' at ' + timer.toFixed(3) + '!');
                } else console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - 1 - j] + ' at ' + timer.toFixed(3) + '!');
            }    }      
        }
    }
}*/


//runs the race. accounts for any and all ties. needs to be expanded with any increase in horses.
function race() {
    let crossFinCheck = crossFin.length
    raceRunning = true
    window.requestAnimationFrame(race)
    initialDraw()
    horse1.update()
    horse2.update()
    horse3.update()
    horse4.update()
    for (let i = 0; i < horses.length; i++) {
        if (crossFin.includes(horses[i].color) === false && horses[i].position.x + horses[i].width > 975) {
            crossFin.push(horses[i].color);
            finTime.push(timer.toFixed(3));
            if (crossFinCheck !== crossFin.length) {
                if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 2]) {
                console.log(horses[i].color + ' finished in ' + finPlace[crossFin.indexOf(horses[i].color)] + ' at ' + timer.toFixed(3) + '!');
                } else if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 3]) {
                    console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - 1] + ' at ' + timer.toFixed(3) + '!');
                } else if (finTime[crossFin.length - 1] !== finTime[crossFin.length - 4]) {
                    console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - 2] + ' at ' + timer.toFixed(3) + '!');
                } else console.log(horses[i].color + ' finished tied for ' + finPlace[crossFin.indexOf(horses[i].color) - 3] + ' at ' + timer.toFixed(3) + '!');
            }          
        }
    }
}



//currently useless and non-functional attempt to reset the race without needing to refresh.
function restart() {
    horse1.draw()
    horse2.draw()
    horse3.draw()
    horse4.draw()
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