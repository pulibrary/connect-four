/* ----------------------- Variables -----------------------*/

const player1 = new Player('red');
const player2 = new Player('yellow');
player1.turn = true;
player2.turn = false;
const board = new Board(player1, player2);

const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');
const numColumns = 7;
const numSlots = 42;

/* ----------------------- Event Handling -----------------------*/

resetBtn.addEventListener('click', () => board.reset());

for (let i = 0; i < board.length(); i++) {
    const slot = board.getSlot(i);

    // find index for last slot in current column
    let lastSlotNum = i;
    while ((lastSlotNum + numColumns) < numSlots) {
      lastSlotNum += numColumns;
    }

    // find index for first slot in current column
    let firstSlotNum = i;
    while ((firstSlotNum - numColumns) >= 0) {
      firstSlotNum -= numColumns;
    }

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
      if (board.fillSlot(firstSlotNum, lastSlotNum)) {
        // updates which btn is highlighted to indicate whose turn it is
        for (let i = 0; i < playerBtns.length; i++) {
          let playerBtn = playerBtns[i];
          if (playerBtn.classList.contains('d-none'))
            playerBtn.classList.remove('d-none');
          else
            playerBtn.classList.add('d-none')
        }


        if (player1.turn)
          board.currentPlayer = player2;
        else
          board.currentPlayer = player1;

        player1.updateTurn();
        player2.updateTurn();
      }
    });
}
