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
    const humanChoicePreview = document.querySelector('#human-choice-preview');
    const computerChoicePreview = document.querySelector('#computer-choice-preview')
    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.textContent = `You: ${humanScore} - Computer: ${computerScore}`;
    const feedbackDisplay = document.querySelector('#feedback-display')
    feedbackDisplay.textContent = 'Welcome!';
    const winnerDisplay = document.querySelector('#winner-display');
    winnerDisplay.textContent = '';
    const playAndPlayAgn = document.querySelector('.play-and-play-again')


    //create choice Buttons
    const humanChoices = document.querySelector('.human-choices');
    const bulbasaurButton = document.createElement('button');
    bulbasaurButton.value = 'Bulbasaur';
    bulbasaurButton.classList.add('choice');
    humanChoices.append(bulbasaurButton); 
    const squirtleButton = document.createElement('button');
    squirtleButton.value = 'Squirtle';
    squirtleButton.classList.add('choice');
    humanChoices.append(squirtleButton);
    const charmanderButton = document.createElement('button');
    charmanderButton.value = 'Charmander';
    charmanderButton.classList.add('choice');
    humanChoices.append(charmanderButton);


    //add images
    const bulbasaurImg = document.createElement('img');
    bulbasaurImg.src = './images/bulbasaur.png';
    bulbasaurImg.width = 100;
    bulbasaurImg.height = 100;
    bulbasaurButton.append(bulbasaurImg);

    const squirtleImg = document.createElement('img');
    squirtleImg.src = './images/squirtle.png';
    squirtleImg.width = 100;
    squirtleImg.height = 100;
    squirtleButton.append(squirtleImg);

    const charmanderImg = document.createElement('img');
    charmanderImg.src = './images/charmander.png';
    charmanderImg.width = 100;
    charmanderImg.height = 100;
    charmanderButton.append(charmanderImg);

    humanButtons = document.querySelectorAll('.choice');
    humanButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if(humanChoicePreview.firstChild) {
                humanChoicePreview.removeChild(humanChoicePreview.firstChild);
            }

            if(computerChoicePreview.firstChild) {
                computerChoicePreview.removeChild(computerChoicePreview.firstChild);
            }
        
            if(feedbackDisplay.textContent == 'Choose Bulbasaur, Squirtle or Charmander!') {
                feedbackDisplay.textContent = '';
                feedbackDisplay.style.color = 'white';
            }
            computerChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            humanChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'; 
            //create human pokemon preview
            let humanPokemonImagePreview = document.createElement('img');
            humanPokemonImagePreview.src = `./images/${button.value.toLowerCase()}.png`
            humanPokemonImagePreview.classList.add('human-pokemon-image-preview');
            humanPokemonImagePreview.width = '400';
            humanPokemonImagePreview.height = '400';
            humanChoicePreview.append(humanPokemonImagePreview);

            //assign humanchoice
            humanChoice = button.value.toLowerCase();
        });
    });

    //set new playButton everytime the function is ran (eliminates old event listener)
    const playButton = document.createElement('button');
    playButton.classList.add('play-button');
    playButton.textContent = "Play Round!";
    playAndPlayAgn.append(playButton);
    playButton.disabled = false;

    playButton.addEventListener('click', () => {
        computerChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        humanChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        if(computerChoicePreview.firstChild) {
            computerChoicePreview.removeChild(computerChoicePreview.firstChild);
        }
        let computerChoice = getComputerChoice();
        let feedbackInfo = playRound(humanChoice, computerChoice);
        let isWin = feedbackInfo[1]

        //create computer pokemon preview
        let computerPokemonImagePreview = document.createElement('img');
        computerPokemonImagePreview.src = `./images/${computerChoice}.png`
        computerPokemonImagePreview.classList.add('computer-pokemon-image-preview');
        computerPokemonImagePreview.width = '400';
        computerPokemonImagePreview.height = '400';
        if(isWin != undefined) {
            feedbackDisplay.textContent = feedbackInfo[0];
            switch(isWin) {
                case true:
                    computerChoicePreview.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                    humanScore++;
                    break;
                case false:
                    humanChoicePreview.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                    computerScore++;
                    break;
                default:
                    break;
            }


            scoreDisplay.textContent = `You: ${humanScore} - Computer: ${computerScore}`;
        }else {
            feedbackDisplay.textContent = feedbackInfo[0];
        } 
        computerChoicePreview.append(computerPokemonImagePreview);


        if(computerScore == 5|| humanScore == 5) {
            playButton.remove()
            if(humanScore > computerScore) {
                winnerDisplay.textContent = "Congrats! You won!";
                winnerDisplay.style.backgroundColor = 'aquamarine';
            } else {
                winnerDisplay.textContent = "Better luck next time!";
                winnerDisplay.style.backgroundColor = 'red';
            }
            let playAgainBtn = document.createElement('button');
            playAgainBtn.textContent = 'Play Again!';
            playAgainBtn.classList.add('play-again-button');
            playAgainBtn.addEventListener('click', () => {
                bulbasaurButton.remove();
                squirtleButton.remove();
                charmanderButton.remove();
                humanChoicePreview.removeChild(humanChoicePreview.firstChild);
                computerChoicePreview.removeChild(computerChoicePreview.firstChild);
                humanChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4';
                computerChoicePreview.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                winnerDisplay.style.removeProperty('background-color')
                playAgainBtn.remove();
                return playGame();
            });
            playAndPlayAgn.append(playAgainBtn);
        } 
    });    
}


playGame();


