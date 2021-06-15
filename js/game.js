// click div and change color
const circles = document.getElementsByClassName('col');

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.addEventListener('click', () => {
      if (circle.classList.contains('bg-primary')) {
        circle.classList.remove('bg-primary');
      } else {
        circle.classList.add('bg-primary');
      }
    });
}
