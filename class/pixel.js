const Color = require("./color")
const Vector2 = require("./vector2")

module.exports = class Pixel {
    constructor(position = new Vector2(), color = new Color()) {
        this.position = position
        this.color = color
    }
}