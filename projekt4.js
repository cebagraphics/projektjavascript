
// ZOOM EFFEKT START
document.addEventListener("DOMContentLoaded", function() {
  let img = document.getElementById('product-image-1');
  let lens = document.getElementById('lens');
  let container = document.getElementById('product-image-1-container');

  container.addEventListener('mouseover', function() {
      imageZoom('product-image-1');
      lens.style.display = 'block';
  });

  container.addEventListener('mouseout', function() {
      lens.style.display = 'none';
  });

  function imageZoom(imgID) {
      let img = document.getElementById(imgID);
      let lens = document.getElementById('lens');

      lens.style.backgroundImage = "url('" + img.src + "')";
      let ratio = 3;
      lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

      img.addEventListener("mousemove", moveLens);
      lens.addEventListener("mousemove", moveLens);

      function moveLens(e) {
          let pos = getCursor(e);
          let positionLeft = pos.x - (lens.offsetWidth / 2);
          let positionTop = pos.y - (lens.offsetHeight / 2);

          if (positionLeft < 0) positionLeft = 0;
          if (positionTop < 0) positionTop = 0;
          if (positionLeft > img.width - lens.offsetWidth) positionLeft = img.width - lens.offsetWidth;
          if (positionTop > img.height - lens.offsetHeight) positionTop = img.height - lens.offsetHeight;

          lens.style.left = positionLeft + 'px';
          lens.style.top = positionTop + 'px';
          lens.style.backgroundPosition = "-" + (pos.x * ratio) + 'px -' + (pos.y * ratio) + 'px';
      }

      function getCursor(e) {
          let bounds = img.getBoundingClientRect();
          let x = e.pageX - bounds.left - window.pageXOffset;
          let y = e.pageY - bounds.top - window.pageYOffset;
          return { 'x': x, 'y': y };
      }
  }

  imageZoom('product-image-1');
  document.getElementById('lens').style.display = 'none';
// ZOOM EFFEKT SLUT




// SKIFT BILLEDE START
  function changeImage(imageSrc1, imageSrc2, newText) {
      document.getElementById("product-image-1").src = imageSrc1;
      document.getElementById("product-image-2").src = imageSrc2;
      document.querySelector(".selected-color").textContent = newText;
  }
  window.changeImage = changeImage;
});
// SKIFT BILLEDE SLUT




  // CARROUSEL START
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = 288; // Bredde af hvert billede (som i din CSS)
    const totalItems = items.length;
    let index = 0;
  
    function updateCarousel() {
      // Forhindrer at gå ud over det første og sidste billede
      if (index >= totalItems) {
        index = totalItems - 1;
      } else if (index < 0) {
        index = 0;
      }
  
      // Justerer transformeringen baseret på itemWidth
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

  /*
  function autoSlide() {
      index++;
      updateCarousel();
  }

  let slideInterval = setInterval(autoSlide, 3000);
*/

  function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 3000);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        if (index < totalItems - 1) { // Forhindrer at gå forbi sidste billede
            index++;
            updateCarousel();
            resetInterval();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) { // Forhindrer at gå forbi første billede
            index--;
            updateCarousel();
            resetInterval();
        }
    });
}

  // Håndter klik på "SHOP NOW"-knappen (for at vise URL eller eventuelt en modal)
  const shopNowButtons = document.querySelectorAll('.shop-btn');
  shopNowButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.preventDefault(); // Forhindrer standardlinkadfærd
          // Åbn en ny side, når knappen klikkes
          window.open('produktside.html', '_blank'); // Erstat med din egen URL
      });
  });

    // CARROUSEL SLUT




  // SKIFTER BILLEDE HOVER EFFEKT START
  window.changeImageHover = function(element, newSrc) {
      element.src = newSrc;
  }

  window.restoreImage = function(element, originalSrc) {
      element.src = originalSrc;
  }
  // SKIFTER BILLEDE HOVER EFFEKT SLUT




  // SKIFTER BILLEDE NÅR MAN TRYKKER PÅ FARVEKNAP START
  window.changeImage1 = function(imagePath) {
      document.getElementById('product1image').src = imagePath;
  }

  window.changeImage2 = function(imagePath) {
      document.getElementById('product2image').src = imagePath;
  }

  window.changeImage4 = function(imagePath) {
      document.getElementById('product4image').src = imagePath;
  }

  window.changeImage5 = function(imagePath) {
      document.getElementById('product5image').src = imagePath;
  }

  window.changeImage7 = function(imagePath) {
      document.getElementById('product7image').src = imagePath;
  }
});
  // SKIFTER BILLEDE NÅR MAN TRYKKER PÅ FARVEKNAP SLUT




  // TOP BAR SOM SKIFTER TEKST START
