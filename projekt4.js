function changeImage(imageSrc1, imageSrc2, newText) {
    document.getElementById("product-image-1").src = imageSrc1;
    document.getElementById("product-image-2").src = imageSrc2;
    document.querySelector(".selected-color").textContent = newText;
}