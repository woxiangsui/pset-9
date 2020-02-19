///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;
let xScore = 0;
let oScore = 0;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("o-button").onclick = oFirst; // tofu *cough *cough fruits

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  win = null;

  document.getElementById("o-button").style.display = ""; //shows the button

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];

      if (winner == "O") { // O points
          oScore++;
        document.getElementById("opoints").innerHTML = oScore;
      } else if (winner == "X") { // X points
          xScore++;
        document.getElementById("xpoints").innerHTML = xScore;
      }
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function oFirst () { //switches o for x
  init();
  turn = "O";
  document.getElementById("playerTurn").innerHTML = "Turn: O"; // changes turn display
  document.getElementById("o-button").style.display = "none"; // hides the button
}
