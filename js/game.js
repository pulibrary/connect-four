// elements
const circles = document.getElementsByClassName('circle');
const redBtn = document.getElementById('choose-red-player');
const yellowBtn = document.getElementById('choose-yellow-player');

// red classes
const btnDanger= 'btn-danger';
const btnOutlineDanger = 'btn-outline-danger';
const bgDanger = 'bg-danger';

// yellow classes
const btnWarning = 'btn-warning';
const btnOutlineWarning = 'btn-outline-warning';
const bgWarning = 'bg-warning';

const disabled = 'disabled';
const numRows = 6;
let numClicks = 0;

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    circle.addEventListener('click', () => {
      const colNumber = parseInt(circle.innerHTML, 10);

      if (redBtn.classList.contains(btnDanger)) {
        if (fillCircle('bg-danger', colNumber)) {
          addRemoveClasses(redBtn, yellowBtn, btnDanger, btnOutlineDanger,
                          btnOutlineWarning, btnWarning)
        }

      } else {
        if (fillCircle('bg-warning', colNumber)) {
          addRemoveClasses(yellowBtn, redBtn, btnWarning, btnOutlineWarning,
                          btnOutlineDanger, btnDanger)
        }
      }

      // if board is full, add alert that can refresh the page
      if (numClicks === 42) {
        if(confirm("Game over! You are out of turns. Click 'OK' to reset the board.")){
            window.location.reload();
        }
      }
    });
}

/**
 * This function determined if selected circle is filled.
 *
 * @param {circle element} circle - Element corresponding to circle on the game board
 * @return {boolean} - Boolean value
 *
 * @example
 *
 *     isFilled(circle);
**/
function isFilled(circle) {
  return circle.classList.contains(bgDanger) || circle.classList.contains(bgWarning);
}

/**
 * This function finds the lowest circle in a column that has not been filled
 * and fills it.
 *
 * @param {color} circle - Color to fill a circle.
 * @param {colNumber} color - Column number that was clicked

 * @return {boolean} - Returns whether a circle was filled or not
 *
 * @example
 *
 *     fillCircle(circle, 'bg-warning');
**/
function fillCircle(color, colNumber) {
  for (let i = numRows; i > 0; i--) {
    let row = document.querySelector(`.grid .row:nth-child(${i})`);
    let circle = row.childNodes[colNumber * 2 + 1];
    if (!isFilled(circle)) {
      numClicks++;
      circle.classList.add(color);
      return true;
    }
  }
  return false;
}

/**
 * This function updates which player button is highlighted to indicate whose
 * turn it is.
 *
 * @param {button element} currentBtn - Button corresponding to current player color
 * @param {button element} nextBtn - Button corresponding to next player color
 * @param {string} currentRemove - Class to remove from current button
 * @param {string} currentAdd - Class to add to current button
 * @param {string} nextRemove - Class to remove from next button
 * @param {string} nextAdd - Class to add to next button
 *
 * @example
 *
 *     addRemoveClasses(redBtn, yellowBtn, 'btn-danger', 'btn-outline-danger',
 *               'btn-outline-warning', 'btn-warning');
**/
function addRemoveClasses(currentBtn, nextBtn, currentRemove, currentAdd,
                          nextRemove, nextAdd) {
  currentBtn.classList.remove(currentRemove);
  currentBtn.classList.add(currentAdd);
  currentBtn.classList.add(disabled);

  nextBtn.classList.remove(nextRemove);
  nextBtn.classList.remove(disabled);
  nextBtn.classList.add(nextAdd);
}
