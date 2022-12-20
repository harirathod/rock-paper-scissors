let container = document.querySelector('div.container');
let buttons = document.querySelectorAll('button');
let resultsDisplay = document.querySelector('.results-display');
let playerDisplay = document.querySelector('.player-display');
let computerDisplay = document.querySelector('.computer-display');
let score = document.querySelector('#score');

buttons.forEach((button) => button.addEventListener('click', function(e) {
    let playerSelection = getPlayerSelection(e.target.id);
    let computerSelection = getComputerChoice();
    displayResults(playerSelection, computerSelection, playRound(playerSelection, computerSelection));
}));


function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let randomInt = Math.floor(Math.random() * 3);
    return choices[randomInt];
}

function getPlayerSelection(move) {
    if(move !== 'rock' && move !== 'paper' && move !== 'scissors') {
        alert('Your move was not valid.');
        return undefined;
    }
    return move;
}

function playRound(playerSelection, computerSelection) {
    if(playerSelection === undefined) {
        return ('No round was played.');
    }
    else if(playerSelection === computerSelection) {
        return ('Draw!');
    }
    else if ((playerSelection === 'paper' && computerSelection === 'rock') || (playerSelection === 'scissors' && computerSelection === 'paper') ||(playerSelection === 'rock' && computerSelection === 'scissors')) {
        return (`${playerSelection} beats ${computerSelection}! You win!`);
    }
    else {
        return (`${playerSelection} loses to ${computerSelection}. You lost..`);
    }
}

function displayResults(playerSelection, computerSelection, displayText) {
    playerDisplay.textContent = `You picked: ${playerSelection}`;
    computerDisplay.textContent = `They picked: ${computerSelection}`;
    resultsDisplay.textContent = displayText;
}