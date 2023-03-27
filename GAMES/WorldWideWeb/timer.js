let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

let interval = null;

document.getElementById('startBtn').onclick = function () {
	if (interval == null) {
		interval = setInterval(decrease, 500);
	}
};
function decrease() {
	if (secondsInput.value > 0) {
		secondsInput.value -= 1;
	} else if (minutesInput.value > 0) {
		secondsInput.value = 59;
		minutesInput.value -= 1;
	} else if (hoursInput.value > 0) {
		minutesInput.value = 59;
		secondsInput.value = 59;
		hoursInput.value -= 1;
	}
}

document.getElementById('stopBtn').onclick = function () {
	clearInterval(interval);
	interval = null;
};

document.getElementById('resetBtn').onclick = function () {
	hoursInput.value = 0;
	minutesInput.value = 0;
	secondsInput.value = 0;
	clearInterval(interval);
	interval = null;
};
