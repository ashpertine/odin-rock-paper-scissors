//rock paper scissors, but rock is bulbasaur, paper is squirtle, and scissors is charmander


function getComputerChoice() {
    let choice;
    let num_choice = Math.random().toFixed(2);
    if(num_choice <= 0.67 && num_choice >= 0.33) {
        choice = "bulbasaur";
    }
    else if (num_choice > 0.67) {
        choice = "squirtle";
    }
    else {
        choice = "charmander";
    }
    
    return choice.toLowerCase();
}

function getHumanChoice() {
    let choice = prompt("Choose Bulbasaur, Squirtle, or Charmander!");
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    let capitalise = (string) => string ? string.at(0).toUpperCase() + string.slice(1) : '';
    if(humanChoice === computerChoice) {
        return ["it's a tie!"];
    }
    else if((humanChoice == "squirtle" && computerChoice == 'charmander') || (humanChoice == "charmander" && computerChoice == "bulbasaur") || (humanChoice =='bulbasaur' && computerChoice == 'squirtle')) {
        return [`You win this round! ${capitalise(humanChoice)} beats ${capitalise(computerChoice)}`, true];
    }else {
        return [`You lose this round! ${capitalise(computerChoice)} beats ${capitalise(humanChoice)}`, false];
    }
}


function playGame() {
    //initialise variables
    let humanScore = 0;
    let computerScore = 0;
    console.log(`${humanScore}, ${computerScore}`);
    let humanChoice = "";

    //reset displays
    const body = document.querySelector('body');
    const mainContent = document.querySelector('.main-content');
    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.textContent = `You: ${humanScore} - Computer: ${computerScore}`;
    const humanChoiceDisplay = document.querySelector('.choice-display');
    humanChoiceDisplay.textContent = '';
    const feedbackDisplay = document.querySelector('#feedback-display')
    feedbackDisplay.textContent = '';
    const winnerDisplay = document.querySelector('#winner-display');
    winnerDisplay.textContent = '';


    //create choice Buttons
    const humanChoices = document.querySelector('.human-choices');
    const bulbasaurButton = document.createElement('button');
    bulbasaurButton.innerText = 'Bulbasaur';
    bulbasaurButton.classList.add('choice');
    humanChoices.insertBefore(bulbasaurButton, humanChoiceDisplay); 
    const squirtleButton = document.createElement('button');
    squirtleButton.innerText = 'Squirtle';
    squirtleButton.classList.add('choice');
    humanChoices.insertBefore(squirtleButton, humanChoiceDisplay);
    const charmanderButton = document.createElement('button');
    charmanderButton.innerText = 'Charmander';
    charmanderButton.classList.add('choice');
    humanChoices.insertBefore(charmanderButton, humanChoiceDisplay);

    humanButtons = document.querySelectorAll('.choice');
    humanButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(feedbackDisplay.textContent == 'Choose Bulbasaur, Squirtle or Charmander!') {
                feedbackDisplay.textContent = '';
            }

            humanChoiceDisplay.innerText = "Your choice: " + button.innerText;
            humanChoice = button.innerText.toLowerCase();
        });
    });

    //set new playButton everytime the function is ran (eliminates old event listener)
    const playButton = document.createElement('button');
    playButton.classList.add('.playButton');
    playButton.textContent = "Play Round!";
    mainContent.append(playButton);
    playButton.disabled = false;

    playButton.addEventListener('click', () => {
        humanChoiceDisplay.innerText = '';
        if(humanChoice == '') {
            feedbackDisplay.textContent = 'Choose Bulbasaur, Squirtle or Charmander!';
        } else {
            let feedbackInfo = playRound(humanChoice, getComputerChoice());
            let isWin = feedbackInfo[1]
            if(isWin != undefined) {
                feedbackDisplay.textContent = feedbackInfo[0];
                switch(isWin) {
                    case true:
                        humanScore++;
                        break;
                    case false:
                        computerScore++;
                        break;
                    default:
                        break;
                }
                scoreDisplay.textContent = `You: ${humanScore} - Computer: ${computerScore}`;
                humanChoice = '';
            }else {
                feedbackDisplay.textContent = feedbackInfo[0];
                humanChoice = '';
            } 
        }


        if(computerScore == 5|| humanScore == 5) {
            playButton.disabled = true;
                humanScore > computerScore ? winnerDisplay.textContent = "Congrats! You won!" :
                                             winnerDisplay.textContent = "Better luck next time!";
                let playAgainBtn = document.createElement('button');
                playAgainBtn.textContent = 'Play Again!';
                playAgainBtn.addEventListener('click', () => {
                    bulbasaurButton.remove();
                    squirtleButton.remove();
                    charmanderButton.remove();
                    playButton.remove();
                    playAgainBtn.remove();
                    return playGame();
                });
                mainContent.append(playAgainBtn);
            } 
    });    
}


playGame();


