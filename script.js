// Adding platform images
// Adding background image

const list = document.getElementById("list")
list.style.display = ''

/*window.addEventListener("click", () =>{
    const list = document.getElementById("list")
    list.style.display = ""
})*/

let image = new Image()
image.src = './img/Platform_Street.png'

let square = new Image()
square.src = './img/Platform_Square.png'

let genie = new Image()
genie.src = './img/genie.png'

let background = new Image()
background.src = './img/bg.png'

let StandRight = new Image()
StandRight.src = './img/StandRight.png'

let StandLeft = new Image()
StandLeft.src = './img/StandLeft.png'

let WalkRight = new Image()
WalkRight.src = './img/WalkRight.png'

let WalkLeft = new Image()
WalkLeft.src = './img/Walkleft.png'

let JumpRight = new Image()
JumpRight.src = './img/JumpRight.png'

let JumpLeft = new Image()
JumpLeft.src = './img/JumpLeft.png'

// storing the HTML canvas element in a "constant" called canvas

const canvas = document.querySelector('canvas')

const scoreG = document.querySelector('#scoreG')
const scoreH = document.querySelector('#scoreH')
const scoreC = document.querySelector('#scoreC')
const scoreW = document.querySelector('#scoreW')
const scoreB = document.querySelector('#scoreB')

const c = canvas.getContext('2d')

// canvas properties

canvas.width = 1440
canvas.height = 576

//gravity speed

const Gravity = 1   

// Player Creation

class Player {
    constructor() {
        this.speed = 6
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150

        this.image = StandRight
        this.frames = 0

    }

    draw() {
        c.drawImage(
            this.image,
            215 * this.frames,
            0,
            215,
            430,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
        /*c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)*/
    }

    update() {
        this.frames++
        if (this.frames > 28) this.frames = 0
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        // Keep falling and adding Gravity until it's at the bottom of the screen

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += Gravity

    }

}

// platform class
// x and y is where the platform is placed

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height

    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class Platform_Square {
    constructor({ x, y, image: square }) {
        this.position = {
            x,
            y
        }

        this.image = square
        this.width = square.width
        this.height = square.height

    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

// Class for the genie

class npc {
    constructor({ x, y, image: genie }) {
        this.position = {
            x,
            y
        }

        this.image = genie
        this.width = genie.width
        this.height = genie.height
        this.display=""

    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({ x, y, background }) {
        this.position = {
            x,
            y

        }

        this.background = background
        this.width = background.width
        this.height = background.height

    }

    // Replaced the rectangles with an image

    draw() {
        c.drawImage(this.background, this.position.x, this.position.y)
    }
}

// Creating a "player" object and displaying them on the screen

// Creating a "platform" object and displaying them on the screen

// Creating a Genie object and displaying him on the screen

let player = new Player()
let platforms = []
let blueMan = []
let genericObjects = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}


let scrollOffset = 0

// Function to reset the player to the start of the level if they fail

function reset() {

    blueMan = [new npc({ x: 1050 , y: 100, image: genie })]

    player = new Player()

    // Add/edit new platforms from here
    
    platforms = [new Platform({ x: 0, y: 470, image })
        , new Platform({ x: image.width - 3 , y: 470, image }), new Platform({ x: image.width * 2 + 30, y: 470, image }),
    new Platform({ x: image.width * 3 , y: 470, image }), new Platform_Square({ x: image.width * 4+180 , y: 300, image: square })
    ,
    new Platform({ x: image.width * 4.7 + 30, y: 470, image })
    ,
    new Platform({ x: image.width * 5.6 , y: 470, image })
    ,
    new Platform({ x: image.width * 6.6 -5 , y: 470, image })
    
   
    ]

    


    genericObjects = [
        new GenericObject({
            x: 0,
            y: 0,
            background

        })
    ]

    scrollOffset = 0

}


// Animate loop

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })

    blueMan.forEach((blueMan) => {
        blueMan.draw()
    })

    player.update()


    if (keys.right.pressed && player.position.x < 800) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed & scrollOffset === 0 & player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        // Moving platforms and images when the player moves
        // If you want any image to move when the chracter moves add it here
 
        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            blueMan.forEach((blueMan) => {
                blueMan.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => { genericObject.position.x -= player.speed * 0.65 })
        }
        else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            blueMan.forEach((blueMan) => {
                blueMan.position.x += player.speed
            })
            genericObjects.forEach(genericObject => { genericObject.position.x += player.speed * 0.65 })
        }
    }

    //platform collision detection
    platforms.forEach((platform) => {

        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0
        }
    })

    // Win condition

    if (scrollOffset > 2000) {
        console.log("You Win")
    }

    // Lose Condition
    if (player.position.y > canvas.height) {
        reset()
    }

}

reset()
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
            player.velocity.y -= 30
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