import css from './style.css';

const gameboard = document.querySelector('.gameboard');
const reset = document.querySelector('.reset');
const square = document.querySelectorAll('.square');

const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button");

const game = {
  currentPlayer: 'X',
  human: 'X',
  computer: 'O',
  difficulty: 'easy',
  turn: 0,
  board: [null, null, null,
          null, null, null,
          null, null, null],
}

// Set which is human and which is AI.
function setPlayers () {
  game.human == 'X' ? game.computer = 'O' : game.computer = 'X';
  // Set the game.human and game.computer based on click event listener.
}

// Function that calculates if someone has won
function whoWon () {
  switch (true) {
    case game.board[0] === game.currentPlayer && game.board[1] === game.currentPlayer && game.board[2] === game.currentPlayer: 
      return true;
      break;
    case game.board[3] === game.currentPlayer && game.board[4] === game.currentPlayer && game.board[5] === game.currentPlayer: 
      return true;
      break;
    case game.board[6] === game.currentPlayer && game.board[7] === game.currentPlayer && game.board[8] === game.currentPlayer: 
      return true;
      break;
    case game.board[0] === game.currentPlayer && game.board[3] === game.currentPlayer && game.board[6] === game.currentPlayer: 
      return true;
      break;
    case game.board[1] === game.currentPlayer && game.board[4] === game.currentPlayer && game.board[7] === game.currentPlayer: 
      return true;
      break;
    case game.board[2] === game.currentPlayer && game.board[5] === game.currentPlayer && game.board[8] === game.currentPlayer: 
      return true;
      break;
    case game.board[0] === game.currentPlayer && game.board[4] === game.currentPlayer && game.board[8] === game.currentPlayer: 
      return true;
      break;
    case game.board[2] === game.currentPlayer && game.board[4] === game.currentPlayer && game.board[6] === game.currentPlayer: 
      return true;
      break;
    default:
      return false;
      break;
  }
}

// Function that changes who the currentPlayer is
function changePlayer () {
  game.currentPlayer == 'X' ? game.currentPlayer = 'O' : game.currentPlayer = 'X';
}

function getRandomCell () {
  return Math.floor(Math.random() * game.board.length);
}

function aiMove () {
  if (game.difficulty == 'easy') {

    const rand = getRandomCell();
    console.log('rand:', rand);
    if (game.board[rand]) {
      // run the randomize function again
      aiMove();
      console.log('rand is null:', rand);
    } else {
      // update array
      game.board[rand] = game.currentPlayer;
      console.log('rand not null:', rand);
      setTimeout(function() {
        updateState();
      }, 1000);
    }
  } else {

  }
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
  if (whoWon() === true) {
    console.log(`${game.currentPlayer} has won!`);
    // Show modal of who has won and a button to reset game.

  } else if (game.turn >= 8 && whoWon() == false) {
    console.log('No winner, it is a draw');
    // Show modal of draw and a button to reset game.

  } else {
    changePlayer();
    console.log('Curr player:', game.currentPlayer);
    game.turn++;
    console.log('Curr turn:',game.turn);
    if (game.currentPlayer === game.computer) {
      aiMove();
    }
  }
}

function resetGame(e) {
  e.preventDefault();
  game.currentPlayer = 'X';
  game.human = 'X';
  game.computer = 'O';
  difficulty: 'easy',
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

// function load () {
//   // modal.classList.toggle("closed");
//   // modalOverlay.classList.toggle("closed");
// }
gameboard.addEventListener('click', (e) => handleMove(e));
reset.addEventListener('click', (e) => resetGame(e));

// closeButton.addEventListener("click", function() {
//   modal.classList.toggle("closed");
//   modalOverlay.classList.toggle("closed");
// });

// window.onload = load;