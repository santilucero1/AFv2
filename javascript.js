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
