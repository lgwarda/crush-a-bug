const square = document.querySelectorAll('.square')
const bug = document.querySelectorAll('.bug')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent
let clickable = true
let lastSqr;  

function randomSquare() {
    square.forEach(className => {
        className.classList.remove("bug")
    })
    let randomPosition = square[Math.floor(Math.random() * square.length)]
    randomPosition.classList.add("bug")
    clickable = true
    hitPosition = randomPosition.id
    if(hitPosition === lastSqr ) {
       console.log("How dare you!")
        return randomSquare()
    }
    lastSqr = hitPosition
    return hitPosition 
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {         
        if(id.id === hitPosition && clickable) {
            id.classList.remove('bug')   
            result++
            score.textContent = result
            clickable = false
        }
    })
})

function moveBug() {
    let timerId = null
    timerId = setInterval(randomSquare, 1000)
}

moveBug()


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        clearInterval(timerId)
        alert( `GAME OVER! You crashed ${result} bugs.`)
    }
}


let timerId = setInterval(countDown, 1000)


