const Player = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  let logicalBoard = ["", "", "", "", "", "", "", "", ""];
  const container = document.getElementById("container");
  let someoneHasWon = false;
  let noNamesEntered = true;

  container.addEventListener("click", (e) => {
    if (someoneHasWon || noNamesEntered) {
      return;
    } else {
      const player = game.getCurrentPlayer();
      let cell = getTarget(e);
      let cellId = cell.getAttribute("data-cell");
      console.log(checkIfFree(cellId));
      if (checkIfFree(cellId)) {
        logicalBoard[cellId] = player.symbol;
      }
      updateGameBoard();
      if (!game.checkWinner()) {
        game.checkTie();
      }
      game.setNextPlayer();
    }
  });

  function getTarget(e) {
    let target = e.target;
    return target;
  }

  let cells = [];

  const setNoNamesEntered = (start) => {
    noNamesEntered = start;
  };

  const createGameBoard = () => {
    for (let i = 0; i < 3; i++) {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      if (i < 2) {
        rowDiv.classList.add("row-line");
      }
      for (let j = 0; j < 3; j++) {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("data-cell", i * 3 + j);
        if (j < 2) {
          cellDiv.classList.add("cell-line");
        }
        rowDiv.appendChild(cellDiv);
        cells.push(cellDiv);
      }
      container.appendChild(rowDiv);
    }
  };

  const updateGameBoard = () => {
    for (i in cells) {
      let currentCell = cells[i];
      let cellId = currentCell.getAttribute("data-cell");
      let positionText = logicalBoard[cellId];
      currentCell.textContent = positionText;
    }
  };

  const resetGameBoard = () => {
    for (let i = 0; i < logicalBoard.length; i++) {
      logicalBoard[i] = "";
    }
    for (cell in cells) {
      cells[cell].classList.remove("winner");
    }
    updateGameBoard();
    someoneHasWon = false;
  };

  const updateWinnerCells = (winCells) => {
    console.log(winCells);
    for (cell in cells) {
      console.log(cells[cell].getAttribute("data-cell"));
      if (
        cells[cell].getAttribute("data-cell") == winCells[0] ||
        cells[cell].getAttribute("data-cell") == winCells[1] ||
        cells[cell].getAttribute("data-cell") == winCells[2]
      ) {
        cells[cell].classList.add("winner");
      }
    }
    someoneHasWon = true;
  };

  const getCells = () => {
    return cells;
  };

  const checkIfFree = (cellId) => {
    let pos = logicalBoard[cellId];
    if (pos === "") {
      return true;
    } else {
      return false;
    }
  };

  const checkDraw = () => {
    for (cell of logicalBoard) {
      if (cell === "") {
        return false;
      }
    }
    return true;
  };

  return {
    updateGameBoard,
    createGameBoard,
    resetGameBoard,
    logicalBoard,
    updateWinnerCells,
    someoneHasWon,
    getCells,
    setNoNamesEntered,
    checkDraw,
  };
})();

const game = (() => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  let needsReset = false;
  let player1;
  let player2;
  let currentPlayer;
  const resetButton = document.getElementById("reset");
  const startButton = document.getElementById("start");
  let gameText = document.getElementsByClassName("gametext")[0];
  gameText.textContent = "Enter your names and click on Start";

  resetButton.addEventListener("click", () => {
    gameBoard.resetGameBoard();
    gameBoard.setNoNamesEntered(true);
    gameText.textContent = "Click on Start to play again!";
  });

  startButton.addEventListener("click", () => {
    console.log(needsReset);
    if (needsReset) {
      return;
    } else {
      let playerOneForm = document.getElementById("player1");
      let playerTwoForm = document.getElementById("player2");
      if (playerOneForm.value === "") {
        player1 = Player("Player 1", "X");
      } else {
        player1 = Player(playerOneForm.value, "X");
      }
      if (playerOneForm.value === "") {
        player2 = Player("Player 2", "O");
      } else {
        player2 = Player(playerTwoForm.value, "O");
      }
      currentPlayer = player1;
      gameBoard.setNoNamesEntered(false);
      gameText.textContent = "Good luck to both!";
    }
  });

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const setNextPlayer = () => {
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  };

  const checkWinner = () => {
    for (i in winConditions) {
      if (
        gameBoard.logicalBoard[winConditions[i][0]] === currentPlayer.symbol &&
        gameBoard.logicalBoard[winConditions[i][1]] === currentPlayer.symbol &&
        gameBoard.logicalBoard[winConditions[i][2]] === currentPlayer.symbol
      ) {
        gameBoard.updateWinnerCells(winConditions[i]);
        gameText.textContent = `Congratulations, ${currentPlayer.name} has won!`;
        needsReset = true;
        return true;
      }
    }
    return false;
  };

  const checkTie = () => {
    if (gameBoard.checkDraw()) {
      gameText.textContent = `It's a draw!`;
      needsReset = true;
    }
  };

  gameBoard.createGameBoard();

  return { getCurrentPlayer, setNextPlayer, checkWinner, checkTie };
})();
