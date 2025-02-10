
// ZOOM EFFEKT

// ZOOM EFFEKT

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  // Create magnifier glass
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  // Insert magnifier glass
  img.parentElement.insertBefore(glass, img);

  // Set background properties for the magnifier glass
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  // Show the magnifier glass when hovering over the image
  img.addEventListener("mouseenter", function () {
    glass.style.display = "block";
  });

  // Hide the magnifier glass when the mouse leaves the image
  img.addEventListener("mouseleave", function () {
    glass.style.display = "none";
  });

  // Execute a function when someone moves the magnifier glass over the image
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  // And also for touch screens
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    // Prevent any other actions that may occur when moving over the image
    e.preventDefault();
    // Get the cursor's x and y positions
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    // Prevent the magnifier glass from being positioned outside the image
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    // Set the position of the magnifier glass
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    // Display what the magnifier glass "sees"
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    // Get the x and y positions of the image
    a = img.getBoundingClientRect();
    // Calculate the cursor's x and y coordinates, relative to the image
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    // Consider any page scrolling
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

// Execute the magnify function for both images
magnify("product-image-1", 3);


//ZOOM EFFEKT SLUT

//Skift farve på sweater //
document.addEventListener("DOMContentLoaded", function() {
    function changeImage(imageSrc1, imageSrc2, newText) {
        document.getElementById("product-image-1").src = imageSrc1;
        document.getElementById("product-image-2").src = imageSrc2;
        document.querySelector(".selected-color").textContent = newText;
    }
    window.changeImage = changeImage;
});

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

// Håndter klik på "SHOP NOW"-knappen (for at vise URL eller eventuelt en modal)
const shopNowButtons = document.querySelectorAll('.shop-btn');
shopNowButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Forhindrer standardlinkadfærd
    // Åbn en ny side, når knappen klikkes
    window.open('https://www.dinside.dk', '_blank'); // Erstat med din egen URL
  });
});
  // Hvis vi når slutningen, så hop tilbage til første billede
  if (index >= totalSlides) {
    index = 0;
  }

  // Hvis vi er før det første billede, så hop til sidste billede
  if (index < 0) {
    index = totalSlides - 1;
  }

  // Tilføj 'active' klassen til det næste billede
  slides[index].classList.add('active');

  // Opdater transform på carousel-images for at skifte billede
  document.querySelector('.carousel-images').style.transform = `translateX(-${index * 25}%)`;


// Skifter billedern når man hover med musen
function changeImage(element, newSrc) {
    element.src = newSrc;
}

function restoreImage(element, originalSrc) {
    element.src = originalSrc;
}


// Sikrer, at størrelsesknapperne fungerer
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".size-button").forEach(button => {
        button.addEventListener("click", function () {
            // Fjerner "active" fra alle størrelsesknapper
            document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("active"));

            // Tilføjer "active" til den valgte knap
            this.classList.add("active");
        });
    });
});

// Funktion til at tilføje produkt til kurven
function addToCart() {
    let imageSrc = document.getElementById("product-image-1").src; // Finder det aktuelle produktbillede
    let selectedSizeButton = document.querySelector(".size-button.active"); // Finder den aktive størrelse

    if (!selectedSizeButton) {
        alert("Vælg venligst en størrelse før du lægger i kurven!");
        return;
    }

    let selectedSize = selectedSizeButton.dataset.size; // Henter størrelsen fra "data-size" attributten

    let product = { image: imageSrc, size: selectedSize };
    
    console.log("Tilføjer til kurv:", product); // Debug - tjek om det virker

    cart.push(product); // Tilføjer produktet til kurven

    updateCart(); // Opdaterer kurven
}
