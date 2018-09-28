//initialize varialbles-------------------------------------------------------

var lettersInArray = ""; //a string used to print lettersGuessed to the screen
var mathWords = ["angle", "circumference", "parallel", "perpendicular", "square", "rectangle", "triangle", "rhombus", "ellipse",
    "pentagon", "trapezoid", "parallelogram", "hexagon", "decagon", "fractal", "octagon", "cylinder", "sphere", "concave", "hyperbola"] //words to choose from

var winsText = document.getElementById("wins-text");
var wordText = document.getElementById("word-text");
var countText = document.getElementById("count-text");
var printLetters = document.getElementById("letters-guessed");
var picText = document.getElementById("picture-text");
var geoImage = document.getElementById("geo-image");

//objects-----------------------------------------------------------------------

var game = {
    winCounter: 0,
    wordArray: [],
    guessesRemaining: 13,
    lettersGuessed: [],
    mathWord: mathWords[Math.floor(Math.random() * mathWords.length)],

    //this creates a wordArray of blanks
    wordArrayReset: function () {
        for (var i = 0; i < this.mathWord.length; i++) {
            this.wordArray[i] = "___";
        }
    },

    //resets the object properties
    reset: function () {
        this.guessesRemaining = 13;
        this.lettersGuessed = [];
        this.mathWord = mathWords[Math.floor(Math.random() * mathWords.length)];
        this.wordArray = [];
        this.wordArrayReset();
    }
};

//functions---------------------------------------------------------------------

//this makes a concatenated string based of elemets in the wordArray with a blank space in between and returns the final string
function makeBlanksString() {
    var blanksAndChars = "";
    for (var i = 0; i < game.wordArray.length - 1; i++) {
        blanksAndChars += game.wordArray[i];
        blanksAndChars += " ";
    }
    blanksAndChars += game.wordArray[game.wordArray.length - 1];
    return blanksAndChars;
}

//this resets the game
function resetGame() {
    //reset the number of guesses remaining, the letters guessed, the new word, and the word array and print 
    game.reset();
    countText.textContent = game.guessesRemaining;
    lettersInArray = "";
    printLetters.textContent = "";
    wordText.textContent = makeBlanksString().toUpperCase();
}

//--------------------------------------------------------------------------

//create an array of blank spaces
game.wordArrayReset();

//initially print the correct number of blanks
wordText.textContent = makeBlanksString().toUpperCase();

//wait for a key to be pressed
document.onkeyup = function (event) {

    //only allow letters
    if ((event.which >= 65) && (event.which <= 90)) {
        //check to see if the guess is in the word
        //if it is, reveal the letters
        if (game.mathWord.indexOf(event.key) !== -1) {
            for (var i = 0; i < game.mathWord.length; i++) {
                if (game.mathWord.charAt(i) === event.key) {
                    game.wordArray[i] = event.key;
                }
            }
            //update the wordText with the reveal
            wordText.textContent = makeBlanksString().toUpperCase();
        }
        //if guess is not in the word, add to the array 
        else if (game.lettersGuessed.indexOf(event.key) === -1) {
            game.lettersGuessed.push(event.key);
            //print the array
            //format differently if we're only printing 1 item
            if (game.lettersGuessed.length === 1) {
                printLetters.textContent = game.lettersGuessed[0].toUpperCase();
                lettersInArray = game.lettersGuessed[0];
            }
            else {
                lettersInArray = lettersInArray + ", " + event.key;
                printLetters.textContent = lettersInArray.toUpperCase()
            }
            //decrement counter and reprint if not already guessed
            game.guessesRemaining--;
            countText.textContent = game.guessesRemaining;
            //if you're out of guesses, reset the game
            if (game.guessesRemaining === 0) {
                resetGame();
            }
        }

        //check if there is a win
        if (game.wordArray.indexOf("___") === -1) {
            //increment win counter & print it
            game.winCounter++;
            winsText.textContent = game.winCounter;
            //change the picture and the text underneath it
            var imageSrc = "assets/images/" + game.mathWord + ".svg";
            geoImage.src = imageSrc;
            picText.textContent = game.mathWord;
            //reset the game
            resetGame();
        }
    }
}