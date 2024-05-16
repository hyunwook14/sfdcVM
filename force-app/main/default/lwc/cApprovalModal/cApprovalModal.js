import { LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';
import { closeScreenAction } from 'c/utils';

export default class CApprovalModal extends LightningModal  {
    
    handleOkay() {
        this.close('okay');
        
        closeScreenAction(this);
    }
}