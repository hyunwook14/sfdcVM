import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
    @api label;
    @api icon;
    handleButton(event) {
    //   debugger
      this.dispatchEvent(new CustomEvent('buttonclick',{
        bubbles: true
      }));
    }
}