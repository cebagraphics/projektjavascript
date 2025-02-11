
// ZOOM EFFEKT START

document.getElementById('product-image-1-container').addEventListener('mouseover', function(){
  imageZoom('product-image-1')
  document.getElementById('lens').style.display = 'block' // Gør linsen synlig
})

document.getElementById('product-image-1-container').addEventListener('mouseout', function(){
  document.getElementById('lens').style.display = 'none' // Skjul linsen når musen forlader
})

function imageZoom(imgID){
let img = document.getElementById(imgID)
let lens = document.getElementById('lens')

lens.style.backgroundImage = "url('" + img.src + "')";

let ratio = 3

lens.style.backgroundSize = (img.width * ratio) + 'px ' + (img.height * ratio) + 'px';

img.addEventListener("mousemove", moveLens)
lens.addEventListener("mousemove", moveLens)

function moveLens(){
  let pos = getCursor()
  //console.log('pos:', pos)

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

function getCursor(){
  let e = window.event
  let bounds = img.getBoundingClientRect()

  //console.log ('e:', e, 'bounds:', bounds)

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


shirt.push(theShirt);

console.log(shirt);

// FØJ TIL KURV SLUT
