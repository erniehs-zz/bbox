const affineMat = (m00, m01, m02, m10, m11, m12) => [m00, m01, m02, m10, m11, m12, 0, 0, 1]

const affineMatIdentity = affineMat(1, 0, 0, 0, 1, 0)

const affineMatToDOMMatrix = (a) => ({ a: a[0], b: a[3], c: a[1], d: a[4], e: a[2], f: a[5] })

const affineMatTrans = (v) => affineMat(1, 0, v[0], 0, 1, v[1])

const affineMatScale = (v) => affineMat(v[0], 0, 0, 0, v[1], 0)

const affineMatRot = (a) => affineMat(Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0)

const affineMatMul = (m1, m2) => affineMat(
    m1[0] * m2[0] + m1[1] * m2[3],
    m1[0] * m2[1] + m1[1] * m2[4],
    m1[0] * m2[2] + m1[1] * m2[5] + m1[2],
    m1[3] * m2[0] + m1[4] * m2[3],
    m1[3] * m2[1] + m1[4] * m2[4],
    m1[3] * m2[2] + m1[4] * m2[5] + m1[5])

const affineMatVecMul = (m, v) => [m[0] * v[0] + m[1] * v[1] + m[2], m[3] * v[0] + m[4] * v[1] + m[5]]