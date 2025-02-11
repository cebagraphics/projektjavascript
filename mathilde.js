const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = document.querySelectorAll('.carousel-item');

let index = 1; // Starter fra første billede
const itemWidth = items[0].offsetWidth; // Dynamisk bredde

// Klon første og sidste billede for loop-effekt
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

const updatedItems = document.querySelectorAll('.carousel-item');
track.style.transform = `translateX(-${index * itemWidth}px)`;

// Funktion til at opdatere karusellen
function updateCarousel() {
  track.style.transition = "transform 1s ease-in-out";
  track.style.transform = `translateX(-${index * itemWidth}px)`;

  setTimeout(() => {
    if (index >= updatedItems.length - 1) {
      index = 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }
    if (index <= 0) {
      index = updatedItems.length - 2;
      track.style.transition = "none";
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }
  }, 1000);
}

// Automatisk rulning
let slideInterval = setInterval(() => {
  index++;
  updateCarousel();
}, 3000);

// Knapper til manuel navigation
nextBtn.addEventListener('click', () => {
  index++;
  updateCarousel();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  index--;
  updateCarousel();
  resetInterval();
});

// Stopper og genstarter automatisk rulning ved manuel navigation
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    index++;
    updateCarousel();
  }, 3000);
}

// Hover-effekt på "SHOP NOW"-knappen
const shopNowButtons = document.querySelectorAll('.shop-btn');
shopNowButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.borderBottom = "2px solid white";
    });
    button.addEventListener('mouseout', () => {
        button.style.borderBottom = "none";
    });
});

// Sikrer at alt loader rigtigt
window.onload = () => {
    track.style.transition = "none";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
};