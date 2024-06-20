import { LightningElement, api, track } from 'lwc';

export default class CustomLookUpOption extends LightningElement {

    @api displayName = '';
    @api datum       = {};
    @track _displayNameList = [];

    connectedCallback() {
        let displayStrList = this.displayName.split(',');
        displayStrList.forEach(element => {
            for(let field in this.datum) {
                if(element.toLowerCase() === field.toLowerCase())
                this._displayNameList.push(this.datum[field]);
            }
        });
    }
}