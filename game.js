// elements
const slots = document.getElementsByClassName('circle');
const resetBtn = document.getElementById('reset');
const playerBtns = document.getElementsByClassName('player-btn');

// red classes
const btnDanger = 'btn-danger';
const btnOutlineDanger = 'btn-outline-danger';
const red = 'bg-danger';

// yellow classes
const btnWarning = 'btn-warning';
const btnOutlineWarning = 'btn-outline-warning';
const yellow = 'bg-warning';

const disabled = 'disabled';
const numRows = 6;
let numClicks = 0;

/* Objects -------------------------------------------------------- */

class Board {
  constructor() {
  }
}

class Player {
  constructor(color) {
    this.color = color;
    this.wins = 0;
  }

  set turn(bool) {
    this._turn = bool;
  }

  get turn() {
    return this._turn;
  }

  updateWins() {
    this.wins++;
  }

  getWins() {
    return this.wins;
  }
}

let player1 = new Player(red);
player1.turn = 'true';
let player2 = new Player(yellow);
player2.turn = 'false';

/* /Objects -------------------------------------------------------- */

for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];

    // find last slot in current column
    let lastSlotNum = i;
    while ((lastSlotNum + 7) < 42) {
      lastSlotNum += 7;
    }

    slot.addEventListener('mouseover', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        let slot = slots[i];
        slot.style.border = '4px solid black';
      }
    });

    slot.addEventListener('mouseout', () => {
      for (let i = lastSlotNum; i >= 0; i -= 7) {
        let slot = slots[i];
        slot.style.border = '2px solid black';
      }
    });

    slot.addEventListener('click', () => {
      if (player1.turn) {
        if (fillSlot(lastSlotNum, red)) {
          switchBtns();
          player1.turn = false;
          player2.turn = true;
        }
      } else {
        if (fillSlot(lastSlotNum, yellow)) {
          switchBtns();
          player2.turn = false;
          player1.turn = true;
        }
      }
    });
}

resetBtn.addEventListener('click', () => resetBoard());

/**
 * This function determined if selected slot is filled.
 *
 * @param {slot element} slot - Element corresponding to slot on the game board
 * @return {boolean} - Boolean value
 *
 * @example
 *
 *     isFilled(slot);
**/
function isFilled(slot) {
  return slot.classList.contains(red) || slot.classList.contains(yellow);
}

/**
 * This function clears all filled slots.
 *
 * @example
 *
 *     resetBoard();
**/
function resetBoard() {
  for (let i = 0; i < slots.length; i++) {
      let slot = slots[i];
      if (slot.classList.contains(red)) {
        slot.classList.remove(red);
      } else if (slot.classList.contains(yellow)) {
        slot.classList.remove(yellow);
      }
  }
}

/**
 * This function finds the lowest slot in a column that has not been filled
 * and fills it.
 *
 * @param {color} slot - Color to fill a slot.
 * @param {colNumber} color - Column number that was clicked

 * @return {boolean} - Returns whether a slot was filled or not
 *
 * @example
 *
 *     fillSlot(slot, 'bg-warning');
**/
function fillSlot(lastSlotNum, color) {
  for (let i = lastSlotNum; i >= 0; i -= 7) {
    let slot = slots[i];
    if (!isFilled(slot)) {
      numClicks++;
      slot.classList.add(color);
      return true;
    }
  }
  return false;
}

/**
 * This function updates which btn is highlighted to indicate whose turn it is.
 *
 * @example
 *
 *     switchBtns();
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
