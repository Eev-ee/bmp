module.exports = class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
        this.magnitude = Math.hypot(x,  y)
    }
    dot(other) {
        const tx = this.x
        const ty = this.y
        const ox = other.x
        const oy = other.y
        return new Vector2(tx*ox, ty*oy)
    }
}