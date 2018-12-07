var Letter = function(letter){
    this.letter = letter;
    this.blank = this.letter === " " ? " " : "_";
    this.guessed = false;

    this.get = function(){
        if(this.guessed){
            return this.letter;
        }else{
            return this.blank;
        }
    }

    this.check = function(guess){
        if(guess === this.letter){
            this.guessed = true;
            return this.guessed;
        }else{
            return this.guessed;
        }
    }
}

module.exports = Letter;

