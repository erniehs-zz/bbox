const bbox = (p) => {
    var bb = [[p[0][0], p[0][1]], [p[p.length - 1][0], p[p.length - 1][1]]]
    for (let i = 0; i < p.length; i++) {
        if (p[i][0] < bb[0][0]) bb[0][0] = p[i][0]
        if (p[i][0] > bb[1][0]) bb[1][0] = p[i][0]
        if (p[i][1] < bb[0][1]) bb[0][1] = p[i][1]
        if (p[i][1] > bb[1][1]) bb[1][1] = p[i][1]
    }
    return bb
}

class Thing {

    // origin, angle, polygon
    constructor(o, a, p) {
        this.o = o
        this.a = a
        this.p = p
        this.update()
    }

    update() {
        let t = affineMatMul(affineMatTrans(this.o), affineMatRot(this.a))
        this.tp = this.p.map(v => affineMatVecMul(t, v)).map(r => [Math.round(r[0]), Math.round(r[1])])
        this.bb = bbox(this.tp)
    }
}


