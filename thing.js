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
        this.bb = bbox1(this.tp)
    }
}
