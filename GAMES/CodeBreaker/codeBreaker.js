let commonWords;

async function start() {
	let filePath = QuintOS.dir + '/words.txt';
	let data = await fetch(filePath);
	commonWords = await data.text();
	commonWords = commonWords.split('\n');
	let message;
	let response = await prompt('Do you want to load a message from a file? (y/n)');
	if (response == 'y') {
		let filePath1 = QuintOS.dir + '/secrets.txt';
		let data1 = await fetch(filePath1);
		message = await data1.text();
	} else {
		message = await prompt('Encryption Message: ');
	}
	message = message.toUpperCase();
	let answer = await prompt('Do you know the shift amount? Type y is yes, n if no');
	if (answer == 'y') {
		let shiftKey = await prompt('Shift Amount: ');
		await alert(ceasarCipher(message, shiftKey));
	} else {
		let shiftKey = autoDecrypt(message);
		if (shiftKey != -1) {
			await alert('Key: ' + shiftKey + '\n' + ceasarCipher(message, shiftKey));
		} else {
			for (let shiftKey = 1; shiftKey < 26; shiftKey++) {
				let btnText = shiftKey + ' : ';
				btnText += ceasarCipher(message.slice(0, 68), shiftKey) + '...';
				button(btnText, shiftKey, 2, () => {
					erase();
					alert(ceasarCipher(message, shiftKey));
				});
			}
		}
	}
}

function autoDecrypt(message) {
	message = message.slice(0, 200);
	for (let shiftKey = 1; shiftKey < 26; shiftKey++) {
		let excerpt = ceasarCipher(message, shiftKey);
		excerpt = excerpt.split(' ');

		let count = 0;
		for (let i = 0; i < excerpt.length; i++) {
			for (let j = 0; j < commonWords.length; j++) {
				if (commonWords[j] == excerpt[i]) {
					count++;
					break;
				}
			}
			if (count >= 3) {
				return shiftKey;
			}
		}
	}
	return -1;
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
