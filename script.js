const decks = Array.from(document.querySelectorAll("main"));
const controls = {
  previousSlide: document.getElementById("previous-slide"),
  nextSlide: document.getElementById("next-slide"),
  previousDeck: document.getElementById("previous-deck"),
  nextDeck: document.getElementById("next-deck")
};

let decksIndex = 0;
let slidesIndex = 0;

decks.forEach(deck => {
  deck.style.width = `${deck.querySelectorAll("section").length * 100}vw`;
});

function showFooter() {
  const footer = decks[decksIndex].querySelector("footer");
  if (footer) footer.style.display = "flex";
}

function updateSlidePosition() {
  const slides = Array.from(decks[decksIndex].querySelectorAll("section"));
  slides.forEach(slide => {
    slide.style.transform = `translateX(-${slidesIndex * 100}vw)`;
  });
}

function moveSlide(direction) {
  const slides = decks[decksIndex].querySelectorAll("section");
  const newSlideIndex = slidesIndex + direction;
  if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
    slidesIndex = newSlideIndex;
    updateSlidePosition();
  }
}

function updateDeckPosition() {
  decks.forEach(deck => {
    deck.style.transform = `translateY(-${decksIndex * 100}vh)`;
  });
}

function moveDeck(direction) {
  const newDeckIndex = decksIndex + direction;
  if (newDeckIndex >= 0 && newDeckIndex < decks.length) {
    decksIndex = newDeckIndex;
    slidesIndex = 0;
    updateDeckPosition();
    updateSlidePosition();
    showFooter();
  }
}

controls.nextSlide.addEventListener("click", () => moveSlide(1));
controls.previousSlide.addEventListener("click", () => moveSlide(-1));
controls.nextDeck.addEventListener("click", () => moveDeck(1));
controls.previousDeck.addEventListener("click", () => moveDeck(-1));

showFooter();
