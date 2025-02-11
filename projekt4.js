
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



// Skifter billedern når man hover med musen
function changeImage(element, newSrc) {
    element.src = newSrc;
}

function restoreImage(element, originalSrc) {
    element.src = originalSrc;
}


// FØJ TIL KURV START
let shirt = []; 

let theShirt = { name: "LANGÆRMET TRØJE", price: 599.95 };



// Funktion til at tilføje til favoritter //
document.addEventListener("DOMContentLoaded", function () {
    let favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteCount = document.querySelector(".favorite-count");
    const favoriteDropdown = document.querySelector(".favorite-dropdown");

    // Opdater favoritlisten i UI
    function updateFavorites() {
        favoriteDropdown.innerHTML = "";
        favoriteList.forEach(product => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${product.image}" alt="${product.name}"><span>${product.name}</span>`;
            favoriteDropdown.appendChild(li);
        });
        favoriteCount.textContent = favoriteList.length;

        // Opdater hjerte-styling på produkter
        document.querySelectorAll(".favorite-button").forEach(button => {
            let product = JSON.parse(button.getAttribute("data-product"));
            if (favoriteList.some(item => item.name === product.name)) {
                button.classList.add("favorited");
                button.innerHTML = "&#10084;"; // Fyldt hjerte ♥
            } else {
                button.classList.remove("favorited");
                button.innerHTML = "&#9825;"; // Tomt hjerte ♡
            }
        });
    }

    // Tilføj klik-event til favorit-knapper
    document.querySelectorAll(".favorite-button").forEach(button => {
        button.addEventListener("click", function () {
            let product = JSON.parse(this.getAttribute("data-product"));

            // Tjek om produktet allerede er i listen
            const index = favoriteList.findIndex(item => item.name === product.name);
            if (index === -1) {
                favoriteList.push(product);
            } else {
                favoriteList.splice(index, 1); // Fjern hvis det allerede er tilføjet
            }

            localStorage.setItem("favorites", JSON.stringify(favoriteList));
            updateFavorites();
        });
    });

    // Åbn dropdown ved klik på favoritikonet
    document.getElementById("favorite-icon").addEventListener("click", function (e) {
        e.preventDefault();
        favoriteDropdown.classList.toggle("show-dropdown");
    });

    updateFavorites(); // Indlæs favoritter fra localStorage ved load
});
shirt.push(theShirt);

console.log(shirt);

// FØJ TIL KURV SLUT
