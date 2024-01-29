document.addEventListener("DOMContentLoaded", function () {
    const ball = document.querySelector(".ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");

    let ballX = 0; // initial ball X position
    let ballY = 0; // initial ball Y position
    let ballSpeedX = 2; // initial ball speed in X direction
    let ballSpeedY = 2; // initial ball speed in Y direction

    let leftPaddleY = 0; // initial left paddle Y position
    let rightPaddleY = 0; // initial right paddle Y position
    const paddleSpeed = .09; // paddle movement speed

    const gameContainer = document.querySelector(".game-container");
    const pong = document.querySelector(".pong");
    const pongRect = pong.getBoundingClientRect();

    // Function to update the position of the ball
    function updateBallPosition() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Check collision with walls
        if (ballY < 0 || ballY > pongRect.height - 20) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with paddles
        if (
            (ballX < 20 && ballY + 20 > leftPaddleY && ballY < leftPaddleY + 100) ||
            (ballX > pongRect.width - 40 && ballY + 20 > rightPaddleY && ballY < rightPaddleY + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Check if the ball goes beyond the paddles (scoring)
        if (ballX < 0 || ballX > pongRect.width - 20) {
            // Reset ball position for a new round
            ballX = pongRect.width / 2;
            ballY = pongRect.height / 2;
        }

        ball.style.transform = `translate(${ballX}px, ${ballY}px)`;
    }

    // Function to update the position of the paddles
    function updatePaddlePosition() {
        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowUp" && rightPaddleY > 0) {
                rightPaddleY -= paddleSpeed;
            } else if (event.key === "ArrowDown" && rightPaddleY < pongRect.height - 100) {
                rightPaddleY += paddleSpeed;
            }

            if (event.key === "w" && leftPaddleY > 0) {
                leftPaddleY -= paddleSpeed;
            } else if (event.key === "s" && leftPaddleY < pongRect.height - 100) {
                leftPaddleY += paddleSpeed;
            }
        });

        leftPaddle.style.transform = `translate(0, ${leftPaddleY}px)`;
        rightPaddle.style.transform = `translate(0, ${rightPaddleY}px)`;
    }

    // Game loop
    function gameLoop() {
        updateBallPosition();
        updatePaddlePosition();
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();
});
