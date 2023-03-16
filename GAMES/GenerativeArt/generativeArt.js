let time = 0;
let art = 3;

function draw() {
	background(0, 0, 0, 10);
	strokeWeight(5);

	translate(width * 0.5, height * 0.5);
	let speed;
	if (art < 4) {
		speed = 50;
	} else {
		speed = 1;
	}

	for (let i = 0; i < speed; i++) {
		if (art == 4) stroke(eqY2(time), eqY(time), eqX(time));
		if (art == 5) {
			stroke(eqY2(time), eqY(time), eqX(time));
			background(255 - eqY2(time), 255 - eqY(time), 255 - eqX(time), 10);
		}
		if (art == 6) {
			stroke(eqY2(time), eqY(time), eqX(time));
			background(255 - eqY2(time), 255 - eqY(time), 255 - eqX(time), 10);
		} else stroke('white');
		point(eqX(time), eqY(time));
		if (art == 4) {
			line(eqX2(time), eqY2(time), eqX(time), eqY(time));
		} else if (art == 5) {
			line(eqX2(time), eqY2(time), eqX(time), eqY(time));
		} else if (art == 6) {
			line(eqX2(time), eqY2(time), eqX(time), eqY(time));
			line(eqX(500 - time), eqY(500 - time), eqX2(500 - time), eqY2(500 - time));
		} else {
			point(eqX(time), eqY(time));
		}
		time += 0.1;
	}

	if (kb.presses('left')) {
		background('black');
		art--;
	}
	if (kb.presses('right')) {
		background('black');
		art++;
	}
}

function eqX(t) {
	if (art == 0) return cos(t * 3) * 500;
	if (art == 1) return sin(t * 2) * mouse.x * cos(t) * 20;
	if (art == 2) {
		return sin(t * 4) * cos(t * 7) * 500;
	}
	if (art == 3) {
		return sin(t * 3.5) * cos(t * 1.5) * 500;
	}
	if (art == 4) {
		return sin(t * 3.5) * cos(t * 23) * 500;
	}
	if (art == 5) {
		return sin(t * 3) * cos(t * 30) * 500;
	}
	if (art == 6) {
		return sin(t * 3) * cos(t * 30) * 500;
	}
}

function eqY(t) {
	if (art == 0 || art == 1) return sin(t * 5) * 500;
	if (art == 2 || art == 3) {
		return sin(t * 2.5) * cos(t * 4) * 500;
	}
	if (art == 4) {
		return sin(t * 1.7) * cos(t * 27) * 500;
	}
	if (art == 5) {
		return sin(t * 2) * cos(t * 25) * 500;
	}
	if (art == 6) {
		return sin(t * 2) * cos(t * 25) * 500;
	}
}

function eqX2(t) {
	if (art == 4) {
		return cos(t * 35) * 500;
	}
	if (art == 5) {
		return sin(t * 20) * 500;
	}
	if (art == 6) {
		return sin(t * 20) * 500;
	}
}

function eqY2(t) {
	if (art == 4) {
		return sin(t * 15) * 500;
	}
	if (art == 5) {
		return cos(t * 30) * 500;
	}
	if (art == 6) {
		return cos(t * 30) * 500;
	}
}
