import { LightningElement, wire } from 'lwc';
import LightningModal from 'lightning/modal';
import { NavigationMixin, CurrentPageReference  } from 'lightning/navigation';
import { CBaseNav } from 'c/baseNav';
import { closeScreenAction } from 'c/utils';

export default class CApprovalModal extends CBaseNav(LightningModal)  {
    closeAction = closeScreenAction.bind(this);

    @wire(CurrentPageReference)
    pageRef;

    connectedCallback() {
        console.log(this.pageRef);
    }

    handleOkay() {
        // this.close('okay');
        
        closeScreenAction.call(this);
        // this.closeAction();
    }

    handleShowToast() {
        this.template.querySelector('c-custom-toast').showToast('Success!', 'Record {0} created! See it {1}!', 'success', 'dismissible',[
            'Salesforce',
            {
                url: 'http://www.salesforce.com/',
                label: 'here',
            },
        ]);
    }

    handleMoveHome() {
        console.log('handleMoveHome');
    }
}