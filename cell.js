class Cell {
    constructor(r, c, num_options) {

        this.isCollapsed = false;
        this.indx = createVector(r, c);
        this.options = new Array(num_options).fill(0).map((_, indx) => { return indx });
    }
}