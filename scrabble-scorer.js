// // This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates 
// // Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
   let score = '';
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
         score = Number(score) + Number(pointValue);
		 }
	  }
	}
	return score;
 }

//----------------------------------------------------------------------------------------------------------------------------------------------------

function simpleScorer(word) {
   word = word.toUpperCase();
   let score = word.length;     
   return score
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

const vowelBonusPoints = {
   1: ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Z'],
   3: ['A','E','I','O','U','Y']
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = '';
   for (i = 0; i < word.length; i++){
      for (const pointValue in vowelBonusPoints) {
         if (vowelBonusPoints[pointValue].includes(word[i])){
            score = Number(score) + Number(pointValue);
         }
      }
   }   
   return score;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------

function transform() {
   let pointStructureToReturn = {

   };
   for (pointValue in oldPointStructure){
      for (let i = 0; i < oldPointStructure[pointValue].length; i++){
         pointStructureToReturn[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
      }
   }
   return pointStructureToReturn;
};

const newPointStructure = transform(oldPointStructure);

function scrabbleScorer(userWord) {
   userWord = userWord.toLowerCase();
   let score = '';
   for (i = 0; i < userWord.length; i++){
      for (const letter in newPointStructure) {
         if (letter === userWord[i]) {
            score = Number(score) + Number(newPointStructure[letter]);
         }
      }
   }   
   return score;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------



function initialPrompt() {
   let userInput = input.question(`Let's play some Scrabble!\n\nEnter a word to score: `);
   return userInput;
};

const scoringAlgorithms = [
   {name: 'Simple Scoring',
    description: 'Each Letter is worth 1 point.',
    scorerFunction: simpleScorer
   },
   {name: 'Vowel Bonus',
    description: 'Vowels are 3 points, consonants are 1 point.',
    scorerFunction: vowelBonusScorer
   },
   {name: 'Scrabble',
    description: 'Uses the traditional Scrabble scoring system.',
    scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   let scoringRule = '';
   while ((scoringRule !== '0') && (scoringRule !== '1') && (scoringRule !== '2')){
   scoringRule = input.question(`\nWhich scoring rule would you like to use?

0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
Enter 0, 1, or 2: `);
      if ((scoringRule !== '0') && (scoringRule !== '1') && (scoringRule !== '2')){
         console.log(`\nOnly 0, 1, and 2 are valid inputs. Try again.`)
      }
   }
   if (scoringRule === '0'){
      return scoringAlgorithms[0].scorerFunction(word);
   }
   if (scoringRule === '1'){
      return scoringAlgorithms[1].scorerFunction(word);
   }
   if (scoringRule === '2'){
      return scoringAlgorithms[2].scorerFunction(word);
   } 
}   

//----------------------------------------------------------------------------------------------------------------------------------------------------


function runProgram() {
   let inputWord = initialPrompt();
   let score = scorerPrompt(inputWord);
   return `Score for '${inputWord}': ${score}`;
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
