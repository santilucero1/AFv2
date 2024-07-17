const track = document.getElementById("image-track");
const whiteDiv = document.getElementById("white");
const logoText = document.querySelector(".logo-text");
const fancyText = document.querySelector(".fancy");

// Función para actualizar el color de cada letra
function updateLetterColors() {
    const whiteRect = whiteDiv.getBoundingClientRect();

    // Actualiza el color de "AF"
    const logoRect = logoText.getBoundingClientRect();
    if (logoRect.right > whiteRect.left && logoRect.left < whiteRect.right) {
        logoText.style.color = 'black';
    } else {
        logoText.style.color = 'white';
    }

    // Actualiza el color de "Vibes"
    const fancyRect = fancyText.getBoundingClientRect();
    const textSpans = fancyText.querySelectorAll('span');

    textSpans.forEach(span => {
        const spanRect = span.getBoundingClientRect();
        if (spanRect.right > whiteRect.left && spanRect.left < whiteRect.right) {
            span.style.color = 'black';
        } else {
            span.style.color = 'white';
        }
    });
}

// Función para dividir el texto en spans individuales
function wrapLettersInSpans() {
    const text = fancyText.innerText;
    fancyText.innerHTML = text.split('').map(letter => `<span>${letter}</span>`).join('');
}

wrapLettersInSpans();

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
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -85);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }

  // Actualiza el color de las letras en cada movimiento
  updateLetterColors();
}

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

// Divide el texto en spans para manejarlo individualmente
function wrapLettersInSpans() {
    const text = fancyText.innerText;
    fancyText.innerHTML = text.split('').map(letter => `<span>${letter}</span>`).join('');
}

wrapLettersInSpans();



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


const images = [
  'shirt.png',
  'wsp.png',
  'ig.jpg'
];
let currentIndex = 0;

const sliderImage = document.getElementById('slider-image');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function showImage(index) {
  sliderImage.src = images[index];
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  showImage(currentIndex);
});

// Initialize with the first image
showImage(currentIndex);


// javascript.js

document.addEventListener('DOMContentLoaded', () => {
  const options = {
      root: null, // Usar el viewport
      rootMargin: '0px',
      threshold: 0.1 // Cuando el 10% del elemento es visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Si quieres que el efecto se aplique solo una vez, puedes desconectar el observador
              observer.unobserve(entry.target);
          }
      });
  }, options);

  // Selecciona todos los elementos que deseas observar
  document.querySelectorAll('#main, .diseño-titulo, #diseños, .nombre-diseño').forEach(element => {
      observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Opciones para el Intersection Observer
  const options = {
    root: null, // Usar la ventana del navegador como el contenedor de observación
    rootMargin: '0px',
    threshold: 0.1 // El 10% del elemento debe ser visible para activar el callback
  };

  // Callback que se ejecuta cuando el elemento entra en la vista
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Deja de observar el elemento una vez que se ha hecho visible
      }
    });
  };

  // Crear el Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, options);

  // Seleccionar todos los elementos a observar
  const elementsToObserve = document.querySelectorAll('.diseños, .nombre-diseño, .diseño-titulo p, #image-track');

  // Observar cada elemento
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
});