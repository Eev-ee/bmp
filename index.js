const Canvas = require("./class/canvas.js")
const Vector2 = require("./class/vector2.js")
const Color = require("./class/color.js")

const canvas = new Canvas(new Vector2(1920, 1080), new Color(255, 255, 255))

canvas.save("test.bmp")