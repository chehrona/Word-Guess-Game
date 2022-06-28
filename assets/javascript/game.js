let words = ["meniscus", "molecule", "data", "experiment", "atom", "energy", "evolution", "matter", "microscope"];
let wordIndex = 0;
let guessNumber = 13;
let winScore = 0;
let dashes = "_ ".repeat(words[wordIndex].length);
let isGameOver = false;
let lettersArr = [];

let instructionsPrint = document.getElementById("instructions");
let guessRemaining = document.getElementById("guess");
let currentWord = document.getElementById("word");
let winCount = document.getElementById("wins");
let lettersGuessed = document.getElementById("letters");

winCount.innerHTML = "Wins<br>" + winScore;
currentWord.innerHTML = "Current Word<br>" + dashes;
guessRemaining.innerHTML = "Number of Guesses Remaining<br>" + guessNumber;
lettersGuessed.innerHTML = "Letters Already Guessed<br>";


document.onkeyup = function (event) {
    wordDisplayer(event);
}



function wordDisplayer(event) {
    let dashesArr = dashes.split(" ");
    let word = words[wordIndex];
    let userInput = event.key.toLowerCase();
    if (inputIsLetter(userInput) !== false) {
        let lettersPicked = userInput.toUpperCase();
        if (!lettersArr.includes(lettersPicked)) {
            lettersArr.push(lettersPicked);
            guessNumber--;
        }
    }
    for (let i = 0; i < word.length; i++) {
        if (userInput === word[i]) {
            dashesArr[i] = userInput;
        }
    }
    dashes = dashesArr.join(" ");
    if (guessNumber <= 0) {
        setTimeout(function () {
            alert("You ran out of guesses");
        }, 90)
        isGameOver = true;
        // guessNumber++;
    } else if (!dashes.includes("_")) {
        winScore++;
        isGameOver = true;
    }
    console.log("here1");
    winCount.innerHTML = "Wins<br>" + winScore;
    currentWord.innerHTML = "Current Word<br>" + dashes;
    guessRemaining.innerHTML = "Number of Guesses Remaining<br>" + guessNumber;
    lettersGuessed.innerHTML = "Letter Already Guessed<br>" + lettersArr.join(", ");

    if (isGameOver) {
        console.log("here2");
        setTimeout(function () {
            replay();
        }, 100);
    }
}



let invalidChar = ["BACKSPACE", "ALT", "META", "ESCAPE", "ARROWUP", "ARROWDOWN", "ARROWRIGHT", "ARROWLEFT", "SHIFT", "CAPSLOCK", "ENTER"];
function inputIsLetter(char) {
  if ((!/^[a-zA-Z]*$/g.test(char)) || (invalidChar.includes(char.toUpperCase()))) {
      alert("Invalid character. Please use only letters");
      return false;
  }
}

function replay() {
    let yesOrNo = confirm("Do you want to play again?");
    if (yesOrNo) {
        wordIndex++;
        isGameOver = false;
        guessNumber = 13;
        dashes = "_ ".repeat(words[wordIndex].length);
        lettersArr = [];
        winCount.innerHTML = "Wins<br>" + winScore;
        currentWord.innerHTML = "Current Word<br>" + dashes;
        guessRemaining.innerHTML = "Number of Guesses Remaining<br>" + guessNumber;
        lettersGuessed.innerHTML = "Letters Already Guessed<br>";
    } else {
        instructionsPrint.innerHTML = "Thanks for playing!";
        winCount.innerHTML = "";
        currentWord.innerHTML = "";
        guessRemaining.innerHTML = "";
        lettersGuessed.innerHTML = "";
    }
}
