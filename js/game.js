/* ----------------------- Elements -----------------------*/

const announceWinner = document.getElementById('announce-winner');
const player1Wins = document.getElementById('player1-wins');
const player2Wins = document.getElementById('player2-wins');
const currentPlayerDiv = document.getElementById('current-player');
const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');

/* ----------------------- Variables -----------------------*/

const numRows = 6; // rows are numbered top left to bottom right
const numColumns = 7;
const numSlots = 42;
const color1 = 'red';
const color2 = 'yellow';
const displayNone = 'd-none';

const player1 = new Player(color1);
const player2 = new Player(color2);
player1.turn = true;
player2.turn = false;

const board = new Board();
board.currentWin = false;

/* ----------------------- Event Handling -----------------------*/

resetBtn.addEventListener('click', () => {
  board.reset(player1.color, player2.color)
  announceWinner.innerHTML = '';
  board.currentWin = false;
  currentPlayerDiv.classList.remove(displayNone);
  announceWinner.parentNode.classList.add(displayNone);
});

for (let i = 0; i < board.length(); i++) {
    const slot = board.getSlot(i);

    const col = parseInt(slot.dataset.col, 10);

    // find index for first slot in current column
    let firstSlotNum = col;

    // find index for last slot in current column
    let lastSlotNum = col + (numColumns * (numRows - 1));

    // bold border of slots in column on mouseout
      slot.addEventListener('mouseover', () => {
        if (!board.currentWin) {
          board.boldColumn(lastSlotNum);
        }
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
        let winner = board.checkWin(player1.color, player2.color);
        let message = '';
        if (winner) {
          // update announcement message and color
          if (winner === player1.color) {
            message = 'Player 1 wins!';
            player1.updateWins(1);
            announceWinner.classList.remove(color2);
            announceWinner.classList.add(color1);
          } else {
            message = 'Player 2 wins!';
            player2.updateWins(1);
            announceWinner.classList.remove(color1);
            announceWinner.classList.add(color2);
          }
          currentPlayerDiv.classList.add(displayNone);
          player1Wins.innerHTML = player1.getWins();
          player2Wins.innerHTML = player2.getWins();
          announceWinner.innerHTML = message;
          announceWinner.parentNode.classList.remove(displayNone);
        } else {
          // updates which btn is highlighted to indicate whose turn it is
          for (let i = 0; i < playerBtns.length; i++) {
            let playerBtn = playerBtns[i];
            if (playerBtn.classList.contains(displayNone))
              playerBtn.classList.remove(displayNone);
            else
              playerBtn.classList.add(displayNone)
          }

          player1.updateTurn();
          player2.updateTurn();
        }
      }
    });
}
