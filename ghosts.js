const GHOST_SIZE = 15;
let ghost_arr = [];
let instanceNumber = 0;
frameCount = 0;



let ghost1, ghost2, ghost3, ghost4;

let beginningSound;

let dotImage, powerUpImage;
let pacmanWidth, pacmanHeight, x, y, velocity, speed, pacmanShapeEnd, pacmanShapeStart, canvasH, canvasW;
let pacman;
let gameOver = false;

function preload() { }
function setup() {
    canvasW = 600;
    canvasH = 600;
    let myCanvas = createCanvas(canvasW, canvasH);
    myCanvas.parent('game-holder');


    colorMode(HSB, 360, 120, 120);
    background(0);

    dotImage = loadImage('https://cdn.glitch.com/44761a92-c384-444e-be44-a8bca3e6d4f8%2FdotPic.png?v=1595965369131');
    powerUpImage = loadImage('https://cdn.glitch.com/44761a92-c384-444e-be44-a8bca3e6d4f8%2FpowerUpImage.jpg?v=1595994575372');

    for (let i = 0; i < 4; i++) {
        ghost_arr.push(new Ghost());
    }
    ghost1 = loadImage('assets/ghost-1.png');
    ghost2 = loadImage('assets/ghost-2.png');
    ghost3 = loadImage('assets/ghost-3.png');
    ghost4 = loadImage('assets/ghost-4.png');

    pacmanShapeStart = 0.5;
    pacmanShapeEnd = PI + HALF_PI + QUARTER_PI;
    x = 240;
    y = 325;
    pacmanWidth = 14;
    pacmanHeight = 14;
    speed = 4;
    pacman = new Pacman(x, y, pacmanWidth, pacmanHeight, pacmanShapeStart, pacmanShapeEnd, speed, "right");
}

function draw() {
    lives.textContent == 0 ? gameOver = true : 0;
    if (!gameOver) {
        background(0);
        strokeWeight(1)
        stroke(color('#141483'));
        noFill();
        drawGameMap();

        pacman.show();
        pacman.keyPressed();
        ghost_arr.forEach(ghost => {
            ghost.freeToLeave ? ghost.move() : ghost.escapeWait();
            ghost.draw();
        });
        pacman.checkCollision(ghost_arr);
    }
    else {
        background('rgba(0,0,0,0.25)');
        textFont('Permanent Marker');
        textSize(40);
        textAlign(CENTER);
        text('GAME OVER', width / 2, height / 2);

        text('Press "r" to restart', width / 2, height / 2 + 40);

        if (keyIsPressed) {
            if (key == 'r') {
                gameOver = false;
                ghost_arr = [];
                instanceNumber = 0;
                for (let i = 0; i < originalGameMap.length; i++) {
                    for (let j = 0; j < originalGameMap[i].length; j++) {
                        gameMap[i][j] = originalGameMap[i][j];
                    }
                }
                score.textContent = 0;
                for (let i = 0; i < 4; i++) {
                    ghost_arr.push(new Ghost());
                }
                lives.textContent = 3;
                pacman = new Pacman(x, y, pacmanWidth, pacmanHeight, pacmanShapeStart, pacmanShapeEnd, speed, "right");
            }
        }
    }

}

function convertFromGameMap(row, col) {
    let wallW = width / gameMap[1].length;
    let wallH = height / gameMap.length;
    return [row * wallH, col * wallW]
}
function convertToGameMap(y, x) {
    let wallW = width / gameMap[1].length;
    let wallH = height / gameMap.length;
    let col = Math.floor(x / wallW);
    let row = Math.floor(y / wallH);
    return [row, col];
}

function drawLines() {
    let horLineCount = gameMap.length;
    let vertLineCount = gameMap[1].length;

    let wallX = 0;
    let wallY = 0;
    let wallW = width / gameMap[1].length;
    let wallH = height / gameMap.length;

    for (let i = 0; i < horLineCount; i++) {
        fill('white');
        stroke('white');
        line(0, i * wallH, width, i * wallH);
    }
    for (let j = 0; j < vertLineCount; j++) {
        line(j * wallW, 0, j * wallW, height);
    }
}


function mouseClicked() {
    console.log(mouseX, mouseY);
    let coords = convertToGameMap(mouseY, mouseX);
    console.log([coords[0], coords[1]]);
    console.log(convertFromGameMap(coords[1], coords[0]))
}
class Ghost {
    constructor() {
        let wallW = width / gameMap[1].length;
        let wallH = height / gameMap.length;
        this.number = instanceNumber;
        instanceNumber++;
        if (instanceNumber == 2) {
            instanceNumber++;
            //this.number = instanceNumber;
        }
        let positions = convertFromGameMap(11, 9 + this.number);
        //200 broken into 50 bit chunks
        this.x = positions[1]
        this.y = positions[0]
        this.fill = instanceNumber * 90;
        this.vel = 4;
        this.frameCount = 0;
        this.direction = 'up'
        this.frightened = false;
        this.escapeCount = 0;
        this.freeToLeave = false;
        this.escapeDuration = 100 + this.number * 100

        this.squareX = this.x + wallW / 2
        this.squareY = this.y + wallH / 2

    }
    escapeWait() {
        if (this.escapeCount < this.escapeDuration) {
            this.escapeCount++;
        }
        else {
            if (this.number < 3) {
                if (this.x < convertFromGameMap(11, 11)[1]) {

                    this.x += this.vel;
                }
                else if (this.y > convertFromGameMap(9, 11)[0]) {
                    this.y -= this.vel;
                }
                else {
                    this.freeToLeave = true;
                }
            }
            else {
                if (this.x > convertFromGameMap(11, 11)[1]) {

                    this.x -= this.vel;
                }
                else if (this.y > convertFromGameMap(9, 11)[0]) {

                    this.y -= this.vel;
                }
                else {
                    let leftOrRight = Math.floor(Math.random() * 2);
                    if (leftOrRight == 0) {
                        this.direction = 'left';
                    }
                    else {
                        this.direction = 'right';
                    }
                    this.freeToLeave = true;
                }
            }
        }
    }
    updateCenter() {
        let wallW = width / gameMap[1].length;
        let wallH = height / gameMap.length;
        this.squareX = this.x + wallW / 2
        this.squareY = this.y + wallH / 2
    }

