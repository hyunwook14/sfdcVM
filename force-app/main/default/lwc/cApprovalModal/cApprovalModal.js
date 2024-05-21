import { LightningElement, wire, api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import { CustomBaseNav } from 'c/baseNav';
import { closeScreenAction } from 'c/utils';
import { getRecord, notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import { RefreshEvent } from "lightning/refresh";
import apexCallToServer from '@salesforce/apex/CApprovalModalController.apexCallToServer';

export default class CApprovalModal extends CustomBaseNav(LightningModal)  {
    closeAction = closeScreenAction.bind(this);
    _recordId
    
    approverId;
    approverName;
    comments;
    @api objectApiName;
    @track isSpinner = false;
    

    @api 
    get recordId() {
        return this._recordId
    }
    set recordId(value) {
        this._recordId = value;
    }


    connectedCallback() {
        console.log('CApprovalModal');
        this.showSpinner();
        this.doInit();
    }

    doInit() {
        (async()=>{
            let targetId = 
            this.pageRef.type === 'standard__quickAction' ?
                this.pageRef.state.recordId : this.recordId;
            
            let result = await this._apexCallToServer({
                 methodName:'getProgressingApproval'
                ,targetId: targetId
            });
            
            if(result)  {
                this.approverName = result.response.progressingApproval.Actor.Name;
                this.approverId = result.response.progressingApproval.ActorId;
            }

            this.stopSpinner();
        })();
        
    }

    async _apexCallToServer(params) {
        return await apexCallToServer({params:params})
                        .then(result=>{return result;})
                        .catch(errors=>{console.info(errors)});
    }

    showSpinner() {
        this.isSpinner = true;
    }

    stopSpinner(turnOffMs) {
        setTimeout(()=> this.isSpinner=false, turnOffMs ? turnOffMs : 0);
    }

    handleCloseApproval() {
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

    handleChangeComments(event) {
        this.comments = event.target.value;
    }

    handleApproval() {
        console.log(`[${this.approverId}]${this.approverName}`);
        console.log(`Comments: ${this.comments}`);
        this.showSpinner();
        this._apexCallToServer({
            methodName:'approval'
           ,targetId: this.recordId
           ,comments: this.comments
           ,nextApproverId: this.approverId
       }).then(result=>{
            console.log(result);
            if(result) {
                
                
                setTimeout(()=>{notifyRecordUpdateAvailable([{recordId: this.recordId}]);  this.dispatchEvent(new RefreshEvent()); this.template.querySelector('c-custom-toast').showToast('Success!', '승인 하였습니다!', 'success'); this.closeAction();}, 5000);
            }
       });
    }
}