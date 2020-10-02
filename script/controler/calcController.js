class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-Br'
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")

        this._currentDate;
        this.initialize()
        this.initButtonsEvents();
    }

    // Metodo que vai roda assim que inicia o programa
    initialize() {

        this.setdisplayDateTime();

        setInterval(() => {
            this.setdisplayDateTime();
        }, 1000)

    }

    // iniciar os botoes

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = 'ERROR';
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    isOperation(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)

    }

    calc() {
        let last = this._operation.pop()
        let result = eval(this._operation.join(""))

        this._operation = [result, last]
        this.setLastNumberToDisplay()

    }

    pushOperation(value) {
        this._operation.push(value)

        if (this._operation.length > 3) {

            this.calc()
        }
    }

    setLastNumberToDisplay() {
        let lastNumber;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (!this.isOperation(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        this.displayCalc = lastNumber
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperation(value)) {
                this.setLastOperation(value);

            } else if (isNaN(value)) {
                console.log(value)
            } else {
                this.pushOperation(value)
                this.setLastNumberToDisplay()
            }

        } else {

            if (this.isOperation(value)) {
                this.pushOperation(value)
            } else {

                let newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))

                this.setLastNumberToDisplay()
            }
        }


    }


    execBtn(value) {
        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation('+')
                break;
            case "igual":

                break;
            case "subtracao":
                this.addOperation('-')
                break;
            case "multiplicacao":
                this.addOperation('*')
                break;
            case "divisao":
                this.addOperation('/')
                break;
            case "porcento":
                this.addOperation('%')
            case 'ponto':
                this.addOperation('.')
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break
            default:
                setError()
                break;
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace('btn-', '')
                this.execBtn(textBtn)
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = 'pointer'
            });
        });


    }

    //-------------- get e set do da data

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }


    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._currentDate = value;
    }

    // manipulando o intervalo do tempo e data

    setdisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    //--------------_ get e set do atributo displayCalc
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }


}