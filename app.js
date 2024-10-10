const square = document.querySelectorAll('.square'); // Zbieranie wszystkich kwadratów
const score = document.getElementById('score'); // Element do wyświetlania wyniku
const timeLeft = document.getElementById('timeLeft'); // Element do wyświetlania pozostałego czasu

let result = 0;
let currentTime = parseInt(timeLeft.textContent, 10); // Upewnij się, że to jest liczba
let clickable = true;
let lastSqr;  
let timerId;

// Funkcja do losowania kwadratu
function randomSquare() {
    square.forEach(className => className.classList.remove("bug"));
    let randomPosition = square[Math.floor(Math.random() * square.length)];
    
    // Unikaj wyświetlania tego samego kwadratu
    if (randomPosition.id === lastSqr) {
        return randomSquare(); // Losuj ponownie
    }

    randomPosition.classList.add("bug");
    lastSqr = randomPosition.id;
    clickable = true;
}

// Obsługuje kliknięcia na kwadrat
square.forEach(id => {
    id.addEventListener('mouseup', () => {         
        if (id.id === lastSqr && clickable) {
            id.classList.remove('bug');   
            result++;
            score.textContent = result;
            clickable = false;
        }
    });
});

// Ruch robaka
function moveBug() {
    timerId = setInterval(randomSquare, 1000);
}

// Zlicza czas
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert(`GAME OVER! You crashed ${result} bugs.`);
    }
}

// Uruchom gry
moveBug();
setInterval(countDown, 1000);
