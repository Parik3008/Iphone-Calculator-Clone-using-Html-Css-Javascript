let display = document.getElementById('display');
let currentValue = '0';
let operatorValue = '';
let firstValue = '';
let isOperatorPressed = false;

function clearDisplay() {
    currentValue = '0';
    operatorValue = '';
    firstValue = '';
    isOperatorPressed = false;
    updateDisplay();
}

function toggleSign() {
    if (currentValue !== '0') {
        currentValue = (parseFloat(currentValue) * -1).toString();
        updateDisplay();
    }
}

function percentage() {
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
}

function operator(op) {
    if (isOperatorPressed) {
        calculate();
    }
    firstValue = currentValue;
    operatorValue = op;
    isOperatorPressed = true;
    currentValue = '0';
}

function appendNumber(num) {
    if (currentValue === '0' && num !== '.') {
        currentValue = num.toString();
    } else {
        currentValue += num.toString();
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentValue.length > 10 ? parseFloat(currentValue).toPrecision(5) : currentValue;
}

function calculate() {
    if (operatorValue && isOperatorPressed) {
        let result = 0;
        let num1 = parseFloat(firstValue);
        let num2 = parseFloat(currentValue);

        switch (operatorValue) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }

        currentValue = result.toString();
        operatorValue = '';
        firstValue = '';
        isOperatorPressed = false;
        updateDisplay();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key <= 9) {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        operator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        currentValue = currentValue.slice(0, -1) || '0';
        updateDisplay();
    } else if (event.key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
