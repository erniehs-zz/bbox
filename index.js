var ctx = document.getElementById("grid").getContext("2d")

const resize = () => {
    ctx.canvas.width = ctx.canvas.parentElement.clientWidth
    ctx.canvas.height = ctx.canvas.parentElement.clientHeight
}

window.addEventListener("load", () => {
    resize()
    draw()
})

window.addEventListener("resize", () => {
    resize()
    draw() // TODO throttle
})

var last = performance.now()
var delta = 0
var ball = { x: 100, y: 100 }
var bv = { x: 10, y: -5 }

var things = [
    new Thing([100, 100], 0.1, [[-20, 5], [10, -7], [15, 10], [-10, 20]]),
    new Thing([750, 300], 0.2, [[-20, 5], [10, -7], [15, 10], [-10, 20]]),
    new Thing([200, 150], 0, [[-10, 5], [10, -7], [15, 10], [-10, 20]])
]

const draw = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    things.forEach(t => {
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(t.tp[0][0], t.tp[0][1])
        for (let i = 1; i < t.p.length; i++) ctx.lineTo(t.tp[i][0], t.tp[i][1])
        ctx.lineTo(t.tp[0][0], t.tp[0][1])
        ctx.stroke()
        ctx.strokeStyle = "yellow"
        ctx.strokeRect(t.bb[0][0], t.bb[0][1], t.bb[1][0] - t.bb[0][0], t.bb[1][1] - t.bb[0][1])
    })
}

const update = (dt) => {
    things.forEach(t => {
        t.a += 0.05
        t.update()
    })
}

const loop = (t) => {
    window.requestAnimationFrame(loop)
    delta = t - last
    last = t
    update(delta / 1000.0)
    draw()
}

loop(performance.now())