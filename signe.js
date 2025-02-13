let shirt = []; // Array for at gemme produkter i kurven

// Opret produktet
let theShirt = { name: "LANGÆRMET STRIKTRØJE", price: 599.95 };

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
