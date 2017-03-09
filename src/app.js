import css from './style.css';

const gameboard = document.querySelector('.gameboard');

const game = {
  currentPlayer: 'X',
  human: '',
  computer: '',
  turn: 0,
  board: [null, null, null,
          null, null, null,
          null, null, null],
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
  if (game.currentPlayer == 'X') {
    game.currentPlayer = 'O';
  } else {
    game.currentPlayer = 'X';
  }
}

// AI function - Don't know how to do this one yet.
function aiMove () {

}

// Update state ? updating the board and changing player and other stuff.
function updateState () {

  whoWon();
  if (game.turn == 8 && whoWon() == false) {
    draw();
  } else {
    changePlayer();
    game.turn++;
  }
}

function handleMove (e) {
  console.log((e.target.id.split('').pop()) - 1);
  if (game.board[(e.target.id.split('').pop()) - 1] === null) {
    game.board[(e.target.id.split('').pop()) - 1] = game.currentPlayer;
  }
  console.log(game.board);
  updateState();
}

gameboard.addEventListener('click', (e) => handleMove(e));