"use strict"

const calculator = {
  currentValue: '',
  previousValue: '',
  operator: '',

  clearDisplay(){
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
  },

  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
  },

  appendNumber(number) {
    if (number === '.' && this.currentValue.includes('.')){
      return;
    } else { 
      this.currentValue += number;
    }
  },

  chooseOperation(operator) {
    if (this.currentValue === '' || this.currentValue === '.'){
      return;
    } else {
      this.operator = operator;
      this.previousValue = this.currentValue;
      this.currentValue = '';   
    }
  },

  calculate() {
    if (this.currentValue === ''){
      return;
    }
    if (this.previousValue !== ''){
      let result;
      let currentNumber = parseFloat(this.currentValue);
      let previousNumber = parseFloat(this.previousValue);


      if(currentNumber === 0 && this.operator === '/'){
        return;
      }

      if (this.operator === '/'){
        result = previousNumber / currentNumber;
      }

      if (this.operator === '-'){
        result = previousNumber - currentNumber;
      }

      if (this.operator === '+'){
        result = previousNumber + currentNumber;
      }

      if (this.operator === '*'){
        result = previousNumber * currentNumber;
      }

      this.currentValue = result.toFixed(2);
      this.previousValue = '';
      this.operator = '';      
    }
  },

  editToDisplay(number){
       let stringNumber = number;

    if (stringNumber.charAt(0) === '0' && !stringNumber.includes('.')){
      stringNumber = stringNumber.slice(1);
      return stringNumber;
    }

    if (stringNumber[0] === '.'){
      stringNumber = '0' + stringNumber;
      return stringNumber;
    }     

    return number;  
  },

  updateDisplay() {
    // this.computeToDisplay();
    // displayCurrentText.innerText = this.currentValue;
    displayCurrentText.innerText = this.editToDisplay(this.currentValue);
    displayOperationText.innerText = this.operator;
    displayPreviousText.innerText = this.previousValue;
  },
}

// DOM
const btnsNumbers = document.querySelectorAll('.js-btn-number');
const btnsOperant = document.querySelectorAll('.js-btn-operant');
const btnSum = document.querySelector('.js-btn-sum');
const btnClear = document.querySelector('.js-btn-clear');
const btnDel = document.querySelector('.js-btn-del');
const displayPreviousText = document.querySelector('.js-display__previous');
const displayOperationText = document.querySelector('.js-display__operant');
const displayCurrentText = document.querySelector('.js-display__current');

// Call events
btnsNumbers.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  })
})

btnClear.addEventListener('click', (e) => {
  calculator.clearDisplay();
  calculator.updateDisplay();
})

btnDel.addEventListener('click', (e) => {
  // calculator.computeToDisplay()
  calculator.delete();
  calculator.updateDisplay();
})

btnsOperant.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  })
})

btnSum.addEventListener('click', (e)=>{
  calculator.calculate();
  calculator.updateDisplay();
})

