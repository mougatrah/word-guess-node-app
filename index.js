var inquire = require("inquirer");
var Word = require("./Word.js")


inquire.prompt([
    {
        type: "confirm",
        name: "select",
        message: "Would you like to play Word Guess?"
    }
]).then(function (user) {
    if (user.select) {
        console.log("\nLet's play!")
        main();
    } else {
        quit();
    }
});

function main() {

    var lives = 10;
    
    var possibleWords = [
        "skeleton",
        "portrait",
        "hocus pocus",
        "chain wax"
    ];
    

    console.log("\nPicking a word...")

    var currentIndex = Math.floor(Math.random() * Math.floor(possibleWords.length));
  
    var wordsUsed = [];
    wordsUsed.push(currentIndex);

    var currentWord = new Word(possibleWords[currentIndex]);
    var lettersGuessed = [];

    function update() {
        console.log(`\nCurrent situation:\n${currentWord.wordCheck()}\nLetters guessed: ${lettersGuessed.join(" ")}\n`);

        inquire.prompt([
            {
                message: "Enter a letter to guess. Type quit to quit.",
                name: "guess",
                validate: function(user){
                   if(user.toLowerCase().trim() === "quit"){
                    quit();
                   }else if(user === undefined || user.length != 1 || String.fromCharCode(user.toLowerCase()) < 65 || String.fromCharCode(user.toLowerCase()) > 90 ){
                        console.log("\nInvalid guess.")
                        return false;
                    }else if(lettersGuessed.includes(user.toLowerCase())){
                        console.log("\nYou've already guessed " + user);
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        ]).then(function(user){
            console.log("\nYou guessed: " + user.guess);
            lettersGuessed.push(user.guess.toLowerCase());
            var before = currentWord.leftToGuess();
            currentWord.guess(user.guess);
            if(before > currentWord.leftToGuess()){
                console.log("\x1b[32m%s\x1b[0m", "CORRECT!");
                
            }else{
                console.log("\x1b[31m%s\x1b[0m", "INCORRECT!");
                lives--;
                console.log("Lives left: " + lives);
                if(lives <= 0){
                    console.log("You lost... Resetting...");
                  main();
                }
            }
            if(currentWord.wordCheck().includes("_")){
                update();
            }else{
                nextWord();
            }
            

        })
    }
    function nextWord(){
        console.log("\nWord guessed! " + currentWord.getWord());
        console.log("\nPicking next word...");
        if(wordsUsed.length === possibleWords.length){
            console.log("\nYou guessed every word!");
            quit();
        }else{
            var overFlow = 0;
            while(wordsUsed.includes(currentIndex)){
                currentIndex = Math.floor(Math.random() * Math.floor(possibleWords.length));
                overFlow++;
                if(overFlow > 100){
                    console.log("\nUH OOOOOOH");
                    quit();
                }
            }
            console.log("Updating...")
            lives = 10;
            lettersGuessed = [];
            wordsUsed.push(currentIndex);
            currentWord = new Word(possibleWords[currentIndex]);
            update();
        }
    }

    update();
}

function quit() {
    console.log("\nGood Bye!");
    process.exit();
}
