/*  Michael Steenkamp
*   11/05/2023
*   Wave Function Collapse MK.1
*
*   Language: 
*           JavaScript
*   Library:
*           p5.js
*   Sources:
*           https://www.youtube.com/watch?v=rI_y2GAlQFM&t=2023s
*           https://www.boristhebrave.com/2020/04/13/wave-function-collapse-explained/
*   Description:
*              This program is the first edition of my implementation
*              of the pattern generation algorithm - Wave Function Collapse
*/

/* ARCHITECTURE */

/* GRID */
// • Used to store a list of cells

/* CELL */
// • Used to store each cell status and options.

/* TILE */
// • Used to store all the tile images and their edge sockets




/* PREREQUISITE SETUP */

/* IMAGES */
// • Each tile image should be named 0,1,2,...
// • Path (PATH) name should be changed inside function preload.
// • Extention (EXT) name should be changed inside function preload.
// • Number of images (COUNT) should be changed inside function preload.

/* EDGES */
// • Each tile edge should be inserted as a 2D-Array [tile][edge].
// • Outer Array: reference tile ex. EDGE[x] == tile[x].
// • Inner Array: reference edge ex. EDGE[x][0] == tile[X] top edge.
// • Edge socket type marked by letter, 3 letters/sockets per edge.


/* GLOBAL VARIABLES */
let canvasWidth = {};
let canvasHeight = {};
const DIM = 50;

let tiles = [];

const EDGES = [
  ["AAA", "AAA", "AAA", "AAA"],
  ["ABA", "ABA", "AAA", "ABA"],
  ["ABA", "ABA", "ABA", "AAA"],
  ["AAA", "ABA", "ABA", "ABA"],
  ["ABA", "AAA", "ABA", "ABA"],
]

function preload() {
  const PATH = "images/";
  const EXT = ".png";
  const COUNT = 5;

  for (let i = 0; i < COUNT; i++) {
    let img = loadImage(`${PATH}${i}${EXT}`);
    tiles[i] = new Tile(img, EDGES[i]);
  }
}

function windowResized() {
  clear();
  canvasWidth = windowHeight;
  canvasHeight = windowHeight;

  createCanvas(canvasWidth, canvasHeight);

  draw();
}

function setup() {
  canvasWidth = windowHeight;
  canvasHeight = windowHeight;

  createCanvas(canvasWidth, canvasHeight);

  this.grid = [];

  initializeGrid();
}

function draw() {
  background(0);
  drawGrid();

  getNextGeneration();
  // noLoop();
}

function mouseClicked() {
  background(0);
  getNextGeneration();

  drawGrid();
}

function initializeGrid() {

  for (let r = 0; r < DIM; r++) {
    for (let c = 0; c < DIM; c++) {

      const INDX = r + c * DIM;
      this.grid[INDX] = new Cell(r, c, tiles.length);
    }
  }
}

function drawGrid() {

  const W = canvasWidth / DIM;
  const H = canvasHeight / DIM;

  for (let r = 0; r < DIM; r++) {
    for (let c = 0; c < DIM; c++) {

      const INDX = r + c * DIM;
      const CELL = this.grid[INDX];

      if (CELL.isCollapsed) {

        try {
          image(tiles[CELL.options[0]].img, c * W, r * H, W, H);
        }
        catch (ERR) {
          console.log(ERR);
        }

      } else {

        push();
        stroke(255, 100);
        fill(0);
        rect(c * W, r * H, W, H);
        pop();

      }

    }
  }
}


function getNextGeneration() {
  let gridCopy = this.grid.slice(0);

  //sort
  gridCopy = gridCopy.filter((_, i) => { return !gridCopy[i].isCollapsed; });

  if (gridCopy.length != 0) {
    gridCopy.sort((a, b) => { return a.options.length - b.options.length; });

    //get least entropy
    const BASELINE = gridCopy[0].options.length;
    gridCopy = gridCopy.filter((_, i) => { return gridCopy[i].options.length == BASELINE; });

    //collapse random
    const CELL = random(gridCopy);

    if (CELL.options.length == 0) {

      initializeGrid();
      console.log("FAILED");

    } else {

      CELL.options = [random(CELL.options)];
      CELL.isCollapsed = true;

      //propogate
      propogateEntropy(CELL);
    }
  } else {
    noLoop();
    console.log("DONE");
  }
}

function propogateEntropy(CELL) {


  //North
  if (CELL.indx.x != 0) {
    let newOptions = [];

    const INDX_N = (CELL.indx.x - 1) + CELL.indx.y * DIM;
    const CELL_N = this.grid[INDX_N];

    if (!CELL_N.isCollapsed) {

      for (let option of CELL_N.options) {

        const CELL_SOCKET = EDGES[CELL.options[0]][0];
        const CELL_N_SOCKET = EDGES[option][2];

        if (reverseSocket(CELL_N_SOCKET) == CELL_SOCKET) {
          newOptions.push(option);
        }
      }

      CELL_N.options = newOptions;

      // if (CELL_N.options.length == 1) {
      //   CELL_N.isCollapsed = true;
      // }
    }

    // console.log(CELL_N);
  }

  //East
  if (CELL.indx.y != DIM - 1) {
    let newOptions = [];

    const INDX_E = CELL.indx.x + (CELL.indx.y + 1) * DIM;
    const CELL_E = this.grid[INDX_E];

    if (!CELL_E.isCollapsed) {

      for (let option of CELL_E.options) {

        // Comparing CELL right socket with CELL E right socket
        const CELL_SOCKET = EDGES[CELL.options[0]][1];
        const CELL_E_SOCKET = EDGES[option][3];

        if (reverseSocket(CELL_E_SOCKET) == CELL_SOCKET) {
          newOptions.push(option);
        }
      }

      CELL_E.options = newOptions;

      // if (CELL_E.options.length == 1) {
      //   CELL_E.isCollapsed = true;
      // }
    }
    // console.log(CELL_E);
  }

  //South
  if (CELL.indx.x != DIM - 1) {
    let newOptions = [];

    const INDX_S = (CELL.indx.x + 1) + CELL.indx.y * DIM;
    const CELL_S = this.grid[INDX_S];

    if (!CELL_S.isCollapsed) {

      for (let option of CELL_S.options) {

        const CELL_SOCKET = EDGES[CELL.options[0]][2];
        const CELL_S_SOCKET = EDGES[option][0];

        if (reverseSocket(CELL_S_SOCKET) == CELL_SOCKET) {
          newOptions.push(option);
        }
      }

      CELL_S.options = newOptions;

      // if (CELL_S.options.length == 1) {
      //   CELL_S.isCollapsed = true;
      // }
    }

    // console.log(CELL_S);
  }

  //West
  if (CELL.indx.y != 0) {
    let newOptions = [];

    const INDX_W = CELL.indx.x + (CELL.indx.y - 1) * DIM;
    const CELL_W = this.grid[INDX_W];

    if (!CELL_W.isCollapsed) {

      for (let option of CELL_W.options) {

        const CELL_SOCKET = EDGES[CELL.options[0]][3];
        const CELL_W_SOCKET = EDGES[option][1];

        if (reverseSocket(CELL_W_SOCKET) == CELL_SOCKET) {
          newOptions.push(option);
        }
      }

      CELL_W.options = newOptions;

      // if (CELL_W.options.length == 1) {
      //   CELL_W.isCollapsed = true;
      // }
    }

    // console.log(CELL_W);
  }



  function reverseSocket(socket) {
    let socketArr = socket.split("");
    socketArr = reverse(socketArr);
    return socketArr.join("");
  }
}


