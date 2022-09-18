const buttons = document.querySelectorAll('button'); 
const userInfo = document.querySelector('#userChoice'); 
const compInfo = document.querySelector('#computerChoice');
const result = document.querySelector('#result');
const test = document.querySelector('#rock');
let computerChoice = 'null';
let userChoice = 'null';

function compChoice(){
    let choice = Math.floor(Math.random()*3);
   
    switch (choice) {
        case 0 :  
        computerChoice = 'paper'; 
        break; 
        case 1 : 
        computerChoice = 'rock'; 
        break 
        case 2 :
        computerChoice = 'scisors'
        break;
    }
    compInfo.innerText = computerChoice 
}

function verdict (){
    let verdict = 'Winner: ';
    if (computerChoice === 'paper' && userChoice === 'rock' ){
        verdict += 'Computer win !!!';
    }
    if (computerChoice === 'paper' && userChoice === 'scisors' ){
        verdict += 'User win !!!';
    }
    if (computerChoice === 'rock' && userChoice === 'scisors' ){
        verdict += 'Computer win !!!';
    }
    if (computerChoice === 'rock' && userChoice === 'paper' ){
        verdict += 'User win !!!';
    }
    if (computerChoice === 'scisors' && userChoice === 'paper' ){
        verdict += 'Computer win !!!';
    }
    if (computerChoice === 'scisors' && userChoice === 'rock' ){
        verdict += 'User win !!!';
    }
    if (computerChoice === userChoice ){
        verdict += 'Draw !!!';
    } 
    result.innerText = verdict; 
}

buttons.forEach(userMove => userMove.addEventListener('click',(e) => {
    userInfo.innerText  =  e.target.id;
    userChoice = e.target.id;
    compChoice(); 
    verdict();
} ))   

