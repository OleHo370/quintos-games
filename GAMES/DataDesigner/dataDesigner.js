// example film table

const genres = ['Romance', 'Drama', 'Action', 'Crime', 'Animation', 'Thriller', 'Sci-Fi', 'Adventure'];
let members;
let films;

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	films = await data.json();
	let filePath1 = QuintOS.dir + '/members.json';
	let data1 = await fetch(filePath1);
	members = await data1.json();

	main();
}

async function main() {
	erase();
	let result = await prompt('View a: 1. member, 2. film info, 3. exit', 19, 0, 40);

	if (result[0] == 1) {
		let memid = result.split(' ')[1];
		showMemberInfo(memid);
	} else if (result[0] == 2) {
		let movid = result.split(' ')[1];
		showFilmInfo(movid);
		main();
	}
}

async function showFilmInfo(movid) {
	erase();
	let film;
	for (let i = 0; i < films.length; i++) {
		if (movid == films[i].id) {
			film = films[i];
			break;
		}
	}
	txt('Film ID: ' + film.id, 2);
	txt('Film Title: ' + film.title, 3);
	txt('Genre: ' + genres[film.genre], 4);
	txt('Film Rating: ' + film.rating, 5);
	txt('Film Description: ' + film.description, 6);
}

async function showMemberInfo(memid) {
	erase();
	let table = `
| id | film title                      |
|====|=================================|`;
	let member;
	for (let i = 0; i < members.length; i++) {
		if (memid == members[i].id) {
			member = members[i];
			break;
		}
	}
	txt(member.id + ' ' + member.name + ' ', 2);
	for (let i = 0; i < member.rented.length; i++) {
		for (let j = 0; j < films.length; j++) {
			if (member.rented[i] == films[j].id) {
				let film = films[j];
				table += '\n| ' + film.id + ' | ';
				table += film.title.padEnd(32, ' ') + '|';
				table += '\n|----|---------------------------------|';
			}
		}
	}
	txt(table, 4, 0);

	let result = await prompt(
		"1. Go back to the main menu, 2. View a film's info, 3. Rent a film, 4. Return the film",
		15,
		0,
		40
	);

	if (result == 1) {
		main();
		return;
	}

	let filmId = result.split(' ')[1];
	if (result[0] == 2) {
		showFilmInfo(filmId);
		await alert('Press enter to return to member info menu', 12);
	} else if (result[0] == 3) {
		member.rented.push(filmId);
	} else if (result[0] == 4) {
		let remIdx = member.rented.indexOf(filmId);
		member.rented.splice(remIdx, 1);
	}
	showMemberInfo(memid);
}
