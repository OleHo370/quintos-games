const hangman = [
	`
  +---+
  |   |
      |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

const wordsList =
	'abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled funny gabby galaxy galvanize gazebo gizmo glow glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack lengths lucky luxury marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quip quiz quizzes razzmatazz rhythm scratch snazzy squawk staff strength stretch stronghold stymie subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie';

// the start function gets run when the game starts
async function start() {
	// your code goes here! below this line

	/* Part A: split the wordsList String into an array called words, then choose a random word */

	const words = wordsList.split(' ');
	let replay;

	while (replay != 'n') {
		let randomNum = round(random(0, words.length - 1));
		let word = words[randomNum];
		log(word);

		/* Part B: make an array with a line for each letter in the word */
		// Example word: 'quiz'
		// lines -> ['_', '_', '_', '_']
		let lines = [];
		for (let i = 0; i < word.length; i++) {
			lines[i] = '_';
		}

		let wrongLetters = [];
		let wrongCount = 0;
		while (wrongCount < 6) {
			/* Part C: show the lines for the word below the hangman art */
			let didWin = true;
			for (let i = 0; i < lines.length; i++) {
				if (lines[i] == '_') {
					didWin = false;
				}
			}
			if (didWin) {
				await alert('You win! The word was: ' + word);
				exit();
				break;
			}

			let guess = await prompt(hangman[wrongCount] + '\n\n' + wrongLetters.join(' ') + '\n\n' + lines.join(' '));

			if (guess == '' || (guess.length != 1 && guess.length != word.length)) {
				await alert('Please enter your guess (one letter or full word).');
			} else if (guess == word) {
				for (let i = 0; i < word.length; i++) {
					lines[i] = guess[i];
				}
			} else {
				let isCorrect = false;
				for (let i = 0; i < word.length; i++) {
					if (guess == word[i]) {
						lines[i] = guess;
						isCorrect = true;
					}
				}

				if (isCorrect == false) {
					let isFound = false;
					for (let i = 0; i < wrongCount; i++) {
						if (wrongLetters[i] == guess) {
							isFound = true;
							break;
						}
					}
					if (isFound == false) {
						wrongLetters[wrongCount] = guess;
						wrongCount++;
					} else {
						await alert('You already guessed that letter, try another!');
					}
				}
			}
		}

		if (wrongCount == 6) {
			await alert(hangman[wrongCount] + '\n\n' + 'You lose! The correct word was: ' + word);
		}
		replay = await prompt('Would you like to play again? Press y if yes, n if no');
	}
	exit();
} // end of the start function
