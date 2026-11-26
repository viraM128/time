// Отримуємо елементи зі сторінки (робота з DOM)
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const startBtn = document.getElementById('start-continue');
const stopBtn = document.getElementById('stop');

// Змінні для зберігання часу та ідентифікатора інтервалу
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval = null; // null означає, що таймер зараз не йде

// Допоміжна функція для додавання нуля спереду (наприклад: 5 -> "05")
function formatTime(value) {
  return value < 10 ? '0' + value : value;
}

// Головна функція оновлення часу
function updateTimer() {
  seconds++; // Збільшуємо секунди

  if (seconds === 60) {
    seconds = 0;
    minutes++; // Якщо дійшли до 60 — скидаємо секунди і додаємо хвилину

    if (minutes === 60) {
      minutes = 0;
      hours++; // Якщо хвилин 60 — скидаємо їх і додаємо годину
    }
  }

  // Оновлюємо текст на сторінці
  secondsEl.textContent = formatTime(seconds);
  minutesEl.textContent = formatTime(minutes);
  hoursEl.textContent = formatTime(hours);
}

// Подія при натисканні на кнопку "Старт" / "Продовжити"
startBtn.addEventListener('click', () => {
  // Перевірка, щоб не запустити кілька таймерів одночасно при повторному кліку
  if (timerInterval !== null) return;

  // Запускаємо функцію updateTimer кожну 1000 мілісекунд (1 секунду)
  timerInterval = setInterval(updateTimer, 1000);

  // Змінюємо стилі кнопок згідно з умовою
  stopBtn.style.opacity = '0.5';
  startBtn.style.opacity = '1';
});

// Подія при натисканні на кнопку "Стоп"
stopBtn.addEventListener('click', () => {
  // Якщо таймер і так стоїть на паузі — нічого не робимо
  if (timerInterval === null) return;

  // Зупиняємо відлік часу
  clearInterval(timerInterval);
  timerInterval = null;

  // Змінюємо прозорість кнопок та текст на "Продовжити"
  startBtn.style.opacity = '0.5';
  stopBtn.style.opacity = '1';
  startBtn.textContent = 'Продовжити';
});
