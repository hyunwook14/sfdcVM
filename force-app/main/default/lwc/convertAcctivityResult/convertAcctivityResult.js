import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import { closeScreenAction, refreshEventFire, getIconURL } from 'c/utils';
import { CustomBaseNav } from 'c/baseNav';

import { notifyRecordUpdateAvailable, updateRecord } from 'lightning/uiRecordApi';


export default class ConvertAcctivityResult extends CustomBaseNav(LightningModal) {
    
    @api recordId;
    @track isSpinner = false;

    connectedCallback() {
        this.isQuickAction = this.pageRef.type === 'standard__quickAction';
        
        console.log('pageRef');
        console.log(JSON.stringify(this.pageRef));
        // this.deepClone(this.pageRef);
        
        this.showSpinner();
        this.doInit();
    }

    doInit() {

        (async()=>{
            
            let targetId = this.isQuickAction ? this.pageRef.state.recordId : this.recordId;
            this.recordId = targetId;

            this.stopSpinner();
        })();
        
    }

    disconnectedCallback() {

    }

    errorCallback(error, stack) {
        console.info('error:: ');
        console.log(structuredClone(error));
        console.log(stack);
    }

    deepClone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    showSpinner() {
        this.isSpinner = true;
    }

    stopSpinner(turnOffMs) {
        setTimeout(()=> this.isSpinner=false, turnOffMs ? turnOffMs : 0);
    }

    handleClose(event) {
        closeScreenAction.call(this);
    }

    async handleOkay() {
        this.showSpinner();

        const fields = {
            Id : this.recordId
            ,Result__c : '결과'
        };
        

        let movePageRef = {
            "type":"standard__recordPage",
            "attributes":{
                "apiName":"AcctivityReport__c",
                "recordId":this.recordId,
                "actionName":"edit"

            }
            // ,"state":{
            //     // "objectApiName":null
            //     "context":"RECORD_DETAIL",
            //     //"recordId":"a03dM000003goebQAA",
            //     "backgroundContext":`/lightning/r/AcctivityReport__c/${this.recordId}/view`
            // }
        };
        
        await updateRecord({fields}).then(result=>{
            notifyRecordUpdateAvailable([{recordId: this.recordId}])
            // setTimeout(()=>{
            //     this.navigateToCustom(movePageRef)
            //     console.log('개발환경에선 넘 잘됨..');
            //  //이거 왜 안될까? U+ 에서는 뒤에 BackGround Context 가 없어서 그런걸까..?
            // //trigger 및 apex 호출해서 그런걸 수도 있음
            // }, 3000);
        }).catch(errors=>{
            console.error(this.reduceErrors(errors));
        });
        //recordTypeId=012dM000002419FQAQ
        const url = await this.generateToCustom(
        {
            "type":"standard__recordPage",
            "attributes":{
                "apiName":"AcctivityReport__c",
                "recordId":this.recordId,
                "actionName":"edit"
            }
            ,"state":{
                "backgroundContext":`/lightning/r/AcctivityReport__c/${this.recordId}/view`
            }
        });

        console.info(url);
        location.href = url;

        //console.log('url 로 강제 이동');
        //2안도 되긴함
        //모바일에서도 되는지 확인 필요..
        //모바일에서도 정상 작동
        //LWC 에서 제공하는 URL 을 만들때 NaviagationMinMax와 PagerReference 이용하여 url 을 만들어서 정상적으로 동작하는것으로 보임
        //https://dkbmc-1ed-dev-ed.develop.lightning.force.com/lightning/r/AcctivityReport__c/a03dM000003goebQAA/edit?count=1&backgroundContext=%2Flightning%2Fr%2FAcctivityReport__c%2Fa03dM000003goebQAA%2Fview%3Fuid%3D172144126176519337
    }

    reduceErrors(errors) {
        if (!Array.isArray(errors)) {
            errors = [errors];
        }
    
        return (
            errors
                // Remove null/undefined items
                .filter((error) => !!error)
                // Extract an error message
                .map((error) => {
                    // UI API read errors
                    if (Array.isArray(error.body)) {
                        return error.body.map((e) => e.message);
                    }
                    // Page level errors
                    else if (
                        error?.body?.pageErrors &&
                        error.body.pageErrors.length > 0
                    ) {
                        return error.body.pageErrors.map((e) => e.message);
                    }
                    // Field level errors
                    else if (
                        error?.body?.fieldErrors &&
                        Object.keys(error.body.fieldErrors).length > 0
                    ) {
                        const fieldErrors = [];
                        Object.values(error.body.fieldErrors).forEach(
                            (errorArray) => {
                                fieldErrors.push(
                                    ...errorArray.map((e) => e.message)
                                );
                            }
                        );
                        return fieldErrors;
                    }
                    // UI API DML page level errors
                    else if (
                        error?.body?.output?.errors &&
                        error.body.output.errors.length > 0
                    ) {
                        return error.body.output.errors.map((e) => e.message);
                    }
                    // UI API DML field level errors
                    else if (
                        error?.body?.output?.fieldErrors &&
                        Object.keys(error.body.output.fieldErrors).length > 0
                    ) {
                        const fieldErrors = [];
                        Object.values(error.body.output.fieldErrors).forEach(
                            (errorArray) => {
                                fieldErrors.push(
                                    ...errorArray.map((e) => e.message)
                                );
                            }
                        );
                        return fieldErrors;
                    }
                    // UI API DML, Apex and network errors
                    else if (error.body && typeof error.body.message === 'string') {
                        return error.body.message;
                    }
                    // JS errors
                    else if (typeof error.message === 'string') {
                        return error.message;
                    }
                    // Unknown error shape so try HTTP status text
                    return error.statusText;
                })
                // Flatten
                .reduce((prev, curr) => prev.concat(curr), [])
                // Remove empty strings
                .filter((message) => !!message)
        );
    }
}