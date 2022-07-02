// storing the HTML canvas element in a "constant" called canvas

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

// changing canvas properties so it fits the whole screen

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//gravity speed

const Gravity = 0.5

// Player Creation

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.y += this.velocity.y
        this.velocity.y += Gravity

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += Gravity
        else this.velocity.y = 0
    }

}



// Creating a "player" object and displaying them on the screen

const player = new Player()


// Gravity

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

}

animate()