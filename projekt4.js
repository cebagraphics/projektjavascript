
// ZOOM EFFEKT START
document.getElementById('product-image-1-container').addEventListener('mouseover', function(){
  imageZoom('product-image-1')
  document.getElementById('lens').style.display = 'block'
})

document.getElementById('product-image-1-container').addEventListener('mouseout', function(){
  document.getElementById('lens').style.display = 'none'
})

function imageZoom(imgID){
let img = document.getElementById(imgID)
let lens = document.getElementById('lens')

lens.style.backgroundImage = "url('" + img.src + "')";

let ratio = 3

lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

img.addEventListener("mousemove", moveLens)
lens.addEventListener("mousemove", moveLens)

function moveLens(e){
  let pos = getCursor(e)

  let positionLeft = pos.x - (lens.offsetWidth / 2)
  let positionTop = pos.y - (lens.offsetHeight / 2)

  if(positionLeft < 0){
      positionLeft = 0
  }
  if(positionTop < 0){
      positionTop = 0
  }

  if(positionLeft > img.width - lens.offsetWidth ){
      positionLeft = img.width - lens.offsetWidth
  }
  if(positionTop > img.height - lens.offsetHeight){
      positionTop = img.height - lens.offsetHeight
  }

  lens.style.left = positionLeft + 'px';
  lens.style.top = positionTop + 'px';

  lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px'
}

function getCursor(e) {
  let bounds = img.getBoundingClientRect();

  let x = e.pageX - bounds.left
  let y = e.pageY - bounds.top
 
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  return {'x':x, 'y':y}

}}

imageZoom('product-image-1')
document.getElementById('lens').style.display = 'none';
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


// KARUSEL
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const items = document.querySelectorAll('.carousel-item');
  let index = 0;
  const totalItems = items.length;

  function updateCarousel() {
      if (index >= totalItems) {
          index = 0;
      } else if (index < 0) {
          index = totalItems - 1;
      }
      track.style.transform = `translateX(-${index * 20}%)`;
  }

  function autoSlide() {
      index++;
      updateCarousel();
  }

  let slideInterval = setInterval(autoSlide, 3000);

  function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 3000);
  }

  if (nextBtn && prevBtn) {
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
  }
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


// SKIFTER BILLED NÅR MAN HOVER MED MUSEN
function changeImageHover(element, newSrc) {
  element.src = newSrc;
}

function restoreImage(element, originalSrc) {
  element.src = originalSrc;
}


// SKIFTER BILLEDE NÅR MAN TRYKKER PÅ FARVEKNAP
function changeImage1(imagePath) {
  // Find billedet med ID 'productImage' og skift src
  document.getElementById('product1image').src = imagePath;
}

function changeImage2(imagePath) {
  // Find billedet med ID 'productImage' og skift src
  document.getElementById('product2image').src = imagePath;
}

function changeImage4(imagePath) {
  // Find billedet med ID 'productImage' og skift src
  document.getElementById('product4image').src = imagePath;
}

function changeImage5(imagePath) {
  // Find billedet med ID 'productImage' og skift src
  document.getElementById('product5image').src = imagePath;
}

function changeImage7(imagePath) {
  // Find billedet med ID 'productImage' og skift src
  document.getElementById('product7image').src = imagePath;
}



// TOP BAR SOM SKIFTER TEKST
const messages = [
  "10% rabat på din næste ordre",
  "Bliv medlem af SELECTED+",
  "Saml point og optjen belønninger",
];

let currentMessageIndex = 0;
const changingTextElement = document.getElementById("changing-text");

function changeMessage() {
  // Fjern animationen og tekst
  changingTextElement.classList.remove("show-text");

  // Ændre teksten med det samme
  changingTextElement.textContent = messages[currentMessageIndex];
  currentMessageIndex = (currentMessageIndex + 1) % messages.length;

  // Tilføj animationen for at få den nye tekst til at fade ind og ud
  changingTextElement.classList.add("show-text");
}

