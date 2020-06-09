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
    constructor(o, a, v, w, p) {
        this.o = o
        this.a = a
        this.v = v
        this.w = w
        this.p = p
        this.update(0)
    }

    update(dt) {
        this.o = add(this.o, mul(this.v, dt))
        this.a += this.w * dt
        let t = affineMatMul(affineMatTrans(this.o), affineMatRot(this.a))
        this.tp = this.p.map(v => affineMatVecMul(t, v)).map(r => round(r))
        this.bb = bbox(this.tp)
    }
}


