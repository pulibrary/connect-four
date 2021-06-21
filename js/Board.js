class Board {
  constructor(slots, playerBtns) {
    this.slots = slots;
    this.playerBtns = playerBtns;

    this.player1 = new Player('bg-danger');
    this.player2 = new Player('bg-warning');

    this.player1.turn = true;
    this.player2.turn = false;

    this.currentPlayer = this.player1;
  }

  getSlot(i) {
    return this.slots[i];
  }

  // returns board's length
  length() {
    return this.slots.length;
  }

  // clears all filled slots
  reset() {
    for (let i = 0; i < this.slots.length; i++) {
        let slot = this.slots[i];
        slot.classList.remove(this.player1.color);
        slot.classList.remove(this.player2.color);
        slot.classList.remove('filled');
    }
  }

  // determines if selected slot is filled.
  slotFilled(slot) {
    return slot.classList.contains('filled');
  }

  // bold border of slots in column
  boldColumn(lastSlotNum) {
    for (let i = lastSlotNum; i >= 0; i -= 7) {
      this.getSlot(i).style.border = '4px solid black';
    }
  }

  // unbold border of slots in column
  unboldColumn(lastSlotNum) {
    for (let i = lastSlotNum; i >= 0; i -= 7) {
      this.getSlot(i).style.border = '2px solid black';
    }
  }

  // updates which btn is highlighted to indicate whose turn it is
  updateTurns() {
    // if there is a win, don't update next turn
    if (board.checkWin())
      return;

    for (let i = 0; i < playerBtns.length; i++) {
      let playerBtn = playerBtns[i];
      if (playerBtn.classList.contains('d-none'))
        playerBtn.classList.remove('d-none');
      else
        playerBtn.classList.add('d-none')
    }

    if (this.player1.turn)
      this.currentPlayer = this.player2;
    else
      this.currentPlayer = this.player1;

    this.player1.updateTurn();
    this.player2.updateTurn();
  }

  // finds the lowest slot in a column that has not been filled and fill it
  fillSlot(firstSlotNum, lastSlotNum) {
    let color = this.currentPlayer.color;

    for (let i = firstSlotNum; i <= lastSlotNum; i += numColumns) {
      let slot = slots[i];

      if (this.slotFilled(slots[firstSlotNum])) {
        return;
      }

      if (!this.slotFilled(slot)) {
        slot.classList.add(color);
        slot.classList.remove(color);
      } else {
        if (i - numColumns >= 0) {
          slots[i - numColumns].classList.add(color);
          slots[i - numColumns].classList.add('filled');
          this.updateTurns();
        }
        return;
      }

      // if its the last row and its empty, u want to fill the slot
      if (i === lastSlotNum && !this.slotFilled(slot)) {
        slot.classList.add(color);
        slot.classList.add('filled');
        this.updateTurns();
        return;
      }
    }
  }

  // check to see if there is a win
  checkWin() {
    return false;
  }
}
