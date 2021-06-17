class Board {
  constructor(slots) {
    this.slots = slots;
  }


  getSlot(i) {
    return this.slots[i];
  }

  length() {
    return this.slots.length;
  }

  /**
   * Clears all filled slots.
  **/
  reset() {
    for (let i = 0; i < this.slots.length; i++) {
        let slot = this.slots[i];
        if (slot.classList.contains(player1.color)) {
          slot.classList.remove(player1.color);
        } else if (slot.classList.contains(player2.color)) {
          slot.classList.remove(player2.color);
        }
    }
  }
}
