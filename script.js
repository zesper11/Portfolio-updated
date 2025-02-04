const parent = document.querySelector(".parent");
const children = document.querySelectorAll(".child");
const speed = 0.4; // Slow speed
let balls = [];

// Initialize positions and directions
children.forEach((child) => {
    let x = Math.random() * (parent.clientWidth - child.clientWidth);
    let y = Math.random() * (parent.clientHeight - child.clientHeight);
    let dx = (Math.random() > 0.5 ? 1 : -1) * speed;
    let dy = (Math.random() > 0.5 ? 1 : -1) * speed;
    
    balls.push({ element: child, x, y, dx, dy });
});

function animate() {
    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Check boundary collisions
        if (ball.x <= 0 || ball.x >= parent.clientWidth - ball.element.clientWidth) {
            ball.dx = -ball.dx;
        }
        if (ball.y <= 0 || ball.y >= parent.clientHeight - ball.element.clientHeight) {
            ball.dy = -ball.dy;
        }

        // Check collisions with other balls
        balls.forEach(other => {
            if (other !== ball) {
                let dx = other.x - ball.x;
                let dy = other.y - ball.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < ball.element.clientWidth) {
                    // Swap directions to simulate bounce
                    let tempDx = ball.dx;
                    let tempDy = ball.dy;
                    ball.dx = other.dx;
                    ball.dy = other.dy;
                    other.dx = tempDx;
                    other.dy = tempDy;
                }
            }
        });

        ball.element.style.left = `${ball.x}px`;
        ball.element.style.top = `${ball.y}px`;
    });

    requestAnimationFrame(animate);
}

animate();
