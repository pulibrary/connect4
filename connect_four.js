const player1 = 'orange';
const player2 = 'blue';
var currentPlayer = player1;
var board;

window.onload = function() {
  setBoard();
};

function setBoard() {
  const rows = 6;
  const columns = 7;
  board = document.getElementById('board');

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
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      break;
    }
  }
}
