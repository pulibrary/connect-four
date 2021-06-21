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
let board = new Board(slots);

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

    // bold border of current line on mouseover
    slot.addEventListener('mouseover', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        board.getSlot(i).style.border = '4px solid black';
      }
    });

    // un-bold border of current line on mouseout
    slot.addEventListener('mouseout', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        board.getSlot(i).style.border = '2px solid black';
      }
    });

    // add token to lowest slot when a slot in the column is clicked
    slot.addEventListener('click', () => {
      let color = player1.color;
      if (player2.turn)
        color = player2.color;

       if (board.fillSlot(firstSlotNum, lastSlotNum, color)) {
         board.highlightTurn(playerBtns);
         player1.turn = !player1.turn;
         player2.turn = !player2.turn;
       }

    });
}
