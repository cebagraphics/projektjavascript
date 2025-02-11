const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const totalItems = items.length;
let index = 0;

// Klon første og sidste billeder for at skabe loop
const firstClone = items[0].cloneNode(true);
const lastClone = items[totalItems - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

// Opdater listen med de nye klonede elementer
const updatedItems = document.querySelectorAll('.carousel-item');
const itemWidth = updatedItems[0].offsetWidth; // Dynamisk bredde

// Startposition (springer til første ægte billede)
track.style.transform = `translateX(-${itemWidth}px)`;

function moveCarousel(direction) {
  track.style.transition = "transform 1s ease-in-out";
  index += direction;
  track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;

  setTimeout(() => {
    if (index >= totalItems) {
      index = 0;
      track.style.transition = "none";
      track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
    }
    if (index < 0) {
      index = totalItems - 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
    }
  }, 1000);
}

// Automatisk rulning
let slideInterval = setInterval(() => moveCarousel(1), 3000);

// Knapper til manuel navigation
nextBtn.addEventListener('click', () => {
  moveCarousel(1);
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  moveCarousel(-1);
  resetInterval();
});

// Stopper og genstarter automatisk rulning ved manuel navigation
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => moveCarousel(1), 3000);
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