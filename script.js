let board = document.getElementById("gameBoard");
let startBtn = document.getElementById("startBtn");
let movesText = document.getElementById("moves");
let timerText = document.getElementById("timer");

let icons = ['🍍','🥑','🍓','🍇','🥔','🍋','🍌','🍒'];
icons = [...icons, ...icons]; 

let flipped = [];
let lockBoard = false;
let moves = 0;
let time = 0;
let matched = 0;
let interval;

startBtn.addEventListener("click", startGame);

function startGame() {
  board.innerHTML = "";
  moves = 0;
  time = 0;
  matched = 0;
  flipped = [];
  lockBoard = false;
  movesText.textContent = "0 moves";
  timerText.textContent = "time: 0 sec";
  clearInterval(interval);
  interval = setInterval(() => {
    time++;
    timerText.textContent = `time: ${time} sec`;
  }, 1000);

  let shuffled = icons.sort(() => 0.5 - Math.random());
  shuffled.forEach(icon => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesText.textContent = `${moves} moves`;

    let [first, second] = flipped;
    if (first.dataset.icon === second.dataset.icon) {
      matched++;
      flipped = [];

      if (matched === icons.length / 2) {
        clearInterval(interval);
        winMessage.textContent = `🎉 You won in ${moves} moves and ${time} sec!`;
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        flipped.forEach(card => {
          card.classList.remove("flipped");
          card.textContent = "";
        });
        flipped = [];
        lockBoard = false;
      }, 800);
    }
  }
}