
//Huge thanks to Foxinatel for these wonderful functions
const toBytes = number => [number >>> 24 & 0xFF, number >>> 16 & 0xFF, number >>> 8 & 0xFF, number & 0xFF]
const fromBytes = bytes => ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0



module.exports = {toBytes, fromBytes}