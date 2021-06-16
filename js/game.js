// elements
const circles = document.getElementsByClassName('col');
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
      if (circle.classList.contains(bgDanger) ||
          circle.classList.contains(bgWarning)) {
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

      if (numClicks === 42) {
        if(confirm("Game over! You are out of turns. Click 'OK' to reset the board.")){
            window.location.reload();
        }
      }
    });
}

function fillCircle(circle, color) {
  if (circle.classList.contains(color)) {
    circle.classList.remove(color);
  } else {
    circle.classList.add(color);
  }
}

function addRemoveClasses(currentBtn, nextBtn, currentRemoveClass,
                          currentAddClass, nextRemoveClass, nextAddClass) {
  currentBtn.classList.remove(currentRemoveClass);
  currentBtn.classList.add(currentAddClass);
  currentBtn.classList.add(disabled);

  nextBtn.classList.remove(nextRemoveClass);
  nextBtn.classList.remove(disabled);
  nextBtn.classList.add(nextAddClass);
}
