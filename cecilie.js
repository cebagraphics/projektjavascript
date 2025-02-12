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


// Skifter billederne når man hover med musen
function changeImageHover(element, newSrc) {
    element.src = newSrc;
}

function restoreImage(element, originalSrc) {
    element.src = originalSrc;
}


// Skifter billede når man trykker på knap
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

// top bar som skifter tekst
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
  
    // Vent lidt, før vi ændrer teksten
    setTimeout(() => {
      changingTextElement.textContent = messages[currentMessageIndex];
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
  
      // Tilføj animationen for at få den nye tekst til at fade ind og ud
      changingTextElement.classList.add("show-text");
    }, 50); // Vent kort tid, så animationen kan nulstilles før den starter
  }
  
  setInterval(changeMessage, 3500); // Skifter tekst hvert 3.5 sekund
  changeMessage(); // Initial tekst