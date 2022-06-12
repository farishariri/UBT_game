// storing the HTML canvas element in a "constant" called canvas

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

// changing canvas properties so it fits the whole screen

canvas.width = window.innerWidth
canvas.height = window.innerHeight

console.log(c)

// Player Creation

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

// Creating a "player" object and displaying them on the screen

const player = new Player()
player.draw()

// Gravity