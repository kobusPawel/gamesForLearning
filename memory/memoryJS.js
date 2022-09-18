const board = document.querySelector('#cards'); 
const cardsArray = [
    {
        name : 'vanDijk',
        img :'img/vanDijk.jpg',
    },
    {
        name : 'Fab',
        img :'img/Fab.jpg',
    },
    {
        name : 'Trent',
        img :'img/Trent.jpg',
    },
    {
        name : 'Thiago',
        img :'img/Thiago.jpg',
    },
    {
        name : 'Mane',
        img :'img/Mane.jpg',
    },
    {
        name : 'Salah',
        img :'img/Salah.jpg',
    },
    {
        name : 'vanDijk',
        img :'img/vanDijk.jpg',
    },
    {
        name : 'Fab',
        img :'img/Fab.jpg',
    },
    {
        name : 'Trent',
        img :'img/Trent.jpg',
    },
    {
        name : 'Thiago',
        img :'img/Thiago.jpg',
    },
    {
        name : 'Mane',
        img :'img/Mane.jpg',
    },
    {
        name : 'Salah',
        img :'img/Salah.jpg',
    },
];


cardsArray.sort(()=>{return 0.5 - Math.random()}) 
let numberArray = [];
let nameArray = [];
let scoreCounter = 0;
const score = document.querySelector('#score');

function createBoard(){
for(let i=0; i<cardsArray.length;i++){
    const card = document.createElement('img');
    card.setAttribute('src','img/blank.jpg');
    card.setAttribute('number',i);
    card.addEventListener('click',flipCard);
    board.appendChild(card);
}
} 

function flipCard(){
    let number = this.getAttribute('number');
    this.setAttribute('src',cardsArray[number].img);
    numberArray.push(number);
    let name = cardsArray[number].name;
    nameArray.push(name);
    
    if (numberArray.length == 2) {
        setTimeout(checkMatch,500)
        
    }  
}

function checkMatch() {
    //console.log(nameArray);
    const cardsCollection = document.querySelectorAll('img');
    console.log(nameArray[0],nameArray[1], nameArray[0] )
    console.log(nameArray[0],nameArray[1])
    if (nameArray[0] == nameArray[1]){
        scoreCounter = scoreCounter +1; 
        console.log('first condition ok');
        score.innerHTML = scoreCounter;
        alert('You found a match');
        cardsCollection[numberArray[0]].setAttribute('src','img/white.jpg');
        cardsCollection[numberArray[1]].setAttribute('src','img/white.jpg');
        cardsCollection[numberArray[0]].removeEventListener('click',flipCard);
        cardsCollection[numberArray[1]].removeEventListener('click',flipCard);
    } else if (nameArray[0] != nameArray[1]) {
        console.log('second condition ok')
        cardsCollection[numberArray[0]].setAttribute('src','img/blank.jpg');
        cardsCollection[numberArray[1]].setAttribute('src','img/blank.jpg');
        alert('Keep searching!!!');
    } else if (result == 6) {
        console.log('third condition ok')
        alert('You found them all !!!');
    }

    nameArray=[];
    numberArray=[];
   
}

createBoard();
//checkMatch()