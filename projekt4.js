
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

function changeImage(imageSrc1, imageSrc2, newText) {
    document.getElementById("product-image-1").src = imageSrc1;
    document.getElementById("product-image-2").src = imageSrc2;
    document.querySelector(".selected-color").textContent = newText;
}

const images = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function moveCarousel() {
  // Fjern 'active' klasse fra alle billeder
  images.forEach((image) => image.classList.remove('active'));

  // Sæt 'active' klasse på det aktuelle billede
  images[currentIndex].classList.add('active');

  // Skub billederne til venstre, så det aktive billede er i midten
  const offset = -currentIndex * 20; // Skubber billederne afhængigt af hvilket billede vi er på
  document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

  // Opdater indekset for næste billede
  currentIndex = (currentIndex + 1) % images.length;
}

// Start karussellen
setInterval(moveCarousel, 3000); // Skift billede hvert 3. sekund