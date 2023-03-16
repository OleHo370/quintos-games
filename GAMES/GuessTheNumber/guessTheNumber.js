async function start() {
	// your code goes here!
	let num = Math.round(Math.random() * 99 + 1);

	let guessNum;

	while (guessNum != num) {
		guessNum = await prompt('Guess the number: ');
		if (guessNum < num) {
			await alert('Number was too low');
		} else if (guessNum > num) {
			await alert('Number was too high');
		}
	}
	await alert('You win!');

	exit();
}
