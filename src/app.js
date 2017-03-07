import css from './style.css';

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

}

// Function that runs when turn = 9 (whole board is filled and no one won)
function draw() {

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

}