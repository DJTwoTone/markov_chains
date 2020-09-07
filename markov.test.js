const { MarkovMachine } = require("./markov");
const fs = require('fs')


describe("Markov Machine Class", function () {

    test('build word list', function () {
      let mm = new MarkovMachine("the cat in the hat");
      expect(mm.words).toContain('the');
      expect(mm.words).toContain('cat');
      expect(mm.words).toContain('in');
      expect(mm.words).toContain('hat');
    });
  
    test('build markov chain', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.chains).toHaveProperty('the');
        expect(mm.chains).toHaveProperty('cat');
        expect(mm.chains).toHaveProperty('in');
        expect(mm.chains).toHaveProperty('hat');
    });
  
    test('build markov chain text with default', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.makeText()).toBeDefined();
        expect(mm.makeText()).not.toBeNull();
        expect(mm.makeText().length).not.toBe(0);
        expect(typeof mm.makeText()).toBe('string');
        expect(mm.makeText().split(" ").length).toBe(100);
    });
  
    test('build markov chain text with 20 words', function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.makeText(20)).toBeDefined();
        expect(mm.makeText(20)).not.toBeNull();
        expect(mm.makeText(20).length).not.toBe(0);
        expect(typeof mm.makeText(20)).toBe('string');
        expect(mm.makeText(20).split(" ").length).toBe(20);
    });
  
    

    test("build word list with read file", () => {
        const text = fs.readFile("eggs.txt", "utf-8", function(err, data) {
          if(err) {
            console.log("you got an error");
            console.log(err);
            process.exit(1);
          } else {
            let mm = new MarkovMachine(data);
            expect(mm.words[0]).toEqual(expect.any(String));
            expect(mm.words).toContain('i');
            expect(mm.words).toContain('am');
            expect(mm.words).toContain('eggs');
            expect(mm.words).toContain('ham');
          }
        })
      } 
    );

    test("build markov with read file", () => {
        const text = fs.readFile("eggs.txt", "utf-8", function(err, data) {
          if(err) {
            console.log("you got an error");
            console.log(err);
            process.exit(1);
          } else {
            let mm = new MarkovMachine(data);
            expect(mm.chains).toHaveProperty('am');
            expect(mm.chains).toHaveProperty('i');
            expect(mm.chains).toHaveProperty('ham');
            expect(mm.chains).toHaveProperty('eggs');
          }
        })
      } 
    );
  });
