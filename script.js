const containerSquares = document.getElementById("container");
const squares = containerSquares.querySelectorAll(".square");
const resetBtn = document.getElementById("reset");
const modeContainer = document.getElementById("mode-container");
const modeButtons = modeContainer.querySelectorAll(".mode");
const message = document.getElementById("message");
const colorDisplay = document.getElementById("colorDisplay");
const h1El = document.getElementById("first");

const numSquares = 6;
const colors = [];
let pickedColor = "";
let len;

//random color:
const randomColor = () =>
    `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;

const transparentSquares = () => {
    squares.forEach((square) => {
        square.style.backgroundColor = "transparent";
    });
};

const fillBackgroundColorSquares = (color) => {
    [...squares].slice(0, len).forEach((square) => {
        square.style.backgroundColor = color;
    });
};

const start = () => {
    resetBtn.textContent = "New Colors";
    transparentSquares();
    h1El.style.backgroundColor = "steelblue";
    for (let mode of modeButtons) {
        if (mode.classList.contains("selected")) {
            selectedMode = mode;
            break;
        }
    }
    len = selectedMode.textContent === "Easy" ? 3 : 6;
    [...squares].slice(0, len).forEach((square) => {
        square.style.backgroundColor = randomColor();
    });
    pickedColor = [...squares].slice(0, len)[Math.floor(Math.random() * len)]
        .style.backgroundColor;
    colorDisplay.textContent = pickedColor;
};

const checkColor = (square) => {
    if (square.style.backgroundColor === pickedColor) {
        message.textContent = "CORRECT!";
        fillBackgroundColorSquares(pickedColor);
        h1El.style.backgroundColor = pickedColor;
        resetBtn.textContent = "PLAY AGAIN?";
    } else {
        message.textContent = "Try Again!";
        square.style.backgroundColor = "transparent";
    }
};

const selectModeBtn = (event) => {
    const btn = event.target;
    const anotherBtn = btn.nextElementSibling || btn.previousElementSibling;
    anotherBtn.classList.remove("selected");
    btn.classList.add("selected");
    start();
};
const checkWin = (event) => {
    const clickedSquare = event.target;
    checkColor(clickedSquare);
};

start();

resetBtn.addEventListener("click", start);
modeContainer.addEventListener("click", selectModeBtn);
containerSquares.addEventListener("click", checkWin);
