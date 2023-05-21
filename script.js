let mainDisplay = document.querySelector('.main-display');

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
let computed = 0;