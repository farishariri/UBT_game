const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

console.log(c)

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

        this.width = 100
        this.height = 100
    }

    draw() {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const player = new Player()
player.draw()

//
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.hight)
    PLayer.update()
}