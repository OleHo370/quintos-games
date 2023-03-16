async function start() {
	let filePath = QuintOS.dir + '/secrets.txt';
	let data = await fetch(filePath);
	let message = await data.text();

	//let message = await prompt('Encryption Message: ');
	let shiftKey = await prompt('Shift Amount: ');
	await alert(ceasarCipher(message, shiftKey));
}
function ceasarCipher(message, shiftAmount) {
	let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let secret = '';
	for (let i = 0; i < message.length; i++) {
		let letter = message[i];
		let letterIdx = alphabet.indexOf(letter);
		if (letterIdx == -1) {
			secret += message[i];
		} else if (letterIdx + shiftAmount >= alphabet.length) {
			secret += alphabet[(alphabet.length - letterIdx) * -1 + shiftAmount];
		} else {
			secret += alphabet[letterIdx + shiftAmount];
		}
	}
	return secret;
}
