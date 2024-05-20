import { LightningElement, wire } from 'lwc';
import LightningModal from 'lightning/modal';

// import { NavigationMixin } from 'lightning/navigation';
import { CustomBaseNav } from 'c/baseNav';
import { closeScreenAction } from 'c/utils';

export default class CApprovalModal extends CustomBaseNav(LightningModal)  {
    closeAction = closeScreenAction.bind(this);

    connectedCallback() {
        console.log('CApprovalModal');
    }

    handleOkay() {
        // this.close('okay');
        
        closeScreenAction.call(this);
        // this.closeAction();
    }

    handleShowToast() {
        // this.template.querySelector('c-custom-toast').showToast('Success!', 'Record {0} created! See it {1}!', 'success', 'sticky',[
        //     'Salesforce',
        //     {
        //         url: 'http://www.salesforce.com/',
        //         label: 'here',
        //     },
        // ]);

        setTimeout(()=>{this.template.querySelector('c-custom-toast').customShowToast()}, 1000);
    }

    async handleMoveHome() {
        console.log('handleMoveHome');
        
        let result = await this.generateToCustom({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Event',
                actionName: 'new',
            },
        });

        console.log(result);
        
        this.navigateToCustom({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Event',
                actionName: 'new',
            },
        });
    }
}