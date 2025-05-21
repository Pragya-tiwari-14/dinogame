let score = 0;
let cross = true;
let isGameOver = false;

// Load audio
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

// Play background music after a short delay
setTimeout(() => {
    audio.play();
}, 1000);

// Handle key presses for jump and movement
document.onkeydown = function (e) {
    if (isGameOver) return;

    let dino = document.querySelector('.dino');
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));

    // UP Arrow - Jump + Move Right
    if (e.keyCode === 38) {
        // Add jump animation class
        dino.classList.add('animateDino');

        // Move right by 50px
        dino.style.left = (dinoX + 50) + "px";

        // Remove jump animation class after animation completes
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 600);
    }

    // LEFT Arrow - Move left
    else if (e.keyCode === 37) {
        if (dinoX > 0) {
            dino.style.left = (dinoX - 50) + "px";
        }
    }
};

// Collision detection + score system
setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // Collision detected
    if (offsetX < 73 && offsetY < 52) {
        isGameOver = true;
        gameOver.innerHTML = "Game Over - <button onclick='location.reload()'>RESTART</button>";
        gameOver.style.visibility = "visible";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audio.pause();
            audiogo.pause();
        }, 1500);
    }

    // Passed the obstacle successfully
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        // Increase difficulty by reducing animation duration
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            if (newDur > 1) {
                obstacle.style.animationDuration = newDur + 's';
            }
        }, 500);
    }
}, 10);

// Update score display
function updateScore(score) {
    let scoreCont = document.querySelector('#scoreCount');
    scoreCont.innerHTML = "YOUR SCORE : " + score;
}
