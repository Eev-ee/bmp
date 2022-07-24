const Pixel = require("./pixel.js")
const Vector2 = require("./vector2.js")
const Color = require("./color.js")
const StringBuffer = require("./string.js")

const {toBytes, fromBytes} = require("../util/bytes.js")
const fs = require("fs-extra")

const roundToFour = num => num + (4 - num)%4
const ToBytes = num => String.fromCharCode(...toBytes(num))


module.exports = class Canvas {
    constructor(size = new Vector2(), color = new Color()) {
        this.pixels = []

        this.size = size
        this.color = color

        for (let x = 1; x < size.x; x++) {
            for (let y = 1; y < size.y; y++) {
                this.pixels[x - 1] ||= []
                this.pixels[x - 1][y - 1] ||= []
                this.pixels[x - 1][y - 1] = new Pixel(new Vector2(x, y), color)
            }
        }
    }

    writePixel(pixel) {
        this.pixels[pixel.position.x - 1][pixel.position.y - 1] = pixel
    }

    save(path) {
        const startTime = Date.now()
        const data = new StringBuffer()
        const fileSize = this.size.x*this.size.y*3
        const roundedFileSize = roundToFour(fileSize)
        const difference = roundedFileSize - fileSize

        //Header (14)
        data.push("BM")
        data.push(ToBytes(54 + fileSize))
        data.push(ToBytes(0))
        data.push(ToBytes(54))

        //InfoHeader (40)
        data.push(ToBytes(40))
        data.push(ToBytes(this.size.x))
        data.push(ToBytes(this.size.y))
        data.push(String.fromCharCode(0, 1))
        data.push(String.fromCharCode(0, 24))
        data.push(ToBytes(0))
        data.push(ToBytes(fileSize))
        data.push(ToBytes(0))
        data.push(ToBytes(0))
        data.push(ToBytes(0))
        data.push(ToBytes(0))

        //ColorTable is skipped cuz we use 24bit RGB, PixelData time!
        for (let x = 1; x < this.size.x; x++) {
            for (let y = 1; y < this.size.y; y++) {
                const pixel = this.pixels[x - 1][y - 1]
                const r = Math.round(pixel.color.r)
                const g = Math.round(pixel.color.g)
                const b = Math.round(pixel.color.b)
                data.push(String.fromCharCode(b, g, r))
            }
            data.push(difference)
        }

        fs.writeFile(path, data.string()).catch(error => {
            console.error(error)
        }).then(() => {
            console.log(`Success!, took ${(Date.now() - startTime)/1000} seconds`)
        })
    }
}