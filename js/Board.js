class Board {
  constructor() {
    this.slots = document.getElementsByClassName('circle');
    this.currentWin = false;
  }

  // returns slot at index i
  getSlot(i) {
    return this.slots[i];
  }

  // returns board's length
  length() {
    return this.slots.length;
  }

  //
  get _currentWin() {
    return this._currentWin;
  }

  //
  set _currentWin(bool) {
    this._currentWin = bool;
  }

  // clears all filled slots
  reset(color1, color2) {
    for (let i = 0; i < this.length(); i++) {
        let slot = this.getSlot(i);
        slot.classList.remove(color1);
        slot.classList.remove(color2);
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

  // finds the lowest slot in a column that has not been filled and fill it
  fillSlot(firstSlotNum, lastSlotNum, color) {
    if (this.currentWin) {
      return false;
    }

    for (let i = firstSlotNum; i <= lastSlotNum; i += numColumns) {
      let slot = this.getSlot(i);

      if (this.slotFilled(this.getSlot(firstSlotNum))) {
        return false;
      }

      if (!this.slotFilled(slot)) {
        slot.classList.add(color);
        slot.classList.remove(color);
      } else {
        if (i - numColumns >= 0) {
          let prevSlot = this.getSlot(i - numColumns);
          prevSlot.classList.add(color);
          prevSlot.classList.add('filled');
          return true;
        }
        return false;
      }

      // if it's the last row and its empty, u want to fill the slot
      if (i === lastSlotNum && !this.slotFilled(slot)) {
        slot.classList.add(color);
        slot.classList.add('filled');
        return true;
      }
    }
    return false;
  }


  // check to see if there is a win
  checkWin() {
    // for each row
    let winner = 0;
    for (let i = this.length() - 1; i >= 0 ; i -= 7) {
      // for each col, check for winners horizontally
      for (let j = i; j > i - 7 ; j--) {
        let count = 0;
        let slot = board.getSlot(j);
        let color = 'red';

        if (this.slotFilled(slot)) {
          count++;
          if (slot.classList.contains('yellow')) {
            color = 'yellow';
          }
          for (let k = j - 1; k > i - 7 ; k--) {
            slot = board.getSlot(k);
            if (this.slotFilled(slot) && slot.classList.contains(color)) {
              count++;
            } else {
              break;
            }
            if (count == 4) {
              console.log(color + " wins!");
              this.currentWin = true;
              return color;
            }
          }
          count = 0;
        }
      }
    }
    return false;
  }
}
