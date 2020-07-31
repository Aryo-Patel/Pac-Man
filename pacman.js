/* global createCanvas,background, arc, random, width, UP_ARROW, DOWN_ARROW,
   LEFT_ARROW, drawMap, RIGHT_ARROW, height, fill, PI, HALF_PI, QUARTER_PI, PIE , keyCode, LEFT_ARROW, Pacman, rect, ellipse */
// var gameMap = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//     [1, 4, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 4, 1],
//     [1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1],
//     [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//     [1, 3, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 3, 1],
//     [1, 3, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 3, 3, 3, 3, 1],
//     [1, 1, 1, 1, 1, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
//     [2, 2, 2, 2, 2, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1],
//     [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//     [1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1],
//     [1, 4, 3, 3, 1, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 1, 3, 3, 4, 1],
//     [1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1],
//     [1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
//     [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
//     [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
//     [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];
//1=wall
//2=ground
//3=dot
//4=powerup
class Pacman {
    constructor(x, y, width, height, shapeStart, shapeEnd, speed, direction) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shapeStart = shapeStart;
        this.shapeEnd = shapeEnd;
        this.speed = speed;
        this.direction = direction;
    }
    show() {
        fill("yellow");
        arc(this.x, this.y, this.width, this.height, this.shapeStart, this.shapeEnd, PIE);
    }
    move() {
        let gameCoords;
        let wallW = width / gameMap[1].length;
        let wallH = height / gameMap.length;
        switch (this.direction) {
            case 'up':

                gameCoords = convertToGameMap(this.y - this.height, this.x);
                if (gameMap[gameCoords[0]][gameCoords[1]] != 1) {
                    this.y -= this.speed;
                    if (gameMap[gameCoords[0]][gameCoords[1]] == 3 || gameMap[gameCoords[0]][gameCoords[1]] == 4) {
                        addScore(10);
                        gameMap[gameCoords[0]][gameCoords[1]] = 2
                    }
                }
                break;
            case 'right':

                gameCoords = convertToGameMap(this.y, this.x + this.width);
                if (gameMap[gameCoords[0]][gameCoords[1]] != 1) {
                    this.x += this.speed;
                    if (gameMap[gameCoords[0]][gameCoords[1]] == 3 || gameMap[gameCoords[0]][gameCoords[1]] == 4) {
                        addScore(10);
                        gameMap[gameCoords[0]][gameCoords[1]] = 2
                    }
                }
                break;
            case 'left':
                gameCoords = convertToGameMap(this.y, this.x - this.width);
                if (gameMap[gameCoords[0]][gameCoords[1]] != 1) {
                    this.x -= this.speed;
                    if (gameMap[gameCoords[0]][gameCoords[1]] == 3 || gameMap[gameCoords[0]][gameCoords[1]] == 4) {
                        addScore(10);
                        gameMap[gameCoords[0]][gameCoords[1]] = 2
                    }
                }
                break;
            case 'down':
                gameCoords = convertToGameMap(this.y + this.height, this.x);
                if (gameMap[gameCoords[0]][gameCoords[1]] != 1) {
                    this.y += this.speed;
                    if (gameMap[gameCoords[0]][gameCoords[1]] == 3 || gameMap[gameCoords[0]][gameCoords[1]] == 4) {
                        addScore(10);
                        gameMap[gameCoords[0]][gameCoords[1]] = 2
                    }
                }
                break;
        }
    }
    checkCollision(ghostArr) {
        ghostArr.forEach(ghost => {
            let ghostSquares = convertToGameMap(ghost.squareY, ghost.squareX);
            let pacSquares = convertToGameMap(this.y, this.x);
            if (ghostSquares[0] == pacSquares[0] && ghostSquares[1] == pacSquares[1]) {

                let positions = convertFromGameMap(11, 9 + ghost.number);
                ghost.x = positions[1]
                ghost.y = positions[0]
                ghost.freeToLeave = false;
                ghost.escapeCount = 0;

                let leftOrRight = Math.floor(Math.random() * 2);
                if (leftOrRight == 0) {
                    ghost.direction = 'left';
                }
                else {
                    ghost.direction = 'right';
                }

                ghost.updateCenter();
                subtractLife();
            }
        });
    }
    keyPressed() {
        if (keyCode == LEFT_ARROW) {
            //this.x -= speed;
            this.shapeStart = -2.5;
            this.shapeEnd = PI - QUARTER_PI;
            this.direction = "left";
        }
        if (keyCode == RIGHT_ARROW) {
            //this.x += speed;
            this.shapeStart = 0.5;
            this.shapeEnd = PI + HALF_PI + QUARTER_PI;
            this.direction = "right";
        }
        if (keyCode == UP_ARROW) {
            //this.y -= speed;
            this.shapeStart = -.5;
            this.shapeEnd = PI + HALF_PI / 2.5;
            this.direction = "up";
        }
        if (keyCode == DOWN_ARROW) {
            //this.y += speed;
            this.shapeStart = PI - QUARTER_PI;
            this.shapeEnd = 1;
            this.direction = "down";
        }
        this.move();
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