// Skift teksten straks og sæt interval for at skifte den
setInterval(changeMessage, 3500); // Skifter tekst hvert 3.5 sekund
changeMessage(); // Initial tekst



// FØJ TIL KURV START
let shirt = []; // Array for at gemme produkter i kurven

// Opret produktet
let theShirt = { name: "LANGÆRMET TRØJE", price: 599.95 };

// Variabel til at holde styr på den valgte størrelse
let selectedSize = null;

// Funktion til at tilføje produkt til kurv
function addToCart() {
    if (selectedSize !== null) {
        // Tilføj produkt med den valgte størrelse til kurven
        let productWithSize = { ...theShirt, size: selectedSize };
        shirt.push(productWithSize);

        // Opdater kurv tælleren
        updateCartCount();

        // Vis toast besked
        showToast(`Produktet "${theShirt.name}" med størrelse ${selectedSize} er føjet til kurven.`);
    } else {
        showToast("Vælg venligst en størrelse.");
    }
}

// Funktion til at opdatere kurv tælleren
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = shirt.length; // Opdater kurv med antal varer
}

// Funktion til at vise toast besked
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    toastMessage.textContent = message;

    // Vis toast
    toast.classList.add("show");

    // Skjul toast efter 3 sekunder
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // 3000ms = 3 sekunder
}

// Lyt efter klik på størrelsesknapperne
const sizeButtons = document.querySelectorAll(".size-button");
sizeButtons.forEach(button => {
    button.addEventListener("click", function() {
        selectedSize = button.getAttribute("data-size"); // Sæt den valgte størrelse

        // Fjern 'selected' klasse fra alle knapper
        sizeButtons.forEach(b => b.classList.remove("selected"));
        
        // Tilføj 'selected' klasse til den valgte knap
        button.classList.add("selected");

        console.log("Valgt størrelse:", selectedSize);
    });
});

// Lyt efter klik på "FØJ TIL KURV" knappen
const addToCartButton = document.querySelector(".selected-add-to-cart");
addToCartButton.addEventListener("click", addToCart);


// FØJ TIL KURV SLUT


// FAVOURITE KNAP START
document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  const favoriteList = document.querySelector(".favorite-dropdown");
  const favoriteCount = document.querySelector(".favorite-count");
  const favoriteToggle = document.querySelector(".favorite-toggle");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function updateFavorites() {
      favoriteList.innerHTML = "";
      
      if (favorites.length === 0) {
          favoriteList.innerHTML = "<li>Ingen favoritter endnu</li>";
      } else {
          favorites.forEach(product => {
              let li = document.createElement("li");
              li.innerHTML = `
                  <img src="${product.image}" alt="${product.name}">
                  <span>${product.name} - ${product.price}</span>
              `;
              favoriteList.appendChild(li);
          });
      }

      favoriteCount.textContent = favorites.length;
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function toggleFavorite(product) {
      let index = favorites.findIndex(item => item.name === product.name);

      if (index === -1) {
          favorites.push(product);
      } else {
          favorites.splice(index, 1);
      }

      document.querySelectorAll(`.favorite-button[data-product*='"name": "${product.name}"']`)
          .forEach(button => {
              button.src = index === -1 
                  ? "Selected femme/fyldthjerte.png" 
                  : "Selected femme/Hjerteikon.png";
          });

      updateFavorites();
  }

  favoriteButtons.forEach(button => {
      button.addEventListener("click", () => {
          let product = JSON.parse(button.dataset.product);
          toggleFavorite(product);
      });
  });

  favoriteButtons.forEach(button => {
      let product = JSON.parse(button.dataset.product);
      if (favorites.some(item => item.name === product.name)) {
          button.src = "Selected femme/fyldthjerte.png";
      }
  });

  // Toggle dropdown
  favoriteToggle.addEventListener("click", () => {
      favoriteList.style.display = favoriteList.style.display === "block" ? "none" : "block";
  });

  updateFavorites();
});

// FAVOURITE KNAP SLUT


