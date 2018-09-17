var wordArray = []; //an array of blanks and correctly guessed letters
var lettersGuessed = []; //an array of incorrectly guessed letters
var lettersInArray = "";
var guessesRemaining = 13;
var winCounter = 0;
var mathWords = ["angle", "circumference", "parallel", "perpendicular", "square", "rectangle", "triangle", "rhombus", "ellipse",
    "pentagon", "trapezoid", "parallelogram", "hexagon", "decagon", "fractal", "octagon", "cylinder", "sphere", "concave", "hyperbola"]

var winsText = document.getElementById("wins-text");
var wordText = document.getElementById("word-text");
var countText = document.getElementById("count-text");
var printLetters = document.getElementById("letters-guessed");
var picText = document.getElementById("picture-text");
var geoImage = document.getElementById("geo-image");

//functions

//this makes a concatenated string based of elemets in the wordArray with a blank space in between and returns the final string
function makeBlanksString() {
    var blanksAndChars = "";
    for (var i = 0; i < wordArray.length - 1; i++) {
        blanksAndChars += wordArray[i];
        blanksAndChars += " ";
    }
    blanksAndChars += wordArray[wordArray.length - 1];
    return blanksAndChars;
}

//this creates a wordArray of blanks
function wordArrayReset() {
    wordArray = [];
    for (var i = 0; i < mathWord.length; i++) {
        wordArray[i] = "___";
    }
}

function resetGame() {
    //choose a new word, reset the word array and print the correct number of blanks
    mathWord = mathWords[Math.floor(Math.random() * mathWords.length)];
    console.log(mathWord);
    wordArrayReset();
    wordText.textContent = makeBlanksString().toUpperCase();
    //reset the number of guesses remaining and print it
    guessesRemaining = 13;
    countText.textContent = guessesRemaining;
    //reset the lettersGuessed array and print the array
    lettersGuessed = [];
    lettersInArray = "";
    printLetters.textContent = lettersInArray;
}

//choose a random word to guess
var mathWord = mathWords[Math.floor(Math.random() * mathWords.length)];
console.log(mathWord);

//create an array of blank spaces
wordArrayReset();

//initially print the correct number of blanks
wordText.textContent = makeBlanksString().toUpperCase();

//wait for a key to be pressed
document.onkeyup = function (event) {

    //check to see if the guess is in the word
    if (mathWord.indexOf(event.key) !== -1) {
        for (var i = 0; i < mathWord.length; i++) {
            if (mathWord.charAt(i) === event.key) {
                wordArray[i] = event.key;
            }
        }
        //update the wordText with the reveal
        wordText.textContent = makeBlanksString().toUpperCase();
    }
    //if guess is not in the word, add to the array 
    else if (lettersGuessed.indexOf(event.key) === -1) {
        lettersGuessed.push(event.key);
        //print the array
        //format differently if we're only printing 1 item
        if (lettersGuessed.length === 1) {
            printLetters.textContent = lettersGuessed[0].toUpperCase();
            lettersInArray = lettersGuessed[0];
        }
        else {
            lettersInArray = lettersInArray + ", " + event.key;
            printLetters.textContent = lettersInArray.toUpperCase()
        }
        //decrement counter and reprint if not already guessed
        guessesRemaining--;
        countText.textContent = guessesRemaining;
        //if you're out of guesses, reset the game
        if (guessesRemaining === -1) {
            resetGame();
        }
    }

    //check if there is a win
    if (wordArray.indexOf("___") === -1) {
        //increment win counter & print it
        winCounter++;
        winsText.textContent = winCounter;
        //change the picture and the text underneath it
        var imageSrc = "assets/images/" + mathWord + ".svg";
        geoImage.src = imageSrc;
        console.log("geoImage");
        picText.textContent = mathWord;
        //reset the game
        resetGame();
    }

    console.log(event.key);
    console.log(lettersGuessed);
}