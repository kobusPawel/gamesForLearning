const grid = document.querySelector('#grid');
const userBlockHTML = document.querySelector('#userBlock');
const ball = document.querySelector('#ball');
const BLOCK_GAP_HORIZONTAL = 70;
const BLOCK_GAP_VERTICAL = 25;
const BLOCK_WIDTH = 65; 
const BLOCK_HEIGHT = 20;
const coordinates = [];
let userBlockCoordinates = [220, 375];
let ballPosition = [282,340];
let BALL_MOVE_X = 1; 
let BALL_MOVE_Y = 1; 
const BALL_DIAMETER = 20; 
const BOARD_WIDTH = 565; 
const BOARD_HEIGHT = 400;
const USER_BLOCK_WIDTH = 125;

class block {
    constructor(x, y){
        this.bottomLeft = [x, y+ BLOCK_HEIGHT ];
        this.bottomRight = [x + BLOCK_WIDTH, y + BLOCK_HEIGHT];
        this.topLeft = [x, y ];
        this.topRight = [x + BLOCK_WIDTH, y ];
    }
}

function drawBlocks(){
    let leftGap = 5;
    let horizontalOffset;
    let topGap = 5;
    let verticalOffset; 
    for(let j=0; j<3; j++){
        for (let i=0; i<8;i++){
        // create object
        const blockHTML = document.createElement('div');
        blockHTML.classList.add('rectangle'); 
        grid.appendChild(blockHTML); 
        // set left offset
        horizontalOffset = leftGap + 'px';
        blockHTML.style.left = horizontalOffset;
        // set top offset
        verticalOffset = topGap +'px';
        blockHTML.style.top = verticalOffset;
        // save coordinats to array 
        blockCoordinates = new block(leftGap,topGap)
        coordinates.push(blockCoordinates);
        //increment offset 
        leftGap = leftGap + BLOCK_GAP_HORIZONTAL;
        }
        topGap = topGap + BLOCK_GAP_VERTICAL;
        leftGap = 5;
    }
}
function drawUserBlock(offsetX){
    userBlockHTML.style.bottom ='5px'; 
    userBlockHTML.style.left = offsetX + 'px';   
}

function moveUserBlock(e){
    
    switch (e.key) {
        case 'ArrowLeft': 
            if (userBlockCoordinates[0]>0){
                userBlockCoordinates[0]-= 10;
                userBlockHTML.style.left = userBlockCoordinates[0] +'px'
            }
        break;
        case 'ArrowRight': 
            if (userBlockCoordinates[0]<440){
                userBlockCoordinates[0] += 10;
                userBlockHTML.style.left = userBlockCoordinates[0] +'px'
            }
        break;
    }
}
function moveBall(){

   
    ballPosition[0] += BALL_MOVE_X*5; 
    ball.style.left = ballPosition[0] +'px'
    ballPosition[1] += BALL_MOVE_Y*5; 
    ball.style.top = ballPosition[1] +'px'
    checkUserBlock();
    checkBloks();
    checkWalls();
}
function checkUserBlock(){
    if ((ballPosition[0] + BALL_DIAMETER/2 >= userBlockCoordinates[0]  ) && 
    (ballPosition[0] + BALL_DIAMETER/2  <= userBlockCoordinates[0] + USER_BLOCK_WIDTH ) && 
    (ballPosition[1] + BALL_DIAMETER >= userBlockCoordinates[1] )){
        BALL_MOVE_Y = -1; 
    }
    
}
function checkWalls(){
    if (ballPosition[0] >= BOARD_WIDTH - BALL_DIAMETER){
        BALL_MOVE_X = -1; 
    } 
    if (ballPosition[0]<= 0){
        BALL_MOVE_X = 1; 
    } 
    if (ballPosition[1] <= 0){
        BALL_MOVE_Y = +1; 
    }
    if (ballPosition[1] + BALL_DIAMETER >= BOARD_HEIGHT ){
        clearInterval(ballTimer); 
        alert('You loose');
    }

}
function checkBloks(){
    const allBlocks = document.querySelectorAll('.rectangle')
    console.log(allBlocks.length)
    for(let i=0;i<allBlocks.length;i++){
        if ((ballPosition[0]+ BALL_DIAMETER/2  >= coordinates[i].bottomLeft[0]) && 
            (ballPosition[0]+ BALL_DIAMETER/2  <= coordinates[i].bottomRight[0])&& 
            (ballPosition[1] <= coordinates[i].bottomLeft[1])&& 
            (ballPosition[1] >= coordinates[i].topLeft[1])){ 
                allBlocks[i].classList.remove('rectangle');
                coordinates.splice(i,1)
                //change ball direction
                if (BALL_MOVE_Y == 1){
                    BALL_MOVE_Y = -1
                }else {
                    BALL_MOVE_Y = 1
                }
                break;
            }
    }
    //winner check
    if (allBlocks.length == 0){
        clearInterval(ballTimer); 
        alert('You win!!!');
    } 
}
function changeDirection(){
    
}

//main
drawBlocks();
drawUserBlock(userBlockCoordinates[0]);
document.addEventListener('keydown',moveUserBlock);
let ballTimer = setInterval(moveBall,30);