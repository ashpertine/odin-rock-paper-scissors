
function getComputerChoice() {
    let choice;
    let num_choice = Math.random().toFixed(2);
    if(num_choice <= 0.67 && num_choice >= 0.33) {
        choice = "rock";
    }
    else if (num_choice > 0.67) {
        choice = "paper";
    }
    else {
        choice = "scissors";
    }
    
    return choice.toLowerCase();
}

function getHumanChoice() {
    let choice = prompt("Choose Rock, Paper, or Scissors!");
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    let capitalise = (string) => string ? string.at(0).toUpperCase() + string.slice(1) : '';
    if(humanChoice === computerChoice) {
        return "its a tie!"
    }
    else if((humanChoice == "paper" && computerChoice == 'rock') || (humanChoice == "rock" && computerChoice == "scissors") || (humanChoice =='scissors' && computerChoice == 'paper')) {
        humanScore++;
        return `You win this round! ${capitalise(humanChoice)} beats ${capitalise(computerChoice)}`;
    }else {
        computerScore++;
        return `You lose this round! ${capitalise(computerChoice)} beats ${capitalise(humanChoice)}`
    }
}

function playGame() {
    humanScore = 0;
    computerScore = 0;
    for(let i = 0; i < 5; i++) {
        console.log(playRound(getHumanChoice(), getComputerChoice()));
    }

    if(humanScore === computerScore) {
        console.log("Its a tie! better luck next time!");
    }else {
        humanScore > computerScore ? console.log("You win! congratulations!") : console.log("You lose! better luck next time!");
    }

}

playGame();