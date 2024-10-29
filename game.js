const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 50, y: 50, size: 20, speed: 2 };
const guards = [
  { x: 200, y: 100, width: 20, height: 20, speed: 1, direction: 1 },
  { x: 400, y: 300, width: 20, height: 20, speed: 1.5, direction: -1 }
];
const finish = { x: 550, y: 350, width: 30, height: 30 };

let keys = {};
document.addEventListener("keydown", (e) => { keys[e.key] = true; });
document.addEventListener("keyup", (e) => { keys[e.key] = false; });

function initGame() {
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  update();
  draw();
  if (checkWin()) {
    alert("Mission Complete! CV Section Unlocked!");
    document.getElementById("minigame-section").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
  } else if (!checkLoss()) {
    requestAnimationFrame(gameLoop);
  } else {
    alert("You’ve been spotted! Try again.");
    resetGame();
  }
}

function update() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  guards.forEach(guard => {
    guard.x += guard.speed * guard.direction;
    if (guard.x > canvas.width - guard.width || guard.x < 0) guard.direction *= -1;
  });
}

function checkWin() {
  return (player.x < finish.x + finish.width && player.x + player.size > finish.x &&
          player.y < finish.y + finish.height && player.y + player.size > finish.y);
}

function checkLoss() {
  return guards.some(guard =>
    player.x < guard.x + guard.width &&
    player.x + player.size > guard.x &&
    player.y < guard.y + guard.height &&
    player.y + player.size > guard.y
  );
}

function resetGame() {
  player.x = 50;
  player.y = 50;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Draw guards
  ctx.fillStyle = "red";
  guards.forEach(guard => ctx.fillRect(guard.x, guard.y, guard.width, guard.height));

  // Draw finish point
  ctx.fillStyle = "yellow";
  ctx.fillRect(finish.x, finish.y, finish.width, finish.height);
}
