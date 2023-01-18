// Fields
const root = document.documentElement;
root.className = 'dark';
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

let rightBar = document.querySelector('.computer-horizontal-bar');
let leftBar = document.querySelector('.player-horizontal-bar');
let baseColor = leftBar.style.backgroundColor;
let winColor = '#40df58';
let loseColor = '#eb4343';

let darkModeBtn = document.querySelector('#color-mode');


// Methods for the functionality of picking each move.

buttons.forEach((button) => button.addEventListener('click', function(e) {
    let playerSelection = getPlayerSelection(e.target.id);
    let computerSelection = getComputerChoice();
    displayResults(playerSelection, computerSelection, playRound(playerSelection, computerSelection));
    updateScore();
    checkWinner();
}));

darkModeBtn.addEventListener('click', function(e) {
    console.log('stuff');
    setNewTheme();
});


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
        updateBars(playerWon, computerWon);
        return ('Draw!');
    }
    else if ((playerSelection === 'paper' && computerSelection === 'rock') || (playerSelection === 'scissors' && computerSelection === 'paper') ||(playerSelection === 'rock' && computerSelection === 'scissors')) {
        playerWon = true;
        playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
        updateBars(playerWon, computerWon);
        return (`${playerSelection} beats ${computerSelection}! You win!`);
    }
    else {
        computerWon = true;
        playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
        updateBars(playerWon, computerWon);
        return (`${playerSelection} loses to ${computerSelection}. You lost..`);
    }
}

function displayResults(playerSelection, computerSelection, displayText) {
    playerSelection = playerSelection.substring(0,1).toUpperCase() + playerSelection.substring(1);
    computerSelection = computerSelection.substring(0,1).toUpperCase() + computerSelection.substring(1);
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
    updateBars(false, false);

    playerSelectionDisplay.textContent = "";
    computerSelectionDisplay.textContent = "";
    resultsDisplay.textContent = "";
}

function updateBars(playerWon, computerWon) {
    if(playerWon && !computerWon) {
        leftBar.style.backgroundColor = winColor;
        rightBar.style.backgroundColor = loseColor;
    }
    else if (computerWon) {
        leftBar.style.backgroundColor = loseColor;
        rightBar.style.backgroundColor = winColor;
    }
    else {
        leftBar.style.backgroundColor = baseColor;
        rightBar.style.backgroundColor = baseColor;
    }
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

// change themes

function setNewTheme() {
    const root = document.documentElement;
    if(root.className === 'dark') {
        root.className = 'light';
    }
    else if (root.className === 'light') {
        root.className = 'dark';
    }
}