document.addEventListener("DOMContentLoaded", function () {
  const messages = [
      "10% rabat på din næste ordre",
      "Bliv medlem af SELECTED+",
      "Saml point og optjen belønninger",
  ];

  let currentMessageIndex = 0;
  const changingTextElement = document.getElementById("changing-text");

  function changeMessage() {
      changingTextElement.classList.remove("show-text");

      setTimeout(() => {
          changingTextElement.textContent = messages[currentMessageIndex];
          currentMessageIndex = (currentMessageIndex + 1) % messages.length;
          changingTextElement.classList.add("show-text");
      }, 50);
  }

  setInterval(changeMessage, 3500);
  changeMessage();
    // TOP BAR SOM SKIFTER TEKST SLUT




  // FØJ TIL KURV START
  let shirt = [];
  let theShirt = { name: "LANGÆRMET TRØJE", price: 599.95 };
  let selectedSize = null;

  function addToCart() {
      if (selectedSize !== null) {
          let productWithSize = { ...theShirt, size: selectedSize };
          shirt.push(productWithSize);
          updateCartCount();
          showToast(`Produktet "${theShirt.name}" med størrelse ${selectedSize} er føjet til kurven.`);
      } else {
          showToast("Vælg venligst en størrelse.");
      }
  }

  function updateCartCount() {
      const cartCount = document.getElementById("cart-count");
      cartCount.textContent = shirt.length;
  }

  function showToast(message) {
      const toast = document.getElementById("toast");
      const toastMessage = document.getElementById("toast-message");
      toastMessage.textContent = message;
      toast.classList.add("show");

      setTimeout(() => {
          toast.classList.remove("show");
      }, 3000);
  }

  const sizeButtons = document.querySelectorAll(".size-button");
  sizeButtons.forEach(button => {
      button.addEventListener("click", function () {
          selectedSize = button.getAttribute("data-size");
          sizeButtons.forEach(b => b.classList.remove("selected"));
          button.classList.add("selected");
          console.log("Valgt størrelse:", selectedSize);
      });
  });

  const addToCartButton = document.querySelector(".selected-add-to-cart");
  if (addToCartButton) {
      addToCartButton.addEventListener("click", addToCart);
  }
});
  // FØJ TIL KURV SLUT




// FAVOURITE KNAP START
document.addEventListener("DOMContentLoaded", () => {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  const favoriteList = document.querySelector(".favorite-dropdown");
  const favoriteCount = document.querySelector(".favorite-count");
  const favoriteToggle = document.querySelector(".favorite-toggle");

  if (!favoriteList || !favoriteCount || !favoriteToggle) {
      console.warn("Nogle favorit-elementer mangler i DOM'en.");
      return;
  }

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

  if (favoriteButtons.length > 0) {
      favoriteButtons.forEach(button => {
          button.addEventListener("click", () => {
              let product = JSON.parse(button.dataset.product);
              toggleFavorite(product);
          });

          let product = JSON.parse(button.dataset.product);
          if (favorites.some(item => item.name === product.name)) {
              button.src = "Selected femme/fyldthjerte.png";
          }
      });
  }

  favoriteToggle.addEventListener("click", () => {
      favoriteList.style.display = favoriteList.style.display === "block" ? "none" : "block";
  });

  updateFavorites();
});
// FAVOURITE KNAP SLUT
