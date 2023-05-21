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
        // Add leading zero if the decimal point do not precede a number.
        if (mainDisplay.textContent === '') {
            mainDisplay.textContent = '0.'
        }
        // Do not add leading zero if the decimal point precedes a number.
        else {
            mainDisplay.textContent = mainDisplay.textContent + '.';
        }
        decimalClickCount++;
    }
})

// Add functionality to number buttons so numbers are appended when pressed.
const numberButtons = Array.from(document.querySelectorAll('button.number'));
numberButtons.forEach(function(numberButton) {
    numberButton.addEventListener('click', function(event) {
        mainDisplay.textContent = mainDisplay.textContent + event.target.textContent;
    });
})

// Add functionality to the delete button to delete a number from the current value input when pressed.
let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', function() {
    // Get all text content except the last one that is supposed to be deleted.
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
})

// Add functionality to the equal button to process and display the operation and operation results.
const equalButton = document.querySelector('button#equal-sign');
equalButton.addEventListener('click', function() {
    // Check if there are enough inputs to process the operation and if 'equal' is still not pressed before.
    if (mainDisplay.textContent !== '' && secondDisplay.textContent !== '' && 
        secondDisplay.textContent.charAt(secondDisplay.textContent.length - 1) !== '=') {

            // Reset decimal click count.
            decimalClickCount = 0;
            
            // Obtain the string from the display and convert it into number.
            nextNumber = parseFloat(mainDisplay.textContent);

            // Reset the main display.
            mainDisplay.textContent = '';

            // Check first whether the operation will result to undefined values before executing operation.
            if (operate(computedNumber, nextNumber, currentOperator) !== "undefined") {
                computedNumber = operate(computedNumber, nextNumber, currentOperator);
                secondDisplay.textContent =  `${secondDisplay.textContent} ${nextNumber} =`;
                mainDisplay.textContent = computedNumber.toFixed(3);
    
                currentOperator = '+';  
                computedNumber = 0;
            }
    }
})

// Add functionality to the claer button to reset the entire calculator when pressed.
const clearButton = document.querySelector('button#clear');
clearButton.addEventListener('click', function() {
    // Reset everything.
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

        // Reset decimal click count.
        decimalClickCount = 0;
        
        // Save the next operator the user pressed.
        nextOperator = event.target.textContent;

        // Check whether there are numbers to be operated upon before adding operator sign, unless the sign is 'minus' which can be used as unary operator.
        if (mainDisplay.textContent !== '' || secondDisplay.textContent !== '' || nextOperator === '-') {
            if (mainDisplay.textContent !== '') {

                // Get the string from the main display and convert it into number.
                nextNumber = parseFloat(mainDisplay.textContent);

                // Reset main display.
                mainDisplay.textContent = '';

                // Check first whether the operation to will result to undefined values.
                if (operate(computedNumber, nextNumber, currentOperator) !== "undefined") {
                    computedNumber = operate(computedNumber, nextNumber, currentOperator);
                }
            }

            // Display the current operation to be worked upon.
            secondDisplay.textContent = `${computedNumber} ${nextOperator}`;

            // Set the last pressed operator to the current operator.
            currentOperator = nextOperator;
        }
    })
})

// This function decides which operation to use.
function operate(a, b, operator) {
    switch (operator) {
        // Addition
        case "+":
            return add(a, b);
        // Subtraction
        case "-":
            return subtract(a, b);
        // Multiplication
        case "×":
            return multiply(a, b);
        // Division.
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