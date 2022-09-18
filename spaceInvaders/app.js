const grid = document.querySelector("#grid")
let shipPosition = 202;
const WIDTH = 15
let direction = 1
const shootedAliens = [] 
const result = document.querySelector('#result')
const stopButton = document.querySelector('#stop')
const scoreResult = document.querySelector('#score')
let score = 0 

for (i=0; i<225;i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('#grid div'));

const invaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for( let i=0; i<invaders.length; i++){ 
        if (!shootedAliens.includes(i)){
            
        squares[invaders[i]].classList.add('invader');
        }
    }
    squares[shipPosition].classList.add('ship');
}

draw()
function removeInvaders (){
    for( let i=0; i<invaders.length; i++){
        squares[invaders[i]].classList.remove('invader');
    }
}

function moveShip (e){
    squares[shipPosition].classList.remove('ship');
    switch (e.key) {
        case 'ArrowLeft':
            if (shipPosition % WIDTH !== 0){
                shipPosition-- 
            }
            break;
        case 'ArrowRight' :
            if (shipPosition % WIDTH < WIDTH - 1){
                shipPosition++
            }
            break;
    }
    squares[shipPosition].classList.add('ship');
}
document.addEventListener('keyup',moveShip) 

function moveInvaders (){
  
    let leftEdge = invaders[0] % WIDTH === 0
    let rightEdge = invaders[invaders.length-1] % WIDTH  === WIDTH -1
    removeInvaders();
    if (leftEdge && direction === -1){
        for (let i = 0; i<invaders.length; i++){
            invaders[i] += WIDTH;
        } 
        direction = 1
    } 
    if (rightEdge && direction === 1){
        for (let i = 0; i<invaders.length; i++){
            invaders[i] += WIDTH;
        } 
        direction = -1
    }
    for (let i = 0; i<invaders.length; i++){
        invaders[i] += direction; 
    }
    draw()
    if (invaders[invaders.length-1] > 210 || squares[shipPosition].classList.contains('invader')){
        clearInterval(invadersTimer); 
        document.removeEventListener('keyup',laser)
        document.removeEventListener('keyup',moveShip)
        result.innerText = 'GAME OVER'
    } else if (invaders.length === shootedAliens.length)
    {
        document.removeEventListener('keyup',laser)
        document.removeEventListener('keyup',moveShip)
        clearInterval(invadersTimer); 
        result.innerText = 'YOU WIN'
    }
    
} 
let invadersTimer = setInterval(moveInvaders,250);


function laser (e){
    let laserIndex 
    let laserTimer 
    function moveLaser(){
        if (laserIndex >= WIDTH){
        squares[laserIndex].classList.remove('laser')
        laserIndex -= WIDTH 
        squares[laserIndex].classList.add('laser')
        } else if (laserIndex < WIDTH){
            squares[laserIndex].classList.remove('laser')
        }
        if (squares[laserIndex].classList.contains('laser') && squares[laserIndex].classList.contains('invader')){
            squares[laserIndex].classList.remove('laser')
            squares[laserIndex].classList.remove('invader')
            squares[laserIndex].classList.add('sink') 
            clearInterval(laserTimer)
            setTimeout(()=>{squares[laserIndex].classList.remove('sink')},200) 
            shootedAliens.push(invaders.indexOf(laserIndex)) 
            score++ ;
            scoreResult.innerHTML = score;
        }
    }
    if (e.key == 'ArrowUp'){
        laserIndex = shipPosition - WIDTH
        squares[laserIndex].classList.add('laser')
        laserTimer = setInterval(moveLaser,100)
    }
}
document.addEventListener('keyup',laser) 
stopButton.addEventListener('click',()=>{
    if (invadersTimer){
        clearInterval(invadersTimer)
        invadersTimer = null
        document.removeEventListener('keyup',laser)
        document.removeEventListener('keyup',moveShip)
    }else{
        invadersTimer = setInterval(moveInvaders,250);
        document.addEventListener('keyup',laser)
        document.addEventListener('keyup',moveShip)
    }
})
