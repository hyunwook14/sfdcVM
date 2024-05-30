import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import { closeScreenAction, refreshEventFire } from 'c/utils';
import { CustomBaseNav } from 'c/baseNav';

import apexCallToServer from '@salesforce/apex/CApprovalModalController.apexCallToServer';

export default class CApprovalRequestModal extends CustomBaseNav(LightningModal) {

    _recordId;
    @api objectApiName;
    @track isSpinner = false;

    approvalTypeOptions = [{label:'결재자',value:'결재자'}];
    approvalValue = '';
    params = {methodName:''};

    @api 
    get recordId() {
        return this._recordId
    }
    set recordId(value) {
        this._recordId = value;
    }

    /* lwc lifeCycle Method [s] */
    connectedCallback() {
        console.log('CApprovalRequestModal');
        this.showSpinner();
        this.doInit();
    }
    /* lwc lifeCycle Method [e] */

    /* js Method [s] */

    deepClone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    getParams() {
        // 단순 속성 할당, 얕은 복사로 참조 값을 복사함
        return Object.assign({}, this.params);
    }

    doInit() {
        let params = this.getParams();
        params.methodName = 'getRequestInitInfo';
        
        this._apexCallToServer(params).then(result=>{
            this.approvalTypeOptions = result.response.approvalTypeOptions;
        });

        (async()=>{
            let targetId = 
            this.pageRef.type === 'standard__quickAction' ?
                this.pageRef.state.recordId : this.recordId;
            
            // let result = await this._apexCallToServer({
            //      methodName:'getProgressingApproval'
            //     ,targetId: targetId
            // });
            
            // if(result)  {
            //     this.approverName = result.response.progressingApproval.Actor.Name;
            //     this.approverId = result.response.progressingApproval.ActorId;
            // }

            this.stopSpinner();
        })();
        
    }

    /* js Method [e] */

    /* Spinner Method [s] */
    showSpinner() {
        this.isSpinner = true;
    }

    stopSpinner(turnOffMs) {
        setTimeout(()=> this.isSpinner=false, turnOffMs ? turnOffMs : 0);
    }
    /* Spinner Method [e] */

    /* from Html to JS Event [s] */
    handleCloseApprovalRequest() {
        closeScreenAction.call(this);
    }

    handleRequest() {

    }

    handleApprovalTypeChange() {

    }

    /* from Html to JS Event [e] */


    /* From js To Apex [s] */
    async _apexCallToServer(params) {
        return await apexCallToServer({params:params})
                        .then(result=>{return result;})
                        .catch(errors=>{console.info(errors)});
    }
    /* From js To Apex [e] */
}