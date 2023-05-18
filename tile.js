class Tile {
    constructor(img, edges) {
        this.IMG = img;
        this.EDGES = edges;
    }


    getEdgeRotate(numRotate) {
        let newEdge = [];
        const LEN = this.EDGES.length;

        for (let r = 0; r < LEN; r++) {
            newEdge[r] = this.EDGES[(r - numRotate + LEN) % LEN];
        }

        return newEdge;
    }

    getImageRotate(numRotate) {

        let W = this.IMG.width;
        let H = this.IMG.height;

        const newImg = createGraphics(100, 100);
        newImg.imageMode(CENTER);
        newImg.translate(W / 2, H / 2);
        newImg.rotate(HALF_PI * numRotate);
        newImg.image(this.IMG, 0, 0);

        return newImg;
    }
}