const gameCard = document.getElementById('card');
const startButton = document.querySelector('#start');
const timer = document.querySelector('#timer');
let storedHighScore = JSON.parse(localStorage.getItem('high-score'));
let highScore = document.querySelector('#high-score');
const restartButton = document.querySelector('#restart');
let start = false;
const selectedCards = [];
let matched = [];
let time = 0.0;

if (storedHighScore === null) {
	highScore.innerText = `High Score: 0s`;
} else {
	highScore.innerText = `High Score: ${storedHighScore}s`;
}

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];
function randomColors(numberOfCards) {
	let colors = [];
	let numberofPairs = numberOfCards / 2;
	for (let i = 0; i < numberofPairs; i++) {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		colors.push(`rgb(${r},${g},${b})`);
		colors.push(`rgb(${r},${g},${b})`);
	}
	return colors;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}
let colors = randomColors(10);
let shuffledColors = shuffle(colors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameCard.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(e) {
	// you can use e.target to see which element was clicked
	console.log('you just clicked', e.target);
	if (start === true) {
		if (selectedCards.length < 2) {
			e.target.style.backgroundColor = e.target.className;
			selectedCards.push(e.target);
			console.log(selectedCards);
		}
		if (selectedCards.length === 2 && selectedCards[0].className !== selectedCards[1].className) {
			setTimeout(flipCardBack, 1000);

			console.log('THESE ARE NOT EQUAL. TRY AGAIN.');
		} else if (selectedCards.length === 2 && selectedCards[0].className === selectedCards[1].className) {
			console.log('THESE ARE EQUAL! KEEP GOING!');
			matched.push(e.target.className);
			selectedCards.splice(0, 2);
		}
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
startButton.addEventListener('click', startGame);

restartButton.addEventListener('click', restartGame);

function startGame(e) {
	e.preventDefault();
	if (e.target === startButton) {
		start = true;
		timeCounter();
	}
}

function restartGame(e) {
	if (e.target === restartButton) {
		location.reload();
	}
}

function timeCounter() {
	let timeInterval = setInterval(function() {
		time += 0.1;
		time = Math.round(time * 10) / 10;
		timer.innerText = `Time: ${time}s`;
		if (matched.length === 5) {
			clearInterval(timeInterval);
			gameOver();
			console.log('congratulations');
		}
	}, 100);
}

function gameOver() {
	if (!storedHighScore || time < storedHighScore) {
		localStorage.setItem('high-score', JSON.stringify(time));
		highScore.innerText = `High Score: ${time}s`;
	}
}

function flipCardBack() {
	selectedCards[0].style.backgroundColor = gameCard.style.backgroundColor;
	selectedCards[1].style.backgroundColor = gameCard.style.backgroundColor;
	selectedCards.splice(0, 2);
}
