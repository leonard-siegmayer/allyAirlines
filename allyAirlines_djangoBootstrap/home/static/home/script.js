const pauseSymbol = '❚❚';
const playSymbol = '⏵';
let currentCarouselState = 'cycle';

/**
 * Functionality for the pause/play button of the carousel.
 */
function toggleCarousel() {
    let pauseButton = document.getElementById('pauseButton');

    if (currentCarouselState == 'cycle') {
        pauseButton.innerHTML = playSymbol;
        currentCarouselState = 'pause';
        pauseButton.setAttribute('aria-label', 'Abspielen');
    } else if (currentCarouselState == 'pause') {
        pauseButton.innerHTML = pauseSymbol;
        currentCarouselState = 'cycle';
        pauseButton.setAttribute('aria-label', 'Pausieren');
    }
    $('#carousel_popular').carousel(currentCarouselState);
}

/**
 * Pauses the carousel without changing 'currentCarouselState'. Called after the focuses enters the carousel.
 */
function pauseCarousel() {
    $('#carousel_popular').carousel('pause');
}

/**
 * Sets the current carousel state. Called after the focuses exits the carousel.
 */
function resetCarousel() {
    $('#carousel_popular').carousel(currentCarouselState);
}

/**
 * Slows down the carousel to 10 seconds per slide.
 */
$('#carousel_popular').carousel({
    interval: 10000,
    keyboard: false
});