
module.exports = class StringBuffer {
    constructor() {
        this.str = ""
    }
    push(string) {
        this.str += string
    }
    string() {
        return this.str;
    }
}