const bbox1 = (p) => {
    var bb = [[p[0][0], p[0][1]], [p[p.length - 1][0], p[p.length - 1][1]]]
    for (let i = 0; i < p.length; i++) {
        if (p[i][0] < bb[0][0]) bb[0][0] = p[i][0]
        if (p[i][0] > bb[1][0]) bb[1][0] = p[i][0]
        if (p[i][1] < bb[0][1]) bb[0][1] = p[i][1]
        if (p[i][1] > bb[1][1]) bb[1][1] = p[i][1]
    }
    return bb
}

const bbox2 = (p) => p.reduce((p, c) => [[Math.min(c[0], p[0][0]), Math.min(c[1], p[0][1])], [Math.max(c[0], p[1][0]), Math.max(c[1], p[1][1])]], [[Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER], [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]])

// which is quicker?
const rand = (max) => Math.floor(Math.random() * Math.floor(max))

const rubbish_shuffle = (a, c = 1 + rand(a.length * 2)) => {
    var arry = a.slice(0)
    for(let i = 0; i < c; i++) {
        let r = rand(a.length)
        arry = arry.splice(r).concat(arry.splice(0, r)) 
    }
    return arry
}

// unless mistaken bbox1 is quicker by a little bit...  for a consistent shuffle count for same size arry...
const bbox_speed_test = (p, i) => {

    console.time("bbox1")
    for(let c = 0; c < i; c++) bbox1(rubbish_shuffle(p, 10))
    console.timeEnd("bbox1")

    console.time("bbox2")
    for(let c = 0; c < i; c++) bbox2(rubbish_shuffle(p, 10))
    console.timeEnd("bbox2")
}