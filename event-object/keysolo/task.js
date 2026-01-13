/* Сделано:
1. Основное задание - соло на клавиатуре
2. Повышенный уровень сложности №1 - таймер
3. Повышенный уровень сложности №3 - смешанные фразы
*/

/* Маппинг */
const KEY_TO_SYMBOLS = {
  /* Буквы */
  'KeyQ': { en: 'q', ru: 'й' }, 'KeyW': { en: 'w', ru: 'ц' },
  'KeyE': { en: 'e', ru: 'у' }, 'KeyR': { en: 'r', ru: 'к' },
  'KeyT': { en: 't', ru: 'е' }, 'KeyY': { en: 'y', ru: 'н' },
  'KeyU': { en: 'u', ru: 'г' }, 'KeyI': { en: 'i', ru: 'ш' },
  'KeyO': { en: 'o', ru: 'щ' }, 'KeyP': { en: 'p', ru: 'з' },
  'KeyA': { en: 'a', ru: 'ф' }, 'KeyS': { en: 's', ru: 'ы' },
  'KeyD': { en: 'd', ru: 'в' }, 'KeyF': { en: 'f', ru: 'а' },
  'KeyG': { en: 'g', ru: 'п' }, 'KeyH': { en: 'h', ru: 'р' },
  'KeyJ': { en: 'j', ru: 'о' }, 'KeyK': { en: 'k', ru: 'л' },
  'KeyL': { en: 'l', ru: 'д' }, 'KeyZ': { en: 'z', ru: 'я' },
  'KeyX': { en: 'x', ru: 'ч' }, 'KeyC': { en: 'c', ru: 'с' },
  'KeyV': { en: 'v', ru: 'м' }, 'KeyB': { en: 'b', ru: 'и' },
  'KeyN': { en: 'n', ru: 'т' }, 'KeyM': { en: 'm', ru: 'ь' },

  /* Цифры (верхний ряд) */
  'Digit1': { en: '1', ru: '1' }, 'Digit2': { en: '2', ru: '2' },
  'Digit3': { en: '3', ru: '3' }, 'Digit4': { en: '4', ru: '4' },
  'Digit5': { en: '5', ru: '5' }, 'Digit6': { en: '6', ru: '6' },
  'Digit7': { en: '7', ru: '7' }, 'Digit8': { en: '8', ru: '8' },
  'Digit9': { en: '9', ru: '9' }, 'Digit0': { en: '0', ru: '0' },

  /* Спецсимволы */
  'BracketLeft': { en: '[', ru: 'х' }, 'BracketRight': { en: ']', ru: 'ъ' },
  'Semicolon': { en: ';', ru: 'ж' }, 'Quote': { en: "'", ru: 'э' },
  'Backquote': { en: '`', ru: 'ё' }, 'Backslash': { en: '\\', ru: '\\' },
  'Comma': { en: ',', ru: 'б' }, 'Period': { en: '.', ru: 'ю' },
  'Slash': { en: '/', ru: '.' }, 'Equal': { en: '=', ru: '=' },
  'Minus': { en: '-', ru: '-' }, 'Space': { en: ' ', ru: ' ' }
};

function getCharLanguage(char) {
  const lowerChar = char.toLowerCase();
  if (/[а-яё]/.test(lowerChar)) return 'ru';
  if (/[a-z]/.test(lowerChar)) return 'en';
  return 'other';
}

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');
    this.timerId = null;
    this.timeLeft = 0;

    this.reset();

    this.registerEvents();
  }

  reset() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.timerElement.textContent = 10;
  }

  /* Соло на клавиатуре + смешанные фразы */
  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода символа вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    document.addEventListener('keyup', (event) => {
      const expectedChar = this.currentSymbol.textContent;
      const expectedLang = getCharLanguage(expectedChar.toLowerCase());
      const physicalKey = event.code;

      if (physicalKey === 'Space') {
        if (expectedChar === ' ') {
          this.success();
        } else {
          this.fail();
        }
        return;
      }

      if (KEY_TO_SYMBOLS[physicalKey]) {
        const targetSymbol = KEY_TO_SYMBOLS[physicalKey][expectedLang] || KEY_TO_SYMBOLS[physicalKey]['en'];

        if (expectedChar.toLowerCase() === targetSymbol.toLowerCase()) {
          this.success();
        } else {
          this.fail();
        }
      } else if (event.key.length === 1) {
        if (expectedChar.toLowerCase() === event.key.toLowerCase()) {
          this.success();
        } else {
          this.fail();
        }
      }
    });
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.startTimer();
  }

  /* Таймер */
  startTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.timeLeft = 10;
    this.timerElement.textContent = this.timeLeft;

    this.timerId = setInterval(() => {
      this.timeLeft--;
      this.timerElement.textContent = this.timeLeft;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.fail();
      }
    }, 1000);
  }

  getWord() {
    const words = [
          'bob Дилан',
          'картина awesome висит',
          'netology источник знаний',
          'hello мир',
          'kitty кот',
          'rock звезда',
          'youtube',
          'popcorn',
          'cinema',
          'love',
          'javascript'
        ],
        index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
        .map(
            (s, i) =>
                `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
        )
        .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))
