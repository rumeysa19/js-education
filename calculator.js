// calculator.js

// Ekran ve butonları seçiyoruz
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

// Hesaplama için gerekli değişkenler
let currentInput = '0';   // Şu an ekranda görünen sayı
let firstValue = null;    // İlk girilen sayı
let operator = null;      // Seçilen işlem (+, -, *, /)
let waitingForSecondValue = false; // İkinci sayı giriliyor mu?

// Rakam ve nokta butonlarına tıklanınca ekrana yaz
function inputNumber(num) {
    if (waitingForSecondValue) {
        currentInput = num;
        waitingForSecondValue = false;
    } else {
        // Eğer ekranda 0 varsa, yeni rakamla değiştir
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateScreen();
}

// Ekrandaki sayıyı güncelle
function updateScreen() {
    screen.textContent = currentInput;
}

// İşlem butonuna tıklanınca
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, inputValue, operator);
        currentInput = String(result);
        firstValue = result;
        updateScreen();
    }

    operator = nextOperator;
    waitingForSecondValue = true;
}

// Hesaplama işlemini yapar
function calculate(first, second, operator) {
    if (operator === 'add') return first + second;
    if (operator === 'subtract') return first - second;
    if (operator === 'multiply') return first * second;
    if (operator === 'divide') return second !== 0 ? first / second : 'Hata';
    return second;
}

// Temizle (C) butonu
function clearAll() {
    currentInput = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateScreen();
}

// Geri sil (⌫) butonu
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateScreen();
}

// Tüm butonlara tıklama olayı ekle
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.number !== undefined) {
            inputNumber(button.dataset.number);
        } else if (button.dataset.action) {
            switch (button.dataset.action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    handleOperator(button.dataset.action);
                    break;
                case 'equals':
                    handleOperator(null);
                    firstValue = null;
                    operator = null;
                    waitingForSecondValue = false;
                    break;
                case 'clear':
                    clearAll();
                    break;
                case 'backspace':
                    backspace();
                    break;
            }
        }
    });
});

// Sayfa yüklendiğinde ekranı sıfırla
updateScreen();
