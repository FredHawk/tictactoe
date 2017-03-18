import css from './style.css';

const gameboard = document.querySelector('.gameboard');
const reset = document.querySelector('.reset');
const square = document.querySelectorAll('.square');
const easy = document.querySelector('.easy');
const hard = document.querySelector('.hard');
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const modalGuts = document.querySelector('.modal-guts');

const game = {
  currentPlayer: 'X',
  human: "",
  computer: "",
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
      }, 900);
    }
  } else {
    // Add minimax solution here
    
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

function createEndMessage (gameending) {
  if (gameending === "draw") {
    return `No winner, it is a draw!`;
  }
  return `${gameending} has won!`;
}

function showEnd (endMessage) {
  const node = document.createElement('p');
  node.classList.add('end-message');
  const text = document.createTextNode(endMessage);
  node.appendChild(text);
  modalGuts.appendChild(node);
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}
// Update state ? updating the board and changing player and other stuff.
function updateState () {
  const updatedBoard = game.board.map(render).join('');
  gameboard.innerHTML = updatedBoard;
  if (document.querySelector('.end-message')){
    modalGuts.removeChild(document.querySelector('.end-message'));
  }
  if (whoWon() === true) {
    const endMessage = createEndMessage(game.currentPlayer);
    setTimeout(function() {
      showEnd(endMessage);
    }, 600);
    
  } else if (game.turn >= 8 && whoWon() == false) {
    const endMessage = createEndMessage("draw");
    setTimeout(function() {
      showEnd(endMessage);
    }, 600);
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
  loadGame(e);
}

function handleMove (e) {
  // Check if move is valid, if it is, update board and state
  if (game.board[(e.target.id.split('').pop()) - 1] === null && game.currentPlayer === game.human) {
    game.board[(e.target.id.split('').pop()) - 1] = game.currentPlayer;
    updateState();
  }
  console.log(game.board);
}

function loadGame (e) {
  e.preventDefault();
  const player = document.querySelector('input[name="player"]:checked').value;
  console.log(player);
  game.currentPlayer = 'X';
  game.human = player;
  game.computer = player === 'X' ? 'O' : 'X';
  game.difficulty = e.target.textContent.toLowerCase(),
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