///////////////////// CONSTANTS /////////////////////////////////////



///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const circles = Array.from(document.querySelectorAll("#board div"));

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "",
           "", "", "", "", "", "", "", "", "", "", "", "", "", "",
           "", "", "", "", "", "", "", "", "", "", "", "", "", "",];
  turn = "red";
  render();
}

function render() {
  board.forEach(function(mark, index) {
    circles[index].textContent = mark;
  });
}

function takeTurn(e) {
  let index = circles.findIndex(function(circle) {
    return circle === e.target;
  });

  board[index] = turn;
  turn = turn === "red" ? "yellow" : "red";

  render();
}
