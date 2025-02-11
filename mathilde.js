const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

let index = 0;

// Klon første og sidste billede for en uendelig loop-effekt
const firstClone = items[0].cloneNode(true);
const lastClone = items[totalItems - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

// Opdater antallet af billeder
const updatedItems = document.querySelectorAll('.carousel-item');
const updatedTotalItems = updatedItems.length;

// Automatisk rulning
function autoSlide() {
  index++;
  updateCarousel();
}

let slideInterval = setInterval(autoSlide, 3000); // Skift hvert 3. sekund

// Funktion til at opdatere karusellen
function updateCarousel() {
  if (index >= updatedTotalItems - 1) {
    index = 1;
    track.style.transition = "none"; // Fjerner animation for at lave loop-effekt
    track.style.transform = `translateX(-${index * 20}%)`;
  } else if (index <= 0) {
    index = updatedTotalItems - 2;
    track.style.transition = "none";
    track.style.transform = `translateX(-${index * 20}%)`;
  } else {
    track.style.transition = "transform 1s ease-in-out";
    track.style.transform = `translateX(-${index * 20}%)`;
  }
}

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
  slideInterval = setInterval(autoSlide, 3000);
}
  
  // Håndter klik på "SHOP NOW"-knappen (for at vise URL eller eventuelt en modal)
  const shopNowButtons = document.querySelectorAll('.shop-btn');
  shopNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Forhindrer standardlinkadfærd
      // Åbn en ny side, når knappen klikkes
      window.open('https://www.dinside.dk', '_blank'); // Erstat med din egen URL
    });
  });