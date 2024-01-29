
let grid;
let w = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  cols = width / w;
  rows = height / w;
  grid = create2dArray(cols, rows)
  
  for(i = 0; i < cols; i++){
    for(j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  
  grid[10][10] = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255)
  text('p5*js', 100, 100);
  
  for(i = 0; i < cols; i++){
    for(j = 0; j < rows; j++) {
      // stroke(255)

      fill(grid[i][j] * 255)

      x = i * w;
      y = j * w;
      square(x, y, w)
    }
  }
  
  // Create new grid for next frame
  let nextGrid = create2dArray(cols, rows)
  
  for(i = 0; i < cols; i++) {
    for(j = 0; j < rows; j++) {
      let state = grid[i][j];
      
      // Determine where next dot will go
      if(state === 1) {
        let below = grid[i][j + 1];
        let belowBelow = grid[i][j + 2];
        let belowL = grid[i - 1] && grid[i - 1][j + 1];
        let belowR = grid[i + 1] && grid[i + 1][j + 1];
        
        const direction = random([1, -1])

        if(below === 0) {
          nextGrid[i][j + 1] = 1;
        } else if (belowBelow === 0) {
          nextGrid[i][j + 1] = 1;
        } else if (belowL === 0 && belowR === 0) {
          nextGrid[i + direction][j + 1] = 1;
        } else if(belowL === 0) {
          nextGrid[i - 1][j + 1] = 1;
        } else if(belowR === 0) {
          nextGrid[i + 1][j + 1] = 1;
        } else {
          nextGrid[i][j] = 1;
        }
        
      }
    }
  }
  grid = nextGrid;
}

function mouseDragged() {
  let col = Math.floor(mouseX / w)
  let row = Math.floor(mouseY / w)
  if(grid[col] !== undefined && grid[col][row] !== undefined) {
    grid[col][row] = 1;
  };
}


function create2dArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    for(let j = 0; j < cols; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
