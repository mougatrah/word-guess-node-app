var Letter = require("./Letter.js");

var Word = function(word){

    this.wordString = word;
    this.wordArray = [];
    for(let i in word){
        this.wordArray.push(new Letter(word[i]));
    }

    this.guess = function(char){
        for(let i in this.wordArray){
            this.wordArray[i].check(char);
        }
    }

    this.wordCheck = function(){
       var w = "";

       for(let i in this.wordArray){
           w += this.wordArray[i].get() + " ";
       }

       return w;
    }

    this.getWord = function(){
        return this.wordString;
    }
    
}

module.exports = Word;