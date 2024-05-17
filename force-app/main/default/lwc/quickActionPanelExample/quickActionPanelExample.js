import { LightningElement } from 'lwc';
import { closeScreenAction } from 'c/utils';

export default class QuickActionPanelExample extends LightningElement {
    
    handleClose() {
        closeScreenAction.call(this);
        
    }
}