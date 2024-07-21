import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import { closeScreenAction, refreshEventFire, getIconURL } from 'c/utils';
import { CustomBaseNav } from 'c/baseNav';

import { notifyRecordUpdateAvailable, updateRecord } from 'lightning/uiRecordApi';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

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
        
        /**
         * 1. RecordType 변경할 필드 업데이트 후 pageReference 로 setTimout 으로 edti page로 이동 (UPlus 환경에선 안됨), 모바일 버튼도 필요
         * 2. RecordType 변경할 필드 업데이트 후 pageReference url 생성후 setTimeout 을 적용하여 강제적으로 edit로 이동, 모바일 버튼도 필요
         * 3. RecordType 을 default value로 setting 후 edit page 이동 => 권한없어서 x
         */

        const defaultValues = encodeDefaultFieldValues({
            Result__c : '결과'
          });

        let movePageRef = {
            "type":"standard__recordPage",
            "attributes":{
                "apiName":"AcctivityReport__c",
                "recordId":this.recordId,
                "actionName":"edit"

            }
            ,"state":{        
                "backgroundContext":`/lightning/r/AcctivityReport__c/${this.recordId}/view`
                ////3안
                // 'recordTypeId':'012dM00000241CTQAY', //recordType inactive..
                // 'defaultFieldValues': defaultValues,
            }
        };
        // this.navigateToCustom(movePageRef);
        ////recordTypeId=012dM000002419FQAQ
        
        await updateRecord({fields}).then(result=>{
            notifyRecordUpdateAvailable([{recordId: this.recordId}])
        //     //1.
        //     // setTimeout(()=>{
        //     //     this.navigateToCustom(movePageRef)
        //     //     console.log('개발환경에선 넘 잘됨..');
        //     //  //이거 왜 안될까? U+ 에서는 뒤에 BackGround Context 가 없어서 그런걸까..?
        //     // //trigger 및 apex 호출해서 그런걸 수도 있음
        //     // }, 3000);
        }).catch(errors=>{
            console.error(this.reduceErrors(errors));
        });
        // //2안
        const url = await this.generateToCustom(movePageRef);
        // console.info(url);
        setTimeout(()=>location.href = url, 2000);
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