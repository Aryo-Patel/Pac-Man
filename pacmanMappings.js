/* global createCanvas,background, arc, random, width, UP_ARROW, DOWN_ARROW,
   LEFT_ARROW, drawMap, RIGHT_ARROW, height, fill, PI, HALF_PI, QUARTER_PI, PIE , keyCode, LEFT_ARROW, Pacman, rect, ellipse */
let pacmanWidth, pacmanHeight, x, y, velocity, speed, pacmanShapeEnd, pacmanShapeStart, canvasH, canvasW;
function setup() {
    canvasW = 600;
    canvasH = 377;
    createCanvas(canvasW, canvasH);
    pacmanShapeStart = 0.5;
    pacmanShapeEnd = PI + HALF_PI + QUARTER_PI;
    x = 100;
    y = 98;
    pacmanWidth = 14;
    pacmanHeight = 14;
    speed = 1;
    //1=wall
    //2=ground
    //3=dot
    //4=powerup
}
function draw() {
    background("black");
    let pacman = new Pacman(x, y, pacmanWidth, pacmanHeight, pacmanShapeStart, pacmanShapeEnd, speed, "right");
    pacman.show();
    pacman.keyPressed();
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
    let circleX = 0
    let circleY = 0;
    let circleD = 7;
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
            if (map[i][j] == 3) {
                circleX = j * wallW / 2;
                fill('white');
                ellipse(circleX, circleY, circleD);
                if (j == map[i].length - 1) {
                    circleX = 0;
                    circleY += wallH / 2
                }
            }
            if (map[i][j] == 4) {
            }
        }
    }
}