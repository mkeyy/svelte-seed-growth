export default class Point {
    constructor() {
        this.state = 0;
        this.color = "#fff";
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
}