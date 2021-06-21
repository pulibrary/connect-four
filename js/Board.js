class Board {
  constructor(slots, player1, player2, playerBtns) {
    this.slots = slots;
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = this.player1;
    this.playerBtns = playerBtns;
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
        if (slot.classList.contains(this.player1.color)) {
          slot.classList.remove(this.player1.color);
        } else if (slot.classList.contains(this.player2.color)) {
          slot.classList.remove(this.player2.color);
        }
    }
  }

  // determines if selected slot is filled.
  slotFilled(slot) {
    return slot.classList.contains(this.player1.color) || slot.classList.contains(this.player2.color);
  }

  //
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

  // updates which btn is highlighted to indicate whose turn it is.
  updateTurns() {
    for (let i = 0; i < playerBtns.length; i++) {
      let playerBtn = playerBtns[i];
      if (playerBtn.classList.contains('d-none')) {
        playerBtn.classList.remove('d-none');
      } else {
        playerBtn.classList.add('d-none')
      }
    }

    player1.updateTurn();
    player2.updateTurn();
    if (this.currentPlayer === player1) {
      this.currentPlayer = player2;
    } else {
      this.currentPlayer = player1;
    }
  }

  // finds the lowest slot in a column that has not been filled and fill it.
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
          this.updateTurns();
        }
        return;
      }

      // if its the last row and its empty, u want to fill the slot
      if (i === lastSlotNum && !this.slotFilled(slot)) {
        slot.classList.add(color);
        this.updateTurns();
        return;
      }
    }
  }
}
