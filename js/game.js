// elements
/* ----------------------- Element Variables -----------------------*/
const slots = document.getElementsByClassName('circle');
const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');

/* ----------------------- Other Variables -----------------------*/

let player1 = new Player('bg-danger');
player1.turn = true;
let player2 = new Player('bg-warning');
player2.turn = false;
let board = new Board(slots, player1, player2, playerBtns);

const numColumns = 7;
const numSlots = 42;
let lastSlots = [];

/* ----------------------- Event Handling -----------------------*/

resetBtn.addEventListener('click', () => board.reset());

for (let i = 0; i < board.length(); i++) {
    const slot = board.getSlot(i);

    // find index for last slot in current column
    let lastSlotNum = i;
    while ((lastSlotNum + 7) < 42) {
      lastSlotNum += 7;
    }

    let firstSlotNum = i;
    while ((firstSlotNum - 7) >= 0) {
      firstSlotNum -= 7;
    }

    // unbold border of slots of column on mouseout
    slot.addEventListener('mouseover', () => {
      board.boldColumn(lastSlotNum);
    });

    // unbold border of slots of column on mouseout
    slot.addEventListener('mouseout', () => {
      board.unboldColumn(lastSlotNum);
    });

    // add token to lowest slot when a slot in the column is clicked
    slot.addEventListener('click', () => {
      board.fillSlot(firstSlotNum, lastSlotNum)
    });
}
