class Calculator {
    constructor(txtPrevResultDisplay, txtCurrResultDisplay) {
        this.txtPrevResultDisplay = txtPrevResultDisplay;
        this.txtCurrResultDisplay = txtCurrResultDisplay;
        this.clearAll();
        this.updateDisplay();
    }

    clearAll() {
        this.txtPrevResult = '';
        this.txtCurrResult = '0';
        this.operation = undefined;
    }
    delete() {
        if (
            this.txtCurrResult.toString() === '0' ||
            this.txtCurrResult.length === 0
        )
            return (this.txtCurrResult = '0');
        this.txtCurrResult = this.txtCurrResult.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.txtCurrResult.includes('.')) return;
        if (this.txtCurrResult === '0') this.txtCurrResult = '';
        this.txtCurrResult = this.txtCurrResult.toString() + number.toString();
    }
    chooseOperation(operation) {
        // if (this.txtCurrResult === '') {
        //     return;
        //     // if (operation == '-') {
        //     //     // console.log('includes');
        //     //     return;
        //     // } else if (operation == '-' && !this.txtCurrResult.includes('-')) {
        //     //     this.txtCurrResult = '-';
        //     //     console.log('not includes');
        //     // }
        // }
        // if (this.txtPrevResult !== '') {
        //     this.calculate();
        // }
        this.operation = operation;
        this.txtPrevResult =
            this.txtPrevResult + this.txtCurrResult + this.operation;
        this.txtCurrResult = '';
    }
    calculate() {
        let calcValue = 0;
        const value = this.txtPrevResult + this.txtCurrResult;
        console.log(value);
        calcValue = eval(value);
        this.txtCurrResult = calcValue;
        this.operation = undefined;
        this.txtPrevResult = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
        // const floatNumber = parseFloat(number);
        // if (isNaN(floatNumber)) return '';
        // return floatNumber.toLocaleString('en');
    }
    updateDisplay() {
        this.txtCurrResultDisplay.innerHTML = this.getDisplayNumber(
            this.txtCurrResult,
        );
        if (this.operation != null) {
            this.txtPrevResultDisplay.innerHTML = this.getDisplayNumber(
                this.txtPrevResult,
            );
        } else {
            this.txtPrevResultDisplay.innerHTML = '';
        }
    }
}
const btnNumbers = document.querySelectorAll('[data-number]');
const btnOperands = document.querySelectorAll('[data-operand]');
const btnEquals = document.querySelector('[data-equals]');
const btnClearAll = document.querySelector('[data-clear-all]');
const btnDelete = document.querySelector('[data-delete]');
const txtPrevResultDisplay = document.querySelector('[data-prev-result]');
const txtCurrResultDisplay = document.querySelector('[data-curr-result]');

const calculator = new Calculator(txtPrevResultDisplay, txtCurrResultDisplay);

btnNumbers.forEach((number) => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    });
});

btnOperands.forEach((operand) => {
    operand.addEventListener('click', () => {
        calculator.chooseOperation(operand.innerText);
        calculator.updateDisplay();
    });
});

btnEquals.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

btnClearAll.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

btnDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});