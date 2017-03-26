import css from './style.css';

const gameboard = document.querySelector('.gameboard');
const reset = document.querySelector('.reset');
const square = document.querySelectorAll('.square');
const easy = document.querySelector('.easy');
const hard = document.querySelector('.hard');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('.modal-title');
const modalTagline = document.querySelector('.modal-tagline');
const modalOverlay = document.querySelector('#modal-overlay');
const modalGuts = document.querySelector('.modal-guts');

const game = {
  currentPlayer: 'X',
  human: '',
  computer: '',
  difficulty: 'easy',
  turn: 0,
  board: [null, null, null,
          null, null, null,
          null, null, null],
}

// Set which is human and which is AI.
function setPlayers () {
  game.human == 'X' ? game.computer = 'O' : game.computer = 'X';
}

// Function that calculates if someone has won
function whoWon (board, token) {
  const winningBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningBoard) {
    let win = combination.every(i => board[i] === token);

    if (win) return true;
  }
  return false;
}

// Check if there is a winning move to make.
function findWinningMove(board, token) {

  for (let i in board) {
    if (board[i] !== null) continue;

    let newBoard = [...board];
    newBoard[i] = token;
    let win = whoWon(newBoard, token);
    if (win == true) return +i;
  }

  return false;
}

// Function that changes who the currentPlayer is
function changePlayer () {
  game.currentPlayer == 'X' ? game.currentPlayer = 'O' : game.currentPlayer = 'X';
}

function getRandomCell () {
  return Math.floor(Math.random() * game.board.length);
}

function makeRandomMove() {
  const rand = getRandomCell();
  if (game.board[rand]) {
    makeRandomMove();
  } else {
    game.board[rand] = game.currentPlayer;
    return true;
  }
}
function aiMove () {
  if (game.difficulty == 'easy') {
    const move = makeRandomMove();
  } else {
    // Check if the computer has a winning move
    let move = findWinningMove(game.board, game.computer);
    if (move) {
      game.board[move] = game.computer;
    } else if (findWinningMove(game.board, game.human)) {
      // If the computer doesn't have a winning move, check if the human has a winning move.
      move = findWinningMove(game.board, game.human);      
      game.board[move] = game.computer;
    } else {
      // If no player has a winning move, make a random move.
      const hardMove = makeRandomMove();
    }
  }
  setTimeout(function() {
    updateState();
  }, 900);
}

function checkCell (cell) {
  if (cell === null) {
    return cell = '';
  } else {
    return cell = cell;
  }
}

function render (cell, index) {
  if ((index % 3) == 0) {
    return `
      <tr><td id="square${index + 1}" class="square"><span>${checkCell(cell)}</span></td>
    `;
  } else if (((index + 1) % 3) == 0) {
    return `
      <td id="square${index + 1}" class="square"><span>${checkCell(cell)}</span></td></tr>
    `;
  } else {
  return `
      <td id="square${index + 1}" class="square"><span>${checkCell(cell)}</span></td>
    `;
  }
}

function createEndMessage (gameending) {
  if (gameending === 'draw') {
    return `No winner, it is a draw!`;
  }
  return `${gameending} has won!`;
}

function showEnd (endMessage) {
  const h1node = document.createElement('h1');
  const h2node = document.createElement('h2');
  const h1text = document.createTextNode(endMessage);
  const h2text = document.createTextNode(`Want to play again?`);
  h1node.classList.add('end-message');
  h2node.classList.add('end-message');
  h1node.appendChild(h1text);
  h2node.appendChild(h2text);
  modalGuts.insertBefore(h1node, modalTagline);
  modalGuts.insertBefore(h2node, modalTagline);
  if (document.querySelector('.modal-title')) {
    modalGuts.removeChild(modalTitle);
  }
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
}
// Update state ? updating the board and changing player and other stuff.
function updateState () {
  const updatedBoard = game.board.map(render).join('');
  gameboard.innerHTML = updatedBoard;
  if (document.querySelector('.end-message')){
    modalGuts.removeChild(document.querySelector('.end-message'));
  }
  if (whoWon(game.board, game.currentPlayer) === true) {
    const endMessage = createEndMessage(game.currentPlayer);
    setTimeout(function() {
      showEnd(endMessage);
    }, 600);
    
  } else if (game.turn >= 8 && whoWon(game.board, game.currentPlayer) == false) {
    const endMessage = createEndMessage('draw');
    setTimeout(function() {
      showEnd(endMessage);
    }, 600);
  } else {
    changePlayer();
    game.turn++;
    if (game.currentPlayer === game.computer) {
      aiMove();
    }
  }
}

function resetGame(e) {
  loadGame(e);
}

function handleMove (e) {
  // Check if move is valid, if it is, update board and state
  if (game.board[(e.target.id.split('').pop()) - 1] === null && game.currentPlayer === game.human) {
    game.board[(e.target.id.split('').pop()) - 1] = game.currentPlayer;
    updateState();
  }
}

function loadGame (e) {
  e.preventDefault();
  const player = document.querySelector('input[name="player"]:checked').value;
  game.currentPlayer = 'X';
  game.human = player;
  game.computer = player === 'X' ? 'O' : 'X';
  game.difficulty = e.target.textContent.toLowerCase(),
  game.turn = 0;
  game.board = [null, null, null, null, null, null, null, null, null];
  gameboard.innerHTML = `
      <tr>
        <td id="square1" class="square"></td>
        <td id="square2" class="square"></td>
        <td id="square3" class="square"></td>
      </tr>
      <tr>
        <td id="square4" class="square"></td>
        <td id="square5" class="square"></td>
        <td id="square6" class="square"></td>
      </tr>
      <tr>
        <td id="square7" class="square"></td>
        <td id="square8" class="square"></td>
        <td id="square9" class="square"></td>
      </tr>
    </table>`;
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  if (game.currentPlayer === game.computer) {
    aiMove();
  }
}
gameboard.addEventListener('click', (e) => handleMove(e));
reset.addEventListener('click', (e) => resetGame(e));
easy.addEventListener('click', (e) => loadGame(e));
hard.addEventListener('click', (e) => loadGame(e));