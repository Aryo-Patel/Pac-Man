let map = [
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
    [2, 2, 2, 2, 2, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 2, 2],
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
let dotImage;
let powerUpImage;

function setup() {
    canvasW = 600;
    canvasH = 600;
    createCanvas(canvasW, canvasH);
    colorMode(HSB, 360, 120, 120);
    background(0);
    dotImage = loadImage('https://cdn.glitch.com/44761a92-c384-444e-be44-a8bca3e6d4f8%2FdotPic.png?v=1595965369131');
    powerUpImage = loadImage('https://cdn.glitch.com/44761a92-c384-444e-be44-a8bca3e6d4f8%2FpowerUpImage.jpg?v=1595994575372');

}
function draw() {
    background("black");
    let wallX = 0;
    let wallY = 0;
    let wallW = width / map[1].length;
    let wallH = 15;
    let dotImageX = 0
    let dotImageY = 0;
    let dotImageW = width / map[1].length;
    let dotImageH = 15;
    let powerUpImageX = 0;
    let powerUpImageY = 0;
    let powerUpImageW = width / map[1].length;;
    let powerUpImageH = 15;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 3) {
                dotImageX = j * (width / map[1].length);
                image(dotImage, dotImageX, dotImageY, dotImageW, dotImageH);
            }
            if (map[i][j] === 1) {
                wallX = j * (width / map[1].length);
                fill("blue");
                rect(wallX, wallY, wallW, wallH);
            }
            if (map[i][j] === 4) {
                powerUpImageX = j * (width / map[1].length);
                image(powerUpImage, powerUpImageX, powerUpImageY, powerUpImageW, powerUpImageH);
            }
            if (j == map[i].length - 1) {
                wallX = 0;
                wallY += wallH;
                dotImageX = 0;
                dotImageY += dotImageH;
                powerUpImageX = 0;
                powerUpImageY += powerUpImageH;
            }
        }
    }
}