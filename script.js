document.addEventListener("DOMContentLoaded", function() {
  const squares = document.querySelectorAll(".square");
  const resetButton = document.getElementById("reset");
  const message = document.getElementById("message");

  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];

  function checkWin(player) {
      const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ];

      return winConditions.some((combo) => {
          return combo.every((index) => {
              return board[index] === player;
          });
      });
  }

function handleSquareClick(index) {
  if (board[index] === "" && !checkWin("X") && !checkWin("O")) {
      board[index] = currentPlayer;
      squares[index].textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
          const winIndexes = getWinningIndexes(currentPlayer);
          winIndexes.forEach((winIndex) => {
              squares[winIndex].classList.add("winner");
          });
          message.textContent = `Player ${currentPlayer} wins!`;
      } else if (board.every(square => square !== "")) {
          message.textContent = "It's a draw!";
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          message.textContent = `Player ${currentPlayer}'s turn`;
      }
  }
}

function getWinningIndexes(player) {
  const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  return winConditions.find((combo) => {
      return combo.every((index) => {
          return board[index] === player;
      });
  });
}


  squares.forEach((square, index) => {
      square.addEventListener("click", () => {
          handleSquareClick(index);
      });
  });

  resetButton.addEventListener("click", () => {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      squares.forEach(square => {
          square.textContent = "";
      });
      message.textContent = "Player X's turn";
  });
});
