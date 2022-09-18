const allBlocks = document.querySelectorAll('.grid div')
let currentIndex = 76; 
const WIDTH = 9;
const MAX_DOWN_POSITION = 72
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const result = document.querySelector('#result');
const secondsDispaly = document.querySelector('#secondsLeft');
const pauseButton = document.querySelector('#pause');
let gameTimer
let resultTimer
let secondsLeft = 15

function moveFrog(e){
    allBlocks[currentIndex].classList.remove('frogg');
    switch(e.key){
        case 'ArrowLeft':
            if (currentIndex % WIDTH != 0){
                currentIndex--
            }
            break 
        case 'ArrowRight':
            if (currentIndex  % WIDTH < (WIDTH - 1)){
                currentIndex++
            }
            break
        case 'ArrowUp':
            if (currentIndex >= WIDTH){
             currentIndex -= WIDTH
            }
            break 
        case 'ArrowDown':
            if(currentIndex < MAX_DOWN_POSITION)
                currentIndex += WIDTH
            break
    }
    allBlocks[currentIndex].classList.add('frogg');
}

allBlocks[currentIndex].classList.add('frogg');
document.addEventListener('keyup',moveFrog)

function autoMoveLogs(){
    secondsLeft--
    secondsDispaly.innerText = secondsLeft;
    //secondsLeft;
    logsLeft.forEach(log => moveLogLeft(log))
    logsRight.forEach(log => moveLogRight(log))
    carsLeft.forEach(car => moveCarLeft(car))
    carsRight.forEach(car => moveCarRight(car))
};
function resultCheck(){
    lose();
    win();
}
function moveLogLeft (log){
    switch (true){
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l2');
            break
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l3');
            break
        case log.classList.contains('l3'):
            log.classList.remove('l3');
            log.classList.add('l4');
            break
        case log.classList.contains('l4'):
            log.classList.remove('l4');
            log.classList.add('l5');
            break
        case log.classList.contains('l5'):
            log.classList.remove('l5');
            log.classList.add('l1');
            break
    }
}
function moveLogRight (log){
    switch (true){
        case log.classList.contains('l5'):
            log.classList.remove('l5');
            log.classList.add('l4');
            break
        case log.classList.contains('l4'):
            log.classList.remove('l4');
            log.classList.add('l3');
            break
        case log.classList.contains('l3'):
            log.classList.remove('l3');
            log.classList.add('l2');
            break
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l1');
            break
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l5');
            break
    } 
}
function moveCarLeft (car){
    switch(true){
        case car.classList.contains('c1'):
            car.classList.remove('c1');
            car.classList.add('c2');
            break; 
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c3');
            break;   
        case car.classList.contains('c3'):
             car.classList.remove('c3');
             car.classList.add('c1');
            break;    
    }
}
function moveCarRight (car){
    switch(true){
        case car.classList.contains('c3'):
            car.classList.remove('c3');
            car.classList.add('c2');
            break; 
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c1');
            break;   
        case car.classList.contains('c1'):
             car.classList.remove('c1');
             car.classList.add('c3');
            break;    
    }
}
function lose(){
    if (allBlocks[currentIndex].classList.contains('c2')||
    allBlocks[currentIndex].classList.contains('l1')||
    allBlocks[currentIndex].classList.contains('l2')||
    allBlocks[currentIndex].classList.contains('l3')||
    secondsLeft <= 0){
        result.innerText='You lose!!!';
        allBlocks[currentIndex].classList.remove('frogg')
        clearInterval(gameTimer);
        document.removeEventListener('keyup',moveFrog)
        clearInterval(resultTimer);
    }
}
function win(){
    if(allBlocks[currentIndex].classList.contains('end-block')){
        result.innerText='You win!!!';
        clearInterval(gameTimer);   
        allBlocks[currentIndex].classList.remove('frogg')
        clearInterval(gameTimer);
        document.removeEventListener('keyup',moveFrog)
    }
}

gameTimer = setInterval(autoMoveLogs, 1000);
resultTimer = setInterval(resultCheck, 50);
pauseButton.addEventListener('click',()=>{
    if (gameTimer){
        clearInterval(gameTimer);
        document.removeEventListener('keyup',moveFrog);
        gameTimer = null
        console.log(gameTimer)
    }else{
        gameTimer = setInterval(autoMoveLogs,1000)
        document.addEventListener('keyup',moveFrog);
    }
})


