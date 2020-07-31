let score = document.getElementById('score-info');
let lives = document.getElementById('lives-info');


function addScore(addAmount) {
    let initialScore = Number(score.innerText);

    let newScore = initialScore + Number(addAmount);

    score.innerText = newScore;
}

function subtractLife() {
    let lifeCount = Number(lives.innerText);
    let newLives = lifeCount - 1;
    lives.innerText = newLives;
}