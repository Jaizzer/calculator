// Access and save the calculator display divs.
let mainDisplay = document.querySelector('.main-display');
let secondDisplay = document.querySelector('.second-display');

// Initialize calculator values.
let currentOperator = '+';
let computedNumber = 0;
let nextOperator = '';
let nextNumber;

// Add functinoality to the decimal button so that the decimal point can be appended one time.
const decimalButton = document.querySelector('button#decimal-sign');
let decimalClickCount = 0;
decimalButton.addEventListener('click', function() {
    if (decimalClickCount === 0) {
        mainDisplay.textContent = mainDisplay.textContent + '.';
        decimalClickCount++;
    }
})

// Add functionality to number buttons so numbers are appended when pressed.
const numberButtons = Array.from(document.querySelectorAll('button.number'));
numberButtons.forEach(function(numberButton) {
    numberButton.addEventListener('click', function(event) {
        let pressedNumber = event.target.textContent;
        mainDisplay.textContent = mainDisplay.textContent + pressedNumber;
    });
})

// Add functionality to the delete button to delete a number from the current value input when pressed.
let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', function() {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
})

// Add functionality to the equal button to process and display the operation and operation results.
const equalButton = document.querySelector('button#equal-sign');
equalButton.addEventListener('click', function() {
    if (mainDisplay.textContent !== '' && secondDisplay.textContent !== '' && 
        secondDisplay.textContent.charAt(secondDisplay.textContent.length - 1) !== '=') {
            decimalClickCount = 0;
            nextNumber = parseFloat(mainDisplay.textContent);
            mainDisplay.textContent = '';

            if (operate(computedNumber, nextNumber, currentOperator) !== "undefined") {
                computedNumber = operate(computedNumber, nextNumber, currentOperator);
                secondDisplay.textContent =  `${secondDisplay.textContent} ${nextNumber} =`;
                mainDisplay.textContent = computedNumber;
    
                currentOperator = '+';  
                computedNumber = 0;
            }
    }
})

// Add functionality to the claer button to reset the entire calculator when pressed.
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

// Add functinality to the operator buttons to call the right operations when pressed.
const operatorButtons = document.querySelectorAll("button.operation");
operatorButtons.forEach(function(operatorButton) {
    operatorButton.addEventListener('click', function(event) {
        decimalClickCount = 0;
        nextOperator = event.target.textContent;
        if (mainDisplay.textContent !== '' || secondDisplay.textContent !== '' || nextOperator === '-') {
            if (mainDisplay.textContent !== '') {
                nextNumber = parseFloat(mainDisplay.textContent);
                mainDisplay.textContent = '';

                if (operate(computedNumber, nextNumber, currentOperator) !== "undefined") {
                    computedNumber = operate(computedNumber, nextNumber, currentOperator);
                }
            }
            secondDisplay.textContent = `${computedNumber} ${nextOperator}`;
            currentOperator = nextOperator;
        }
    })
})

// This function decides which operation to use.
function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                alert("You can't divide by zero!")
                return 'undefined';
            }
            return divide(a, b);
    }
}

// This function adds two numbers.
function add(a, b) {
    return a + b;
}

// This function subtracts two numbers.
function subtract(a, b) {
    return a - b;
}

// This function multiplies two numbers.
function multiply(a, b) {
    return a * b;
}

// This function divides two numbers.
function divide(a, b) {
    return a / b;
}