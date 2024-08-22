const player1 = 'orange';
const player2 = 'blue';
let currentPlayer = player1;
let board = document.getElementById('board');
let message = document.getElementById('message');
let gameEnded = false;

window.onload = function() {
  setBoard();
};

function setBoard() {
  const rows = 6;
  const columns = 7;

  const table = document.createElement('table');

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement('td');
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  board.appendChild(table);

  board.addEventListener('click', function(event) {
    if (gameEnded) {
      location.reload();
      return;
    }

    const cell = event.target;
    if (cell.tagName === 'TD') {
      setColor(cell);
    }
  });
}

function setColor(cell) {
  const col = cell.dataset.col;
  const rows = Array.from(board.getElementsByTagName('tr'));

  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    const cell = row.getElementsByTagName('td')[col];
    if (!cell.style.backgroundColor) {
      cell.style.backgroundColor = currentPlayer;
      cell.classList.add('filled');
      if (checkWin()) {
        setWin();
      } else {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
      }
      break;
    }
  }
}

function checkWin() {
  const cells = Array.from(board.getElementsByTagName('td'));
  const rows = 6;
  const columns = 7;
  const winningLength = 4;

  const checkDirection = (startRow, startCol, dr, dc) => {
    const color = cells[startRow * columns + startCol].style.backgroundColor;
    if (!color) return false;

    let count = 0;
    let row = startRow;
    let col = startCol;

    while (
      row >= 0 && row < rows &&
      col >= 0 && col < columns &&
      cells[row * columns + col].style.backgroundColor === color
    ) {
      count++;
      if (count === winningLength) return true;
      row += dr;
      col += dc;
    }

    return false;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const color = cells[row * columns + col].style.backgroundColor;
      if (color) {
        if (
          (col <= columns - winningLength && checkDirection(row, col, 0, 1)) || // Horizontal
          (row <= rows - winningLength && checkDirection(row, col, 1, 0)) || // Vertical
          (row <= rows - winningLength && col <= columns - winningLength && checkDirection(row, col, 1, 1)) || // Diagonal down-right
          (row <= rows - winningLength && col >= winningLength - 1 && checkDirection(row, col, 1, -1)) // Diagonal down-left
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

function setWin() {
  message.innerHTML = `${currentPlayer} wins!`;
  gameEnded = true;
}