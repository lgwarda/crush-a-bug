const square = document.querySelectorAll('.square'); // Zbieranie wszystkich kwadratów
const score = document.getElementById('score'); // Element do wyświetlania wyniku
const timeLeft = document.getElementById('timeLeft'); // Element do wyświetlania pozostałego czasu

const emojis = ['🐞', '🐛', '🦗', '🐜']; // Array of bug emojis
let result = 0;
let currentTime = parseInt(timeLeft.textContent); // Ensure it's a number
let clickable = true;
let lastSqr;
let timerId;

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

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition && clickable) {
            id.textContent = ''; // Clear the emoji
            result++;
            score.textContent = result;
            clickable = false;
        }
    });
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
        alert(`GAME OVER! You crushed ${result} bugs.`);
    }
}

timerId = setInterval(countDown, 1000);
