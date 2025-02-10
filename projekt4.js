
// ZOOM EFFEKT

document.querySelectorAll("#product-image-1").forEach((img) => {
    img.addEventListener("mouseenter", function () {
      createZoomEffect(img);
    });
  });
  
  function createZoomEffect(img) {
    var lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.appendChild(lens);
  
    var cx = 2; // Zoom faktor
    var cy = 2;
  
    lens.style.backgroundImage = "url('" + img.src + "')";
    lens.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  
    function moveLens(e) {
      e.preventDefault();
      var pos = getCursorPos(e, img);
      var x = pos.x - lens.offsetWidth / 2;
      var y = pos.y - lens.offsetHeight / 2;
  
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;
  
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      lens.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }
  
    function getCursorPos(e, img) {
      var a = img.getBoundingClientRect();
      var x = e.pageX - a.left - window.pageXOffset;
      var y = e.pageY - a.top - window.pageYOffset;
      return { x: x, y: y };
    }
  
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mouseleave", () => lens.remove());
    img.addEventListener("mouseleave", () => lens.remove());
  }
  
  document.querySelectorAll("#product-image-2").forEach((img) => {
    img.addEventListener("mouseenter", function () {
      createZoomEffect(img);
    });
  });
  
  function createZoomEffect(img) {
    var lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.appendChild(lens);
  
    var cx = 2; // Zoom faktor
    var cy = 2;
  
    lens.style.backgroundImage = "url('" + img.src + "')";
    lens.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  
    function moveLens(e) {
      e.preventDefault();
      var pos = getCursorPos(e, img);
      var x = pos.x - lens.offsetWidth / 2;
      var y = pos.y - lens.offsetHeight / 2;
  
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;
  
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      lens.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }
  
    function getCursorPos(e, img) {
      var a = img.getBoundingClientRect();
      var x = e.pageX - a.left - window.pageXOffset;
      var y = e.pageY - a.top - window.pageYOffset;
      return { x: x, y: y };
    }
  
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mouseleave", () => lens.remove());
    img.addEventListener("mouseleave", () => lens.remove());
  }
  
  
//ZOOM EFFEKT SLUT

//Skift farve på sweater //
function changeImage(imageSrc1, imageSrc2, newText) {
    document.getElementById("product-image-1").src = imageSrc1;
    document.getElementById("product-image-2").src = imageSrc2;
    document.querySelector(".selected-color").textContent = newText;
}

//Slideshow
let currentIndex = 0; // Start med første billede
const galleryItems = document.querySelectorAll('.gallery-item');
const totalItems = galleryItems.length;

// Funktion til at animere billederne
function moveImages() {
  // Flyt containeren mod venstre
  const galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.style.transition = 'transform 1s ease-in-out';
  galleryContainer.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

  // Når billederne er animeret, flyt det første billede til slutningen
  setTimeout(() => {
    // Flyt det første billede til slutningen af rækken
    galleryContainer.appendChild(galleryItems[currentIndex]);
    currentIndex = (currentIndex + 1) % totalItems; // Opdater index
    galleryContainer.style.transition = 'none';  // Fjern overgangen
    galleryContainer.style.transform = `translateX(0%)`;  // Reset positionen
  }, 1000); // Vent 1 sekund, så animationen kan afsluttes
}

// Start slideshowet, der kører automatisk
setInterval(moveImages, 3000);

// Håndter klik på "SHOP NOW"-knappen (for at vise URL eller eventuelt en modal)
const shopNowButtons = document.querySelectorAll('.shop-btn');
shopNowButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Forhindrer standardlinkadfærd
    // Åbn en ny side, når knappen klikkes
    window.open('https://www.dinside.dk', '_blank'); // Erstat med din egen URL
  });
});
