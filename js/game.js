// click div and change color
const circles = document.getElementsByClassName('col');
const redBtn = document.getElementById('choose-red-player');
const yellowBtn = document.getElementById('choose-yellow-player');

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.addEventListener('click', () => {
      if (redBtn.classList.contains('disabled')) {
        fillRed(circle);
      } else {
        fillYellow(circle);
      }
    });
}

redBtn.addEventListener('click', () => {
  selectPlayer(redBtn, yellowBtn);
});

yellowBtn.addEventListener('click', () => {
  selectPlayer(yellowBtn, redBtn);
});

function fillRed(circle) {
  if (circle.classList.contains('bg-danger')) {
    circle.classList.remove('bg-danger');
  } else {
    circle.classList.add('bg-danger');
  }
}

function fillYellow(circle) {
  if (circle.classList.contains('bg-warning')) {
    circle.classList.remove('bg-warning');
  } else {
    circle.classList.add('bg-warning');
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
