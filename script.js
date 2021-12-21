let logicalBoard = [
  ["O", "O", "O"],
  ["O", "X", "X"],
  ["X", "X", "X"],
];
const container = document.getElementById("container");
let cells = document.getElementsByClassName("cell");

const Player = (name, symbol) => {
  const makeMove = (symbol) => console.log(`Makes move with ${symbol}`);
  return { makeMove };
};

const gameBoard = (() => {
  for (let i = 0; i < 3; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    if (i < 2) {
      rowDiv.classList.add("row-line");
    }
    for (let j = 0; j < 3; j++) {
      let cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.setAttribute("data-row", i);
      cellDiv.setAttribute("data-col", j);
      if (j < 2) {
        cellDiv.classList.add("cell-line");
      }
      rowDiv.appendChild(cellDiv);
    }
    container.appendChild(rowDiv);
  }
})();

function renderBoard() {
  for (cell in cells) {
    console.log(cells[cell]);
    let currentCell = cells[cell];
    let rowId = currentCell.getAttribute("data-row");
    let colId = currentCell.getAttribute("data-col");
    let positionText = logicalBoard[rowId][colId];
    currentCell.textContent = positionText;
  }
}
