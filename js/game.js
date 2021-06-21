/* ----------------------- Variables -----------------------*/

const player1 = new Player('red');
const player2 = new Player('yellow');
player1.turn = true;
player2.turn = false;
const board = new Board();
board.currentWin = false;

const announceWinner = document.getElementById('announce-winner');
const player1Wins = document.getElementById('player1-wins');
const player2Wins = document.getElementById('player2-wins');
const currentPlayerDiv = document.getElementById('current-player');
const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');
const numColumns = 7;
const numSlots = 42;

/* ----------------------- Event Handling -----------------------*/

resetBtn.addEventListener('click', () => {
  board.reset(player1.color, player2.color)
  announceWinner.innerHTML = '';
  board.currentWin = false;
  currentPlayerDiv.classList.remove('d-none');
});

for (let i = 0; i < board.length(); i++) {
    const slot = board.getSlot(i);

    const row = parseInt(slot.parentNode.dataset.row, 10);
    const col = parseInt(slot.dataset.col, 10);

    // find index for first slot in current column
    let firstSlotNum = col + (7 * 0);

    // find index for last slot in current column
    let lastSlotNum = col + (7 * 5);

    // bold border of slots in column on mouseout
    slot.addEventListener('mouseover', () => {
      board.boldColumn(lastSlotNum);
    });

    // unbold border of slots in column on mouseout
    slot.addEventListener('mouseout', () => {
      board.unboldColumn(lastSlotNum);
    });

    // add token to lowest slot when a slot in the column is clicked
    slot.addEventListener('click', () => {
      let currentPlayer = player1;
      if (player2.turn)
        currentPlayer = player2;

      // update turns only if slot is filled
      if (board.fillSlot(firstSlotNum, lastSlotNum, currentPlayer.color)) {
        let winner = board.checkWin();
        let message = '';
        if (winner) {
          if (winner === player1.color) {
            message = '<br />Player 1 wins!<br /><br />';
            player1.updateWins(1);
          } else {
            message = '<br />Player 2 wins!<br /><br />';
            player2.updateWins(1);
          }
          currentPlayerDiv.classList.add('d-none');
          player1Wins.innerHTML = player1.getWins();
          player2Wins.innerHTML = player2.getWins();
          announceWinner.innerHTML = message;
        } else {
          // updates which btn is highlighted to indicate whose turn it is
          for (let i = 0; i < playerBtns.length; i++) {
            let playerBtn = playerBtns[i];
            if (playerBtn.classList.contains('d-none'))
              playerBtn.classList.remove('d-none');
            else
              playerBtn.classList.add('d-none')
          }

          player1.updateTurn();
          player2.updateTurn();
        }
      }
    });
}
