import { LightningElement } from 'lwc';

export default class Controls extends LightningElement {
    factors = [0,2,3,4,5,6];
    maxFactors = [10, 100, 1000, 10000, 100000, 1000000];

    handleAdd() {
        //부모 요소로 이벤트 전달 this.dispatchEvent(new CustomEvent('이벤트명'));
        this.dispatchEvent(new CustomEvent('add'));
    }

    handleSubtract() {
        this.dispatchEvent(new CustomEvent('subtract'));
    }

    handleMultiply(event) {
        console.log('handleMultiply');
        const factor = event.target.dataset.factor;
        //부모 요소로 이벤트 전달 this.dispatchEvent(new CustomEvent('이벤트명', Obj));
        this.dispatchEvent(new CustomEvent('multiply', {
            detail: factor
        }));
    }

    handleMaximizeChange(event) {
        console.log('handleMaximizeChange');
        const factor = event.target.dataset.factor;
        this.dispatchEvent(new CustomEvent('setmax', {
            detail: factor
            ,bubbles:true
            ,composed:true //LWC 에서 조부모까지 이벤트 전송
        }));
    }
}