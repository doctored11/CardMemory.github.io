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
		calcCardSize();
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
					CheckFinish();
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
		let input = document.querySelector('.form__input');

		console.log(formStart);
		formStart.addEventListener('submit', () => {
			input = document.querySelector('.form__input');
			console.log(input);
			console.log(input.classList.contains('just-validate-success-field'));
			let form = document.getElementById('cardCount');
			Number(form.value);
			console.log(form.value > 5);

			if (
				Number.isInteger(Number(form.value)) &&
				form.value > 5 &&
				form.value < 51 &&
				form.value % 2 == 0
			) {
				console.log('add');
				input.classList.add('just-validate-success-field');
			}
			if (!input.classList.contains('just-validate-success-field')) {
				console.log('ошибка валидации');
				clearAll();
				return;
			}
			setTimeout(() => {
				document.querySelector('.game-property-block').classList.add('block-desable');
			}, 400);
			if (arrayOfCards.length != 0) {
				clearAll();
			}

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
	function CheckFinish() {
		for (let i = 0; i < arrayOfCards.length; ++i) {
			console.log('вызов');
			if (!arrayOfCards[i]._success) return;
		}
		console.log('finish');
		document.querySelector('.game-property-block').classList.remove('block-desable');
	}
	function calcCardSize() {
		let field = document.querySelector('.game-field');
		let _width, _height;
		let cardsNumber = cards.length;
		let fieldWidth = 0.65 * screen.width;
		let fieldHeight = 0.65 * screen.height;

		//
		let fieldSq = fieldHeight * fieldWidth;
		let bufer = fieldSq / cardsNumber;
		if (fieldHeight <= fieldWidth) {
			let a = fieldHeight;
			fieldHeight = fieldWidth;
			fieldWidth = a;
		}
		bufer = bufer / (fieldHeight / fieldWidth);
		let x = Math.round(Math.sqrt(bufer));

		console.log(x);
		bufer = Math.ceil(fieldWidth / x);
		x = Math.floor(fieldWidth / bufer);
		let margin = x * 0.15;

		_width = x - margin;
		_height = x * (fieldHeight / fieldWidth) - margin;
		//

		let card = document.querySelectorAll('.card');

		for (let i = 0; i < card.length; ++i) {
			console.log(card[i]);
			card[i].style.width = `${_width}px`;
			card[i].style.height = `${_height}px`;
			card[i].style.marginRight = `${margin}px`;
			card[i].style.marginBottom = `${margin}px`;
		}
		field.style.paddingLeft = `${margin}px`;
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
		{
			validator: (value) => {
				let form = document.getElementById('cardCount');
				const chet = form.value;
				return Boolean(Number(chet) % settings.clickCharge == 0);
			},
			errorMessage: 'Лучше чтоб число делилось на ' + settings.clickCharge,
		},
	]);
}
