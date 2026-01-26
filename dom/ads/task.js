function rotation() {
    const rotators = document.querySelectorAll('.rotator');
    rotators.forEach(rotator => {
       const cases = rotator.querySelectorAll('.rotator__case');
       let currentIndex = 0;

       function roll() {
           cases.forEach(caseElement => {
               caseElement.classList.remove('rotator__case_active');
           });

           const currentCase = cases[currentIndex];
           currentCase.classList.add('rotator__case_active');
           const speed = parseInt(currentCase.dataset.speed) || 1000 // 1000 - если нет атрибута
           const color = currentCase.dataset.color

           if (color) {
               currentCase.style.color = color;
           }

           currentIndex = (currentIndex + 1) % cases.length; // переход к след. элементу

           setTimeout(roll, speed);
       }
       roll();
    });
}

document.addEventListener('DOMContentLoaded', rotation);