    draw() {
        let wallW = width / gameMap[1].length;
        let wallH = height / gameMap.length;
        if (this.number == 0) {
            image(ghost1, this.x, this.y, wallW, wallH);
        }
        else if (this.number == 1) {

            image(ghost2, this.x, this.y, wallW, wallH);
        }
        else if (this.number == 3) {
            image(ghost3, this.x, this.y, wallW, wallH);
        }
        else if (this.number == 4) {
            image(ghost4, this.x, this.y, wallW, wallH);
        }
        // if (this.frightened) {
        //     tint(0, 0, 204, 126);
        // }
        // else {
        //     //tint(255, 255, 255);
        // }
    }
    checkGridSquare() {
        console.log(convertToGameMap(this.y, this.x));
    }
    lockPos() {
        let lockPosArr = convertToGameMap(this.y, this.x);
        let newPos = convertFromGameMap(lockPosArr[0], lockPosArr[1]);
        // this.x = newPos[1];
        // this.y = newPos[0];
    }
    move() {

        this.frameCount++;
        if (this.frameCount > 200) {

            this.frameCount = 0;
            let direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    this.direction = 'up';
                    break;
                case 1:
                    this.direction = 'right';
                    break;
                case 2:
                    this.direction = 'down';
                    break;
                case 3:
                    this.direction = 'left';
                    break;

            }
        }
        let gameCoords;
        let wallW = width / gameMap[1].length;
        let wallH = height / gameMap.length;
        switch (this.direction) {

            case 'up':

                this.y -= this.vel;
                this.updateCenter();
                gameCoords = convertToGameMap(this.y, this.squareX);
                if (gameMap[gameCoords[0]][gameCoords[1]] == 1) {

                    this.y += this.vel;
                    let test = Math.floor(Math.random() * 2);
                    test == 1 ? this.direction = 'right' : this.direction = 'left';
                    this.frameCount = 0;
                }
                break;
            case 'right':

                this.x += this.vel;
                this.updateCenter();
                gameCoords = convertToGameMap(this.squareY, this.x + wallW);
                if (gameMap[gameCoords[0]][gameCoords[1]] == 1) {

                    this.x -= this.vel;
                    let test = Math.floor(Math.random() * 2);
                    test == 1 ? this.direction = 'up' : this.direction = 'down';
                    this.frameCount = 0;
                }

                break;
            case 'left':

                this.x -= this.vel
                this.updateCenter();
                gameCoords = convertToGameMap(this.squareY, this.x);
                if (gameMap[gameCoords[0]][gameCoords[1]] == 1) {

                    this.x += this.vel;
                    let test = Math.floor(Math.random() * 2);
                    test == 1 ? this.direction = 'down' : this.direction = 'up';
                    this.frameCount = 0;
                }

                break;

            case 'down':

                this.y += this.vel;

                this.updateCenter();
                gameCoords = convertToGameMap(this.y + wallH, this.squareX);
                if (gameMap[gameCoords[0]][gameCoords[1]] == 1) {

                    this.y -= this.vel;
                    let test = Math.floor(Math.random() * 2);
                    test == 1 ? this.direction = 'right' : this.direction = 'left';

                    this.frameCount = 0;
                }
                break;
        }

    }
}



/*
function draw() {
  background("black");
  var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 4, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 4, 1],
    [1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1],
    [1, 3, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1],
    [1, 4, 3, 3, 1, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 1, 3, 3, 4, 1],
    [1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
    [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  let wallX = 0;
  let wallY = 0;
  let wallW = width / map[1].length;
  let wallH = 15;


  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {

        wallX = j * (width / map[1].length);
        fill("blue");
        rect(wallX, wallY, wallW, wallH);
      if (j == map[i].length - 1) {
          wallX = 0;
          wallY += wallH;
        }
      }

      let circleX = wallW/2;
      let circleY = wallH/2;
      let circleD = 7;

      if (map[i][j] == 3) {
       dotCounter = j;
        circleX = dotCounter * wallW;
        fill('white');
        ellipse(circleX,circleY, circleD);
      if(j == map[i].length - 1){
        circleX = wallW/2
        circleY += wallH/2
      }

      }

      if (map[i][j] == 4) {
      }
    }
  }
}*/