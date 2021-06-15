// click div and change color
const circles = document.getElementsByClassName('col');
const redBtn = document.getElementById('choose-red-player');
const yellowBtn = document.getElementById('choose-yellow-player');

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.addEventListener('click', () => {
      if (redBtn.classList.contains('disabled')) {
        fillCircle(circle, 'bg-danger');
      } else {
        fillCircle(circle, 'bg-warning');
      }
    });
}

redBtn.addEventListener('click', () => {
  selectPlayer(redBtn, yellowBtn);
});

yellowBtn.addEventListener('click', () => {
  selectPlayer(yellowBtn, redBtn);
});

function fillCircle(circle, color) {
  if (circle.classList.contains(color)) {
    circle.classList.remove(color);
  } else {
    circle.classList.add(color);
  }
}

function selectPlayer(btnSelect, btnDeselect) {
  if (!btnSelect.classList.contains('disabled')) {
    btnSelect.classList.add('disabled');
  }
  if (btnDeselect.classList.contains('disabled')) {
    btnDeselect.classList.remove('disabled');
  }
}
