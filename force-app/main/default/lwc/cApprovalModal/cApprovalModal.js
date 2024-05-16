import { LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CApprovalModal extends LightningModal  {

    handleClose() {
        this.close('close');
    }

}