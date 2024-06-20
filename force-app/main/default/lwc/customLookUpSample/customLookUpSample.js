import { LightningElement } from 'lwc';

export default class CustomLookUpSample extends LightningElement {

    handleSelected(event) {
        console.log(structuredClone(event.detail));
    }
}