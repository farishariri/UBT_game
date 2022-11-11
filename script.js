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

let genieDialogue = new Image()
genieDialogue.src = './img/genieDialogue.png'

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

// Text Box

var container = document.querySelector(".text");

var speeds ={
pause: 500, //Higher number = longer delay
   slow: 120,
   normal: 90,
   fast: 40,
   superFast: 10
}

// Add dialogue text here!!!

var textLines =[
    {string: "Hey!", speed: speeds.normal},
    {string: "Whats Up", speed: speeds.fast}
]

var characters = [];

// Adds space between words

textLines.forEach((line, index) => {
   
    if (index < textLines.length - 1) {
      line.string += " "; //Add a space between lines
   }

   // Split each letter and display it as a span

   line.string.split("").forEach((character) => {
      
      var span = document.createElement("span");
      span.textContent = character;
      container.appendChild(span);
      
      characters.push({
         span: span,
         isSpace: character === " " && !line.pause,
         
         // Speed of text being shown
         delayAfter: line.speed,
         
         // Add classes to spans
         classes: line.classes || []

      });
   });
});

function revealOneCharacter(list) {
   
   // Take the first character in the word and select it  
   var next = list.splice(0, 1)[0];

   // Add a class revealed to spans so CSS can be applied to it and change opacity
   next.span.classList.add("revealed");
   next.classes.forEach((c) => {
      next.span.classList.add(c);
   });
   var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

   if (list.length > 0) {
      setTimeout(function () {
         revealOneCharacter(list);
      }, delay);
   }
}

//Kick it off
setTimeout(() => {
   revealOneCharacter(characters);   
}, 600)




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

class buttonGreen {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 80

    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.fillStyle = '#B05252'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class buttonBlue {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 80

    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.fillStyle = '#428ED6'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
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
    }
    
    

    // Replaced the rectangles with an image

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

/*let text = document.createElement("p");
let node = document.createTextNode("Hey there little Fella! So you going to college huh? You want some help with picking your major? keep playing and we will figue that out :)");
text.appendChild(node);

let element = document.getElementById("text");
element.appendChild(text);

document.getElementById("text").style.marginLeft = "320px"
document.getElementById("text").style.marginBottom = "317px"*/


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
let buttons = []
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

    buttons = [new buttonGreen({ x: 1581 , y:220}), new buttonBlue({ x: 2100 , y:220})]

    player = new Player()

    // Add/edit new platforms from here
    
    platforms = [new Platform({ x: 0, y: 470, image })
        , new Platform({ x: image.width - 3 , y: 470, image }), new Platform({ x: image.width * 2 - 5, y: 470, image }),
    new Platform({ x: image.width * 3 - 7, y: 470, image }), new Platform_Square({ x: image.width * 4+180 , y: 300, image: square })
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
    
    buttons.forEach((buttons) => {
        buttons.draw()
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
            buttons.forEach((buttons) => {
                buttons.position.x -= player.speed
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
            
            buttons.forEach((buttons) => {
                buttons.position.x += player.speed
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

    buttons.forEach((buttons) => {

        if (player.position.y + player.height <= buttons.position.y &&
            player.position.y + player.height + player.velocity.y >= buttons.position.y &&
            player.position.x + player.width >= buttons.position.x &&
            player.position.x <= buttons.position.x + buttons.width
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
            
        case 70:
            console.log("Hide text")
            var box = document.querySelector('.dBox')
            box.style.display='none'
            var textBox = document.querySelector('.text')
            textBox.style.display='none'
            break
            
        case 71:
            console.log("show text")
            var box = document.querySelector('.dBox')
            box.style.display=''
            var textBox = document.querySelector('.text')
            textBox.style.display=''
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


