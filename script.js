// Fields


let buttons = document.querySelectorAll('button');
let resultsDisplay = document.querySelector('.results-display');
let playerSelectionDisplay = document.querySelector('.player-display');
let playerWon = false;
let playerScore = 0;
let computerSelectionDisplay = document.querySelector('.computer-display');
let computerWon = false;
let computerScore = 0;
let playerScoreDisplay = document.querySelector('#player-score');
let computerScoreDisplay = document.querySelector('#computer-score');


// Methods

buttons.forEach((button) => button.addEventListener('click', function(e) {
    let playerSelection = getPlayerSelection(e.target.id);
    let computerSelection = getComputerChoice();
    displayResults(playerSelection, computerSelection, playRound(playerSelection, computerSelection));
    updateScore();
}));


function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let randomInt = Math.floor(Math.random() * 3);
    return choices[randomInt];
}

function getPlayerSelection(move) {
    if(move !== 'rock' && move !== 'paper' && move !== 'scissors') {
        alert('Your move was not valid!');
        return undefined;
    }
    return move;
}

function playRound(playerSelection, computerSelection) {
    playerWon = false;
    computerWon = false;
    if(playerSelection === undefined) {
        return ('No round was played.');
    }
    else if(playerSelection === computerSelection) {
        return ('Draw!');
    }
    else if ((playerSelection === 'paper' && computerSelection === 'rock') || (playerSelection === 'scissors' && computerSelection === 'paper') ||(playerSelection === 'rock' && computerSelection === 'scissors')) {
        playerWon = true;
        return (`${playerSelection} beats ${computerSelection}! You win!`);
    }
    else {
        computerWon = true;
        return (`${playerSelection} loses to ${computerSelection}. You lost..`);
    }
}

function displayResults(playerSelection, computerSelection, displayText) {
    playerSelectionDisplay.textContent = `You picked: ${playerSelection}`;
    computerSelectionDisplay.textContent = `They picked: ${computerSelection}`;
    resultsDisplay.textContent = displayText;
}

function updateScore() {
    if(playerWon && !computerWon) {
        playerScore++;
    }
    else if(!playerWon && computerWon) {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}