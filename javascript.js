const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);




//Contenedores de las remeras

let currentIndex = 0;

const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    images.forEach(image => {
        image.style.transform = `translateX(${offset}%)`;
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
}

// Inicializa el carrusel
updateCarousel();


//------------------------------------


//Magic text

let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}



//Reveal animation

document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
      const windowHeight = window.innerHeight;

      revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;

          if (elementTop < windowHeight - 100) {
              element.classList.add('visible');
          } else {
              element.classList.remove('visible');
          }
      });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Ejecuta al cargar la página para los elementos visibles al inicio
});



//----------------------------------------
//Botones de reserva

function openReservation() {
  window.open('reserva.html', '_blank');
}


//--------------------

