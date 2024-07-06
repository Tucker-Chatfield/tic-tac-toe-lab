document.addEventListener('DOMContentLoaded', () => {
  /*-------------------------------- Constants --------------------------------*/
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [7, 4, 6]
  ];
  
  
  /*---------------------------- Variables (state) ----------------------------*/
  let board;
  let turn;
  let winner;
  let tie;
  
  /*------------------------ Cached Element References ------------------------*/
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.querySelector('#message');
  const resetBtnEl = document.querySelector('#reset');
  
  /*-------------------------------- Functions --------------------------------*/
  function init() {
    //console.log('initializing the game...');
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
    messageEl.textContent = "Instructions:";
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard () {
    board.forEach((cell, index) => {
      squareEls[index].textContent = cell;
    })
  }
  
  function updateMessage () {
    if (!winner && !tie) {
      //Game still in progress, render whose turn
      messageEl.textContent = `${turn}'s turn`;
    } else if (!winner && tie) {
      //Game is tied
      messageEl.textContent = "It's a tie!";
    } else {
      //There is a winner
      messageEl.textContent = `${winner} wins!`;
    }
  }
  
  function placePiece (index) {
    board[index] = turn;
    //console.log(board);
  }
  
  
  function checkforWinner () {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        //console.log("Winner found: ", winner);
        return;
      }
    }
  }
  
  function checkForTie () {
    if (winner) return;
    
    tie = board.every(cell => cell !== '');
    //console.log("Tie status: ", tie);
  }
  
  function switchPlayerTurn () {
    if (winner) return;
    
    turn = turn === 'X' ? 'O' : 'X';
    //console.log("Current turn: ", turn);
  }
  
  function handleClick (event) {
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] || winner) return;
    
    placePiece(squareIndex);
    checkforWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);
  
  init();
});
  