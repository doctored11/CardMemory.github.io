let card;
let cards = [];

let arrayOfCards = [];
const settings = {
	cardsNumber: 6,
	clickCharge: 2,
};
let arrayOfSelectCards = [];

{
	// createCardsArray();
	getSettings();

	function createCardsArray() {
		console.log('221');

		for (let i = 0; i < settings.cardsNumber; ++i) {
			arrayOfCards.push({ value: null, _open: false, _success: false, id: i + 1 });
		}
		cardValueRandom(arrayOfCards, settings.clickCharge);
		cardsSort(arrayOfCards);
		painGameCard(arrayOfCards);

		selectCard();
	}

	function addCard(content) {
		const card = document.createElement('div');
		const cardContent = document.createElement('div');
		console.log('paint');
		console.log(content);

		cardContent.innerHTML = content;
		card.classList.add('card');

		document.getElementById('field').append(card);
		card.append(cardContent);
	}

	function addClick(arrayOfCards) {
		cards = document.querySelectorAll('.card');

		for (let i = 0; i < arrayOfCards.length; ++i) {
			cards[i].addEventListener('click', () => {
				if (!arrayOfCards[i]._open && !arrayOfCards[i]._success && clickCount > 0) {
					clickCount--;
					arrayOfCards[i]._open = !arrayOfCards[i]._open;

					cards[i].classList.add('card--open');

					arrayOfSelectCards.push(arrayOfCards[i].value);
				}
				if (clickCount <= 0) {
					console.log('finish');
					console.log(arrayOfSelectCards);

					if (checkCombination(arrayOfSelectCards)) {
						let trueCards = document.querySelectorAll('.card--open');
						for (let n = 0; n < trueCards.length; ++n) {
							trueCards[n].classList.add('card--success');
						}
						for (let n = 0; n < arrayOfCards.length; ++n) {
							if (arrayOfCards[n]._open == true) {
								arrayOfCards[n]._success = true;
							}
						}
						console.log(cards);
						console.log(arrayOfCards);
					}
					setTimeout(() => {
						flipOff();
					}, 400);
				}
			});
		}
	}
	// cards - массив объектов в доме

	//arrayOfCards - массив карт с состояниями

	function cardsSort(arrayOfCards) {
		console.log('sort');
		arrayOfCards = arrayOfCards.sort(() => Math.random() - 0.5);
		console.log(arrayOfCards);
		return arrayOfCards;
	}
	function painGameCard(arrayOfCards) {
		for (let i = 0; i < arrayOfCards.length; i++) {
			addCard(arrayOfCards[i].value);
		}
	}

	function cardValueRandom(arrayOfCards, clickCharge) {
		for (let i = 0; i < arrayOfCards.length; i++) {
			if (arrayOfCards[i].value == null) {
				console.log('i' + i);

				for (let n = 0; n < clickCharge; n++) {
					console.log('n' + n);
					arrayOfCards[i + n].value = i;
				}
			}
		}

		return arrayOfCards;
	}
	function selectCard() {
		clickCount = settings.clickCharge;

		if (clickCount > 0) {
			addClick(arrayOfCards);
		} else {
			console.log('finish2');
		}
	}
	function checkCombination(arrayOfSelectCards) {
		arrayOfSelectCards.sort();
		for (let i = 0; i < arrayOfSelectCards.length - 1; ++i) {
			if (arrayOfSelectCards[i] !== arrayOfSelectCards[i + 1]) {
				console.log('неверно ');

				return false;
			}
		}
		console.log('окс');
		return true;
	}
	function flipOff() {
		console.log('flipOff');
		for (let i = 0; i < arrayOfCards.length; ++i) {
			console.log(i);
			arrayOfCards[i]._open = false;

			cards[i].classList.remove('card--open');
		}
		arrayOfSelectCards.length = 0;
		clickCount = settings.clickCharge;
	}
	function getSettings() {
		console.log('&&&&');

		let formStart = document.querySelector('.form-start');
		formStart.addEventListener('submit', () => {
			if (arrayOfCards.length != 0) {
				clearAll();
			}

			let form = document.getElementById('cardCount');
			let cardNum = form.value;
			console.log(cardNum);
			settings.cardsNumber = cardNum;
			createCardsArray();
		});
	}
	function clearAll() {
		let field = document.getElementById('field');
		field.innerHTML = '';
		arrayOfCards.length = 0;
		cards.length = 0;

		console.log(field);
	}
}

//
{
	const validation = new JustValidate('#form');

	validation.addField('#cardCount', [
		{
			rule: 'required',
			errorMessage: 'Нам лучше знать сколько карточек будет в игре)',
		},
		{
			rule: 'number',

			errorMessage: 'а сколько это карточек?',
		},

		{
			rule: 'maxNumber',
			value: 50,
			errorMessage: 'Воу воу воу, это перебор ;)',
		},
		{
			rule: 'minNumber',
			value: 6,
			errorMessage: 'Ну это совсем не серьездно',
		},
	]);
}
