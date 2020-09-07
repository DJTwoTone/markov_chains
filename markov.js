/** Textual markov chain generator */
const fs = require('fs');


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    words = words.map((str) => {
      return str.replace(/[.,?!"“”_]/g, "").toLowerCase(); 
    })
    this.words = words.filter(c => c !== "");
    this.chains = {}
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    this.words.forEach((x, idx) => {
      if (this.chains.hasOwnProperty(x)) {
        if (this.chains[x].indexOf(this.words[idx + 1]) == -1) {
          if (this.words[idx + 1] === undefined) {
            this.chains[x].push(null)
          } else {
            this.chains[x].push(this.words[idx + 1])
          }
        }
      } else {
        if (this.words[idx + 1] === undefined) {
          this.chains[x] = [null];
        } else {
          this.chains[x] = [this.words[idx + 1]];
        }
      }
    })
  }

  randVal(key) {
    return Math.floor(Math.random() * Math.floor(key.length));
  }

  randKey(obj) {
    let keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

  
  /** return random text from chains */

  makeText(numWords = 100) {
    let mArr = [];
    
    let initWord = this.randKey(this.chains).toString()
    mArr.push(initWord)
    for (let i=1; i < numWords; i++) {
      let word = mArr[mArr.length - 1]
      let nextword = this.chains[`${word.toLowerCase()}`][this.randVal(this.chains[`${word.toLowerCase()}`])]
      if (nextword == null) {
        mArr[mArr.length - 1] += '.';
        nextword = this.randKey(this.chains);
        nextword = nextword.charAt(0).toUpperCase() + nextword.slice(1)
      }
      mArr.push(nextword);
    }
    mArr.map(char => char === 'i' ? 'I' : char)
    mArr[mArr.length - 1] += '.';
    let sent = mArr.join(' ');
    sent = sent.charAt(0).toUpperCase() + sent.slice(1)
    return sent

  }
}


// fs.readFile(
//   "eggs.txt",
//   "utf8",
//   function(err, data) {
//     if(err) {
//       console.log("you got an error");
//       process.exit(1);
//   }
//   let mm2 = new MarkovMachine(data);
//   console.log(mm2.words)
//   console.log(mm2.chains)
//   console.log(mm2.makeText())
//   })

// let mm1 = new MarkovMachine("the cat in the hat");
// console.log(mm1.words)
// console.log(mm1.chains)
// console.log(mm1.makeText(20));

module.exports = {MarkovMachine};