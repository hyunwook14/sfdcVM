import { LightningElement } from 'lwc';

export default class Augmentor extends LightningElement {
    startCounter = 0;
    maximizeCounter = 1000000;
    
    handleStartChange(event) {
        this.startCounter = parseInt(event.target.value);
    }

    handleMaximizeCounter() {
        this.template.querySelector('c-numerator').maximizeCounter(this.maximizeCounter);
    }

    handleSetMaximizeCounter(event) {
        console.log('handleSetMaximizeCounter');
        this.maximizeCounter = parseInt(event.detail);
    }
}