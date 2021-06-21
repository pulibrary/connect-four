class Board {
  constructor(slots, color1, color2) {
    this.slots = slots;
    this.color1 = color1;
    this.color2 = color2;
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
        if (slot.classList.contains(this.color1)) {
          slot.classList.remove(this.color1);
        } else if (slot.classList.contains(this.color2)) {
          slot.classList.remove(this.color2);
        }
    }
  }

  // determines if selected slot is filled.
  slotFilled(slot) {
    return slot.classList.contains(this.color1) || slot.classList.contains(this.color2);
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
  highlightTurn(playerBtns) {
    for (let i = 0; i < playerBtns.length; i++) {
      let playerBtn = playerBtns[i];
      if (playerBtn.classList.contains('d-none')) {
        playerBtn.classList.remove('d-none');
      } else {
        playerBtn.classList.add('d-none')
      }
    }
  }

  // Finds the lowest slot in a column that has not been filled and fill it.
  fillSlot(firstSlotNum, lastSlotNum, color) {
    for (let i = firstSlotNum; i <= lastSlotNum; i += numColumns) {
      let slot = slots[i];

      if (this.slotFilled(slots[firstSlotNum])) {
        return false;
      }

      if (!this.slotFilled(slot)) {
        slot.classList.add(color);
        slot.classList.remove(color);
      } else {
        if (i - numColumns >= 0) {
          slots[i - numColumns].classList.add(color);
          this.highlightTurn(playerBtns);
          return true;
        } else {
          return false
        }
      }

      // if its the last row and its empty, u want to fill the slot
      if (i === lastSlotNum && !this.slotFilled(slot)) {
        slot.classList.add(color);
        this.highlightTurn(playerBtns);
        return true;
      }
    }
    return false;
  }
}
