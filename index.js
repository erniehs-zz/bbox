// immutability be damned!

var ctx = document.getElementById("grid").getContext("2d")

const resize = () => {
    ctx.canvas.width = ctx.canvas.parentElement.clientWidth
    ctx.canvas.height = ctx.canvas.parentElement.clientHeight
}

window.addEventListener("load", () => {
    resize()
})

window.addEventListener("resize", () => {
    resize()
})

ctx.canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

var selected = []
var md = false, shift = false
var mo = [0, 0], mp = [0, 0]
var newThing = null

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Shift":
            if (!shift) {
                newThing = new Thing([mp[0], mp[1]], 0, zerov, 0, com([[mp[0], mp[1]]]))
                shift = true
            }
            break
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "Shift":
            if (shift) {
                if (newThing.tp.length > 2) {
                    newThing.p = com(newThing.tp)
                    newThing.o = centroid(newThing.tp)
                    things.push(newThing)
                }
                newThing = null
            }
            shift = false
            break
    }
})

var newThing

window.addEventListener("mousedown", (e) => {
    mp = [e.clientX, e.clientY]
    if (shift) {
        newThing.tp.push([mp[0], mp[1]])
        newThing.bb = bbox1(newThing.tp)
    } else {
        if (!md) {
            mo = [e.clientX, e.clientY]
            selected = things.filter(t => pinbox(mp, t.bb))
            md = true
        }
    }
})

window.addEventListener("mouseup", (e) => {
    mp = [e.clientX, e.clientY]
    if (shift) {
    } else {
        if (md) {
            selected = []
            md = false
        }
    }
})

window.addEventListener("mousemove", (e) => {
    mp = [e.clientX, e.clientY]
    if (shift) {
    } else {
        if (md) {
            dm = sub(mp, mo)
            selected.forEach(t => t.o = add(t.o, dm))
            mo = mp
        }
    }
})

var things = [
    new Thing([100, 100], 0.0, zerov, 0.5, com([[-20, 5], [10, -7], [15, 10], [-10, 20]])),
    new Thing([750, 300], 0.0, zerov, -4.0, com([[-20, 5], [10, -7], [15, 10], [-10, 20]])),
    new Thing([210, 150], 0.0, zerov, 0, com([[-100, 50], [100, -70], [150, 100], [-100, 200]]))
]

const drawThing = (t, c = false) => {
    ctx.strokeStyle = "white"
    ctx.beginPath()
    ctx.moveTo(t.tp[0][0], t.tp[0][1])
    for (let i = 1; i < t.tp.length; i++) ctx.lineTo(t.tp[i][0], t.tp[i][1])
    c ? ctx.lineTo(mp[0], mp[1]) : ctx.lineTo(t.tp[0][0], t.tp[0][1])
    ctx.stroke()

    ctx.strokeStyle = "yellow"
    ctx.strokeRect(t.bb[0][0], t.bb[0][1], t.bb[1][0] - t.bb[0][0], t.bb[1][1] - t.bb[0][1])

    ctx.strokeStyle = "green"
    ctx.beginPath()
    ctx.moveTo(t.o[0], t.o[1] - 10)
    ctx.lineTo(t.o[0], t.o[1] + 10)
    ctx.moveTo(t.o[0] - 10, t.o[1])
    ctx.lineTo(t.o[0] + 10, t.o[1])
    ctx.stroke()
}

const draw = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    things.forEach(t => drawThing(t))

    if (newThing != null) {
        drawThing(newThing, true)
    }
}

const update = (dt) => {
    things.forEach(t => t.update(dt))
}

var last = performance.now()
var delta = 0

const loop = (t) => {
    window.requestAnimationFrame(loop)
    delta = t - last
    last = t
    update(delta / 1000.0)
    draw()
}

loop(performance.now())
