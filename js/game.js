// elements
/* ----------------------- Element Variables -----------------------*/
const slots = document.getElementsByClassName('circle');
const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');

/* ----------------------- Other Variables -----------------------*/

let player1 = new Player('bg-danger');
player1.turn = 'true';
let player2 = new Player('bg-warning');
player2.turn = 'false';

const numColumns = 7;
const numSlots = 42;
let lastSlots = [];

/* ----------------------- Event Handling -----------------------*/

for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];

    // find index for last slot in current column
    let lastSlotNum = i;
    while ((lastSlotNum + 7) < 42) {
      lastSlotNum += 7;
    }

    // bold border of current line on mouseover
    slot.addEventListener('mouseover', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        slots[i].style.border = '4px solid black';
      }
    });

    // un-bold border of current line on mouseout
    slot.addEventListener('mouseout', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        slots[i].style.border = '2px solid black';
      }
    });

    // add token to lowest slot when a slot in the column is clicked
    slot.addEventListener('click', () => {
      let color = player1.color;
      if (player2.turn)
        color = player2.color;

       if (fillSlot(lastSlotNum, color)) {
         switchBtns();
         player1.turn = !player1.turn;
         player2.turn = !player2.turn;
       }

    });
}

resetBtn.addEventListener('click', () => resetBoard());

/* ----------------------- Functions -----------------------*/
/**
 * Determines if selected slot is filled.
 *
 * @param {slot element} slot - Element corresponding to slot on the game board
 * @return {boolean} - Boolean value
**/
function isFilled(slot) {
  return slot.classList.contains(player1.color) || slot.classList.contains(player2.color);
}

/**
 * Clears all filled slots.
**/
function resetBoard() {
  for (let i = 0; i < slots.length; i++) {
      let slot = slots[i];
      if (slot.classList.contains(player1.color)) {
        slot.classList.remove(player1.color);
      } else if (slot.classList.contains(player2.color)) {
        slot.classList.remove(player2.color);
      }
  }
}

/**
 * Finds the lowest slot in a column that has not been filled and fills it.
 *
 * @param {color} number - Index for last slot in clicked column.
 * @param {colNumber} color - Color to fill slot

 * @return {boolean} - Returns whether a slot was filled or not
**/
function fillSlot(lastSlotNum, color) {
  for (let i = lastSlotNum; i >= 0; i -= 7) {
    let slot = slots[i];
    if (!isFilled(slot)) {
      slot.classList.add(color);
      return true;
    }
  }
  return false;
}

/**
 * Updates which btn is highlighted to indicate whose turn it is.
**/
function switchBtns() {
  for (let i = 0; i < playerBtns.length; i++) {
    playerBtn = playerBtns[i];
    if (playerBtn.classList.contains('d-none')) {
      playerBtn.classList.remove('d-none');
    } else {
      playerBtn.classList.add('d-none')
    }
  }
}
