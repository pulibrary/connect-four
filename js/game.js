// click div and change color
const circles = document.getElementsByClassName('col');
const redBtn = document.getElementById('choose-red-player');
const yellowBtn = document.getElementById('choose-yellow-player');
let numClicks = 0;

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    const btnDanger= 'btn-danger';
    const btnOutlineDanger = 'btn-outline-danger';

    const btnWarning = 'btn-warning';
    const btnOutlineWarning = 'btn-outline-warning';

    const disabled = 'disabled';

    circle.addEventListener('click', () => {
      if (circle.classList.contains('bg-danger') ||
          circle.classList.contains('bg-warning')) {
        return;
      }

      numClicks++;

      if (redBtn.classList.contains(btnDanger)) {
        fillCircle(circle, 'bg-danger');

        redBtn.classList.remove(btnDanger);
        redBtn.classList.add(btnOutlineDanger);
        redBtn.classList.add(disabled);

        yellowBtn.classList.remove(btnOutlineWarning);
        yellowBtn.classList.remove(disabled);
        yellowBtn.classList.add(btnWarning);
      } else {
        fillCircle(circle, 'bg-warning');

        yellowBtn.classList.remove(btnWarning);
        yellowBtn.classList.add(btnOutlineWarning);
        yellowBtn.classList.add(disabled);

        redBtn.classList.remove(btnOutlineDanger);
        redBtn.classList.remove(disabled);
        redBtn.classList.add(btnDanger);
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
