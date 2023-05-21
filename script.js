let mainDisplay = document.querySelector('.main-display');
let secondDisplay = document.querySelector('.second-display');

const decimalButton = document.querySelector('button#decimal-sign');
let decimalClickCount = 0;

const numberButtons = Array.from(document.querySelectorAll('button.number'));

numberButtons.forEach(function(numberButton) {
    numberButton.addEventListener('click', function(event) {
        let pressedNumber = event.target.textContent;
        mainDisplay.textContent = mainDisplay.textContent + pressedNumber;
    });
})

let deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', function() {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
})

const operatorButtons = document.querySelectorAll("button.operation");
let currentOperator = '+';
let computedNumber = 0;
let nextOperator = '';
let nextNumber;

operatorButtons.forEach(function(operatorButton) {
    operatorButton.addEventListener('click', function(event) {
        decimalClickCount = 0;
        nextOperator = event.target.textContent;
        if (mainDisplay.textContent !== '' || secondDisplay.textContent !== '') {
            if (mainDisplay.textContent !== '') {
                nextNumber = parseFloat(mainDisplay.textContent);
                mainDisplay.textContent = '';
                computedNumber = operate(computedNumber, nextNumber, currentOperator);
            }
            secondDisplay.textContent =  `${computedNumber} ${nextOperator}`;
            currentOperator = nextOperator;
        }
    })
})

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const equalButton = document.querySelector('button#equal-sign');

equalButton.addEventListener('click', function() {
    if (mainDisplay.textContent !== '' && secondDisplay.textContent !== '') {
       decimalClickCount = 0;
       nextNumber = parseFloat(mainDisplay.textContent);
       mainDisplay.textContent = '';
       computedNumber = operate(computedNumber, nextNumber, currentOperator);
       secondDisplay.textContent =  `${secondDisplay.textContent} ${nextNumber} =`;
       mainDisplay.textContent = computedNumber;

       currentOperator = '+';  
       computedNumber = 0;
    }
})

const clearButton = document.querySelector('button#clear');

clearButton.addEventListener('click', function() {
    currentOperator = '+';  
    computedNumber = 0;
    mainDisplay.textContent = '';
    secondDisplay.textContent = '';
    nextNumber = 0;
    nextOperator = '';
    decimalClickCount = 0;
})