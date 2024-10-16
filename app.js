const square = document.querySelectorAll('.square'); // Zbieranie wszystkich kwadratów
const score = document.getElementById('score'); // Element do wyświetlania wyniku
const timeLeft = document.getElementById('timeLeft'); // Element do wyświetlania pozostałego czasu

const emojis = ['🐞', '🐛', '🦗', '🐜']; // Array of bug emojis
let result = 0;
let currentTime = parseInt(timeLeft.textContent); // Ensure it's a number
let clickable = true;
let lastSqr;
let timerId;

// Uzyskiwanie dostępu do dźwięków
const hitSound = document.getElementById('hitSound');
const backgroundMusic = document.getElementById('backgroundMusic');

// Odtwarzanie muzyki w tle
backgroundMusic.play();

function randomSquare() {
    square.forEach(className => {
        className.textContent = ''; // Clear previous bugs
    });
    let randomPosition = square[Math.floor(Math.random() * square.length)];
    randomPosition.textContent = emojis[Math.floor(Math.random() * emojis.length)]; // Randomly select an emoji
    clickable = true;
    hitPosition = randomPosition.id;

    if (hitPosition === lastSqr) {
        console.log("How dare you!");
        return randomSquare();
    }
    lastSqr = hitPosition;
    return hitPosition;
}

// Function to handle clicks on squares
function handleClick(id) {
    if (id.id === hitPosition && clickable) {
        id.textContent = ''; // Clear the emoji
        result++;
        score.textContent = result;
        clickable = false;
        hitSound.currentTime = 0; // Reset dźwięku do początku
        hitSound.play(); // Odtwórz dźwięk przy trafieniu
    }
}

// Event listeners for mouse and touch events
square.forEach(id => {
    id.addEventListener('mouseup', () => handleClick(id));
    id.addEventListener('touchstart', () => handleClick(id)); // Added touch event
});

function moveBug() {
    timerId = setInterval(randomSquare, 1000);
}

moveBug();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        backgroundMusic.pause(); // Zatrzymaj muzykę w tle
        alert(`GAME OVER! You crushed ${result} bugs.`);
    }
}

timerId = setInterval(countDown, 1000);
