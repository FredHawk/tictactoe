import css from './style.css';

const gameboard = document.querySelector('.gameboard');
const reset = document.querySelector('.reset');
const square = document.querySelectorAll('.square');

const game = {
  currentPlayer: 'X',
  human: '',
  computer: '',
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
function whoWon () {

  // if no one has won when board is filled up then it is a draw.
  return false;
}

// Function that runs when turn = 9 (whole board is filled and no one won)
function draw() {
  // check if it is a draw.
  console.log('No winner, it is a draw');
}

// Function that changes who the currentPlayer is
function changePlayer () {
  game.currentPlayer == 'X' ? game.currentPlayer = 'O' : game.currentPlayer = 'X';
}

// AI function - Don't know how to do this one yet.
function aiMove () {
  // Add a setTimeout of 1 second so it seems more real like the computer thinks.
  setTimeout(function() {

  }, 1000);
}

function checkCell (cell) {
  if (cell === null) {
    return cell = '';
  } else {
    return cell = cell;
  }
}

function render (cell, index) {
  return `
      <div id="square${index + 1}" class="square"><span>${checkCell(cell)}</span></div>
    `;
}


// Update state ? updating the board and changing player and other stuff.
function updateState () {
  const updatedBoard = game.board.map(render).join('');
  gameboard.innerHTML = updatedBoard;
  whoWon();
  if (game.turn >= 8 && whoWon() == false) {
    draw();
  }
  changePlayer();
  console.log(game.currentPlayer);
  game.turn++;
  console.log(game.turn);
}

function resetGame(e) {
  e.preventDefault();
  game.currentPlayer = 'X';
  game.human = '';
  game.computer = '';
  game.turn = 0;
  game.board = [null, null, null, null, null, null, null, null, null];
  gameboard.innerHTML = `
      <div id="square1" class="square"></div>
      <div id="square2" class="square"></div>
      <div id="square3" class="square"></div>
      <div id="square4" class="square"></div>
      <div id="square5" class="square"></div>
      <div id="square6" class="square"></div>
      <div id="square7" class="square"></div>
      <div id="square8" class="square"></div>
      <div id="square9" class="square"></div>`;
}

function handleMove (e) {
  // Check if move is valid, if it is, update board and state
  if (game.board[(e.target.id.split('').pop()) - 1] === null) {
    game.board[(e.target.id.split('').pop()) - 1] = game.currentPlayer;
    updateState();
  }
  console.log(game.board);
}

gameboard.addEventListener('click', (e) => handleMove(e));
reset.addEventListener('click', (e) => resetGame(e));