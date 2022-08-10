let card;
let select = document.getElementById('select');
let cards = [];
let bestR = {
	// hour: 121,
	// min: 121,
	// sec: 121,
	// ms: 121,
};

let arrayOfCards = [];
const settings = {
	cardsNumber: 6,
	clickCharge: 2,
};
let nMod;

let arrayOfSelectCards = [];
let _hour = 00,
	_min = 00,
	_sec = 00,
	_ms = 00,
	_interval;

{
	// main logic
	getSettings();

	function createCardsArray() {
		console.log('221');
		settings.clickCharge = pairModeDetermine();
		if (settings.clickCharge == 0) settings.clickCharge = 2;
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
		const front = document.createElement('div');
		const back = document.createElement('div');
		const img = document.createElement('img');

		img.src = `sourse/front-${content}.png`;
		img.classList.add('front-img');

		const cardContent = document.createElement('div');

		console.log('paint');
		console.log(content);

		cardContent.innerHTML = content;
		cardContent.classList.add('front-num');
		card.classList.add('card');
		front.classList.add('front');
		back.classList.add('back');

		document.getElementById('field').append(card);
		card.append(front);
		card.append(back);

		front.append(cardContent);
		front.append(img);
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
			pairModeDetermine();
			timerStop();
			input = document.querySelector('.form__input');
			console.log(input);
			console.log(input.classList.contains('just-validate-success-field'));
			let form = document.getElementById('cardCount');
			Number(form.value);
			console.log(form.value > 5);
			if (settings.clickCharge == 0) settings.clickCharge = 2;
			if (
				Number.isInteger(Number(form.value)) &&
				form.value > 5 &&
				form.value < 51 &&
				form.value % settings.clickCharge == 0
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
			bestR = JSON.parse(
				localStorage.getItem(`BestResult${settings.cardsNumber}-${settings.clickCharge}`)
			);
			if (bestR == undefined) {
				bestR = {
					hour: 121,
					min: 121,
					sec: 121,
					ms: 121,
					mod: 121,
					click: 121,
				};
			}

			timerCounter();
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
		timerPause();
		document.querySelector('.game-property-block').classList.remove('block-desable');
		let restartText = document.querySelector('.property-content');

		restartText.textContent = `Ваш последний результат ${_hour}h:${_min}m:${_sec}s:${_ms}ms\n
	 	Ваш лучший результат в режиме ${nMod} карт по правилам \"комбинация ${settings.clickCharge}\" =  ${bestR.hour}h:${bestR.min}m:${bestR.sec}s:${bestR.ms}ms `;
	}
	function calcCardSize() {
		let field = document.querySelector('.game-field');
		let header = document.querySelector('.header');
		console.log(header.getBoundingClientRect().height);
		let _width, _height;
		let cardsNumber = cards.length;
		let fieldWidth = 0.65 * screen.width;
		let fieldHeight = 0.65 * screen.height;
		let card = document.querySelectorAll('.card');
		let containerB = document.querySelector('.body__container');
		containerB.style.height = `${screen.height}px`;

		//
		if (card.length < 18) {
			fieldWidth = 0.65 * screen.width;
			fieldHeight = 0.65 * screen.height;
		} else if (card.length < 36) {
			fieldWidth = 0.75 * screen.width;
			fieldHeight = 0.75 * screen.height;
		} else {
			fieldWidth = 0.85 * screen.width;
			fieldHeight = 0.85 * screen.height;
		}

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
		let body = document.querySelector('.body-block');
		if (card.length < 14) {
			body.style.height = `${0.65 * screen.height}px`;
		} else if (card.length < 18) {
			body.style.height = `${0.7 * screen.height}px`;
		} else if (card.length < 36) {
			body.style.height = `${0.8 * screen.height}px`;
			margin = x * 0.08;
		} else {
			body.style.height = `${0.95 * screen.height}px`;
			body.style.justifyContent = 'flex-start';
			console.log('95%');
			margin = x * 0.05;
		}

		for (let i = 0; i < card.length; ++i) {
			console.log(card[i]);
			card[i].style.width = `${_width}px`;
			card[i].style.height = `${_height}px`;
			card[i].style.marginRight = `${margin}px`;
			card[i].style.marginBottom = `${margin}px`;
		}
		console.log(screen.height);

		body.style.minHeight = `${0.6 * screen.height}px`;
		body.style.maxHeight = `${0.95 * screen.height}px`;

		field.style.paddingLeft = `${margin}px`;
	}
	// тряска по времени
	function addShake() {
		let card = document.querySelectorAll('.card');
		setTimeout(() => {
			let n = Math.floor(Math.random() * card.length);

			card[n].classList.add('shake');

			setTimeout(() => {
				card[n].classList.remove('shake');
			}, 300);
			setTimeout(() => {}, 3000);
		}, 9000);
		return;
	}

	// таймер
	function timerPause() {
		clearInterval(_interval);
		console.log(_sec);

		//эту функцию вызывать после нахождения всех пар

		// тут мне нужно получить значение времени - сравнить его - и если это МЕНЬШЕЕ время то записать его в локал стораже)

		console.log(_sec, bestR.sec, _sec < bestR.sec);
		_hour < bestR.hour ? (bestR.hour = _hour) : 0;
		_min < bestR.min ? (bestR.min = _min) : 0;
		_sec < bestR.sec ? (bestR.sec = _sec) : 0;
		_ms < bestR.ms ? (bestR.ms = _ms) : 0;
		bestR.mod = settings.cardsNumber;
		// bestR = JSON.stringify(bestR);
		nMod = settings.cardsNumber;
		localStorage.setItem(
			`BestResult${settings.cardsNumber}-${settings.clickCharge}`,
			JSON.stringify(bestR)
		);
	}

	function timerStop() {
		clearInterval(_interval);
		_hour = 00;
		_min = 00;
		_sec = 00;
		_ms = 00;
		hourEl.textContent = '00';
		minEl.textContent = '00';
		secEl.textContent = '00';
		msecEl.textContent = '00';
	}

	// timer
	function timerCounter() {
		clearInterval(_interval);
		_interval = setInterval(startTimer, 10);
	}
	const hourEl = document.querySelector('.hours');
	const minEl = document.querySelector('.minutes');
	const secEl = document.querySelector('.seconds');
	const msecEl = document.querySelector('.mili-seconds');

	// let _hour = 00,
	// 	_min = 00,
	// 	_sec = 00,
	// 	_ms = 00,
	// 	_interval;

	function startTimer() {
		_ms++;

		_ms < 10 ? (msecEl.textContent = '0' + _ms) : _ms < 100 ? (msecEl.textContent = _ms) : 0;
		if (_ms > 99) {
			++_sec;
			secEl.textContent = '0' + _sec;
			_ms = 0;
			msecEl.textContent = '0' + _ms;
		}
		//sec

		_sec < 10 ? (secEl.textContent = '0' + _sec) : _sec < 60 ? (secEl.textContent = _sec) : 0;
		if (_sec > 59) {
			++_min;
			minEl.textContent = '0' + _min;
			_sec = 0;
			secEl.textContent = '0' + _sec;
		}
		if (_sec % 12 == 0 && _ms == 0) {
			console.log('!!!!!!!');
			addShake();
			return;
		}
		//min
		_min < 10 ? (minEl.textContent = '0' + _min) : _min < 60 ? (minEl.textContent = _min) : 0;
		if (_min > 59) {
			++_hour;
			hourEl.textContent = '0' + _hour;
			_min = 0;
			minEl.textContent = '0' + _min;
		}
		//
		_hour < 10
			? (hourEl.textContent = '0' + _hour)
			: _hour < 60
			? (hourEl.textContent = _hour)
			: 0;
		if (_hour > 59) {
			_min, _hour, (_sec = 0);
		}
	}
	function pairModeDetermine() {
		let combination = Number(select.value);
		settings.clickCharge = combination;
		return combination;
	}
}

//
{
	// validate
	const validation = new JustValidate('#form');
	window.pairN = pairModeDetermine();
	let formSelect = document.querySelector('.main__select');
	formSelect.addEventListener('mouseup', () => {
		console.log('EVENT EVENT');
		pairModeDetermine();
		window.pairN = pairModeDetermine();
		console.log(pairN);
	});
	// let text;
	// text = `Лучше чтоб число делилось на  ` + window.pairN;

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
				console.log(Number(chet), settings.clickCharge);
				window.pairN = settings.clickCharge;
				if (settings.clickCharge == 0) settings.clickCharge = 2;
				// window.pairN = settings.clickCharg;

				return Boolean(Number(chet) % settings.clickCharge == 0);
			},

			errorMessage: () => {
				console.log(window.pairN);
				if (window.pairN == 0) window.pairN = 2;
				return `Лучше чтоб число делилось на  ` + window.pairN;
			},
		},
	]);
}
{
	const element = document.querySelector('.select');
	const choices = new Choices(element, {
		searchEnabled: false,
		allowHTML: true,
		searchChoices: true,
		placeholder: true,
		itemSelectText: '',
	});
}
