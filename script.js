// Fields
let body = document.querySelector('body');
let buttons = document.querySelectorAll('.move-container button');
let resultsDisplay = document.querySelector('.results-display');
let playerSelectionDisplay = document.querySelector('.player-display');
let playerWon = false;
let playerScore = 0;
let computerSelectionDisplay = document.querySelector('.computer-display');
let computerWon = false;
let computerScore = 0;
let playerScoreDisplay = document.querySelector('#player-score');
let computerScoreDisplay = document.querySelector('#computer-score');


// Methods for the functionality of picking each move.

buttons.forEach((button) => button.addEventListener('click', function(e) {
    let playerSelection = getPlayerSelection(e.target.id);
    let computerSelection = getComputerChoice();
    displayResults(playerSelection, computerSelection, playRound(playerSelection, computerSelection));
    updateScore();
    checkWinner();
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
        playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
        return (`${playerSelection} beats ${computerSelection}! You win!`);
    }
    else {
        computerWon = true;
        playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
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

function reset() {
    playerScore = computerScore = 0;
    playerWon = computerWon = false;
    updateScore();

    playerSelectionDisplay.textContent = "";
    computerSelectionDisplay.textContent = "";
    resultsDisplay.textContent = "";
}

// Display when the game finishes.

let dialog = document.querySelector('#dialog');
let button = document.querySelector('#dialog button');
button.addEventListener('click', reset);
let p = document.createElement('p');

function checkWinner() {
    if(playerScore === 5) {
        p.textContent = 'Congratulation, you won! Here\'s a 🍪';
        dialog.insertBefore(p, document.querySelector('#dialog form'));
        dialog.showModal();
    }
    else if(computerScore === 5) {
        p.textContent = 'Too bad, you lost. No cookie 🍪 for you.';
        dialog.insertBefore(p, document.querySelector('#dialog form'));
        dialog.showModal();
    }
}