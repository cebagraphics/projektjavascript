const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let index = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

// Automatisk rulning
function autoSlide() {
  index++;
  updateCarousel();
}

let slideInterval = setInterval(autoSlide, 3000); // Skift hvert 3. sekund

// Opdaterer karussellen
function updateCarousel() {
  if (index >= totalItems) {
    index = 0;
  } else if (index < 0) {
    index = totalItems - 1;
  }
  track.style.transform = `translateX(-${index * 20}%)`;
}

// Knapper til manuel styring
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