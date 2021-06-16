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
let numClicks = 0;

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    circle.addEventListener('click', () => {
      if (isFilled(circle)) {
        return;
      }

      numClicks++;

      if (redBtn.classList.contains(btnDanger)) {
        fillCircle(circle, 'bg-danger');
        addRemoveClasses(redBtn, yellowBtn, btnDanger, btnOutlineDanger,
                        btnOutlineWarning, btnWarning)
      } else {
        fillCircle(circle, 'bg-warning');
        addRemoveClasses(yellowBtn, redBtn, btnWarning, btnOutlineWarning,
                        btnOutlineDanger, btnDanger)
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
 * This function fills in the circle that was clicked on the board.
 *
 * @param {circle element} circle - Element corresponding to circle on the game board
 * @param {string} color - Class to add color to the element
 *
 * @example
 *
 *     fillCircle(circle, 'bg-warning');
**/
function fillCircle(circle, color) {
  if (circle.classList.contains(color)) {
    circle.classList.remove(color);
  } else {
    circle.classList.add(color);
  }
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
