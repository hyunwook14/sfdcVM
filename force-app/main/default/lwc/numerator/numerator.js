import { LightningElement, api } from 'lwc';

export default class Numerator extends LightningElement {
    _currentCount = 0;
    priorCount = 0;
    @api
    get counter() {
      return this._currentCount;
    }
    set counter(value) {
      this.priorCount = this._currentCount;
      this._currentCount = value;
    }

    handleIncrement() {
        this.counter++;
    }

    handleDecrement() {
        this.counter--;
    }

    handleMultiply(event) {
        const factor = event.detail;
        this.counter *= factor;
        this.dispatchEvent(new CustomEvent('multiply', {
            bubbles: true
            ,detail: factor
        }));
    }

    @api
    maximizeCounter(counter) {
        let maximizeCounter = counter ? counter : 1000000;
        this.counter += maximizeCounter;
    }

}