// storing the HTML canvas element in a "constant" called canvas

const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

// canvas properties so it fits the whole screen

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
            y: 0
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

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        // Keep falling and adding Gravity until it's at the bottom of the screen

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += Gravity
        else this.velocity.y = 0
    }

}



// Creating a "player" object and displaying them on the screen

const player = new Player()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}


// Gravity

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else player.velocity.x = 0

}

animate()

//Player Movement

addEventListener("keydown", ({ keyCode }) => {

    switch (keyCode) {

        case 65:
            console.log("left")
            keys.left.pressed = true
            break

        case 83:
            console.log("down")
            break

        case 68:
            console.log("right")
            keys.right.pressed = true
            break

        case 87:
            console.log("up")
            player.velocity.y -= 20
            break
    }

})

addEventListener("keyup", ({ keyCode }) => {

    switch (keyCode) {

        case 65:
            console.log("left")
            keys.left.pressed = false
            break

        case 83:
            console.log("down")
            break

        case 68:
            console.log("right")
            keys.right.pressed = false
            break

        case 87:
            console.log("up")
            player.velocity.y = 0
            break
    }

})