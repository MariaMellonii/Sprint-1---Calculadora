const elements = {
    btnNumber: document.querySelectorAll(".number"),
    btnSum: document.querySelector("#sum"),
    btnMinus: document.querySelector("#minus"),
    btnMultiple: document.querySelector("#multiple"),
    btnDivide: document.querySelector("#divide"),
    btnEquals: document.querySelector("#equals"),
    btnCE: document.querySelector("#clear-entry"),
    btnClear: document.querySelector("#clear"),
    btnComma: document.querySelector("#comma"),
    btnPercent: document.querySelector("#percent"),
    screen: document.querySelector("#result"),
    calcNumbers: document.querySelector("#calc-numbers"),
}

const calculator = {
    numbers: "",
    arrayOfNumber: [],
    operatorExecute: false,
    currentOperation: "",
    percentMode: false,

    displayOnScreenValue(value) {
        elements.screen.textContent += value;
    },

    displayOnScreenResult(result) {
        elements.screen.textContent = result;
    },

    displayCalculatedNumbers(number1, operator, number2) {
        elements.calcNumbers.textContent = `${number1}${operator}${number2}`;
    },

    saveNumbersToArray() {
        const num = parseFloat(this.numbers.replace(",", "."));
        if (!isNaN(num)) {
            if (!this.operatorExecute) {
                this.arrayOfNumber[0] = num;
            } else {
                this.arrayOfNumber[1] = num;
            }
        }
    },

    getNumber(number) {
        if (number === "," && this.numbers.includes(",")) return; 
        this.numbers += number;
        this.displayOnScreenValue(number);
    },

    deleteCapturedNumbers() {
        this.numbers = "";
    },

    deleteElementOfArray(index, elements) {
        this.arrayOfNumber.splice(index, elements);
    },

    clearScreen() {
        elements.calcNumbers.textContent = "";
        elements.screen.textContent = "";
    },

    clearEntry() {
        this.deleteCapturedNumbers(); 
        elements.screen.textContent = elements.screen.textContent.slice(0, -1);
        if (!elements.screen.textContent) {
            this.deleteElementOfArray(0, 1);
        }
        this.operatorExecute = false;
        this.currentOperation = "";
    },

    clearAll() {
        this.deleteElementOfArray(0, this.arrayOfNumber.length);
        this.clearScreen();
        this.deleteCapturedNumbers();
        this.operatorExecute = false;
        this.currentOperation = "";
        this.percentMode = false; 
    },

    applyPercentage(value) {
        return value / 100;
    },

    result(operation) {
        switch (operation) {
            case "+":
                this.arrayOfNumber[0] = this.arrayOfNumber.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                break;
            case "-":
                this.arrayOfNumber[0] = this.arrayOfNumber.reduce((accumulator, currentValue) => accumulator - currentValue);
                break;
            case "*":
                this.arrayOfNumber[0] = this.arrayOfNumber.reduce((accumulator, currentValue) => accumulator * currentValue);
                break;
            case "/":
                this.arrayOfNumber[0] = this.arrayOfNumber.reduce((accumulator, currentValue) => accumulator / currentValue);
                break;
        }
    },

    sum() {
        this.saveNumbersToArray();
        if (this.operatorExecute) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], "+", this.arrayOfNumber[1]);
            this.result("+");
            this.displayOnScreenResult(this.arrayOfNumber[0]);
        } else {
            this.operatorExecute = true;
        }
        this.currentOperation = "+";
        this.deleteCapturedNumbers();
        this.displayOnScreenValue("+");
    },

    minus() {
        this.saveNumbersToArray();
        if (this.operatorExecute) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], "-", this.arrayOfNumber[1]);
            this.result("-");
            this.displayOnScreenResult(this.arrayOfNumber[0]);
        } else {
            this.operatorExecute = true;
        }
        this.currentOperation = "-";
        this.deleteCapturedNumbers();
        this.displayOnScreenValue("-");
    },

    multiply() {
        this.saveNumbersToArray();
        if (this.operatorExecute) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], "*", this.arrayOfNumber[1]);
            this.result("*");
            this.displayOnScreenResult(this.arrayOfNumber[0]);
        } else {
            this.operatorExecute = true;
        }
        this.currentOperation = "*";
        this.deleteCapturedNumbers();
        this.displayOnScreenValue("*");
    },

    divide() {
        this.saveNumbersToArray();
        if (this.operatorExecute) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], "/", this.arrayOfNumber[1]);
            this.result("/");
            this.displayOnScreenResult(this.arrayOfNumber[0]);
        } else {
            this.operatorExecute = true;
        }
        this.currentOperation = "/";
        this.deleteCapturedNumbers();
        this.displayOnScreenValue("/");
    },

    percentage() {
        this.percentMode = true;
        this.saveNumbersToArray();
        this.displayOnScreenValue("%");
    },

    equals() {
        this.saveNumbersToArray();
        if (this.percentMode) {
           
            if (this.arrayOfNumber.length === 2) {
                this.arrayOfNumber[1] = this.applyPercentage(this.arrayOfNumber[0]) * this.arrayOfNumber[1];
            } else if (this.arrayOfNumber.length === 1) {
                this.arrayOfNumber[0] = this.applyPercentage(this.arrayOfNumber[0]);
            }
            this.percentMode = false;
        }

        if (this.arrayOfNumber.length === 2) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], this.currentOperation, this.arrayOfNumber[1]);
            this.result(this.currentOperation);
            this.displayOnScreenResult(this.arrayOfNumber[0]);
        }
        this.operatorExecute = false;
        this.deleteCapturedNumbers();
        if (!this.operatorExecute) {
            this.deleteElementOfArray(1, 1);
        }
    }
}

const App = {
    init() {
        elements.btnNumber.forEach(number => {
            number.addEventListener("click", calculator.getNumber.bind(calculator, number.value));
        });

        elements.btnSum.addEventListener("click", calculator.sum.bind(calculator));
        elements.btnMinus.addEventListener("click", calculator.minus.bind(calculator));
        elements.btnMultiple.addEventListener("click", calculator.multiply.bind(calculator));
        elements.btnDivide.addEventListener("click", calculator.divide.bind(calculator));
        elements.btnEquals.addEventListener("click", calculator.equals.bind(calculator));
        elements.btnCE.addEventListener("click", calculator.clearEntry.bind(calculator));
        elements.btnClear.addEventListener("click", calculator.clearAll.bind(calculator));
        elements.btnComma.addEventListener("click", calculator.getNumber.bind(calculator, ","));
        elements.btnPercent.addEventListener("click", calculator.percentage.bind(calculator));
    },
}

App.init();
