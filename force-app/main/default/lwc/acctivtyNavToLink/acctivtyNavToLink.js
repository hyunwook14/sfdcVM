import { LightningElement, track } from 'lwc';

import { CustomBaseNav } from 'c/baseNav';

export default class AcctivtyNavToLink extends CustomBaseNav(LightningElement) {
    
    @track init = false;
    
    connectedCallback() {
        //한번 여기로 이동하면 다시 Connected Callback 호출 아되는걸로 보임
        console.log('AcctivtyNavToLink connectedCallback');
        this.init = true;
        this.nav();
    }

    renderedCallback() {
        console.log('AcctivtyNavToLink renderedCallback');
        console.log('AcctivtyNavToLink', this.pageRef);
        if(!this.init) {
            this.nav();
        }
        
    }

    disconnectedCallback() {
        console.log('AcctivtyNavToLink disconnectedCallback');
        this.init = false;
    }

    nav() {
        let movePageRef = this.pageRef.state?.c__pageRef;
        console.log(
            movePageRef
        );
        if(movePageRef) movePageRef = JSON.parse(movePageRef);

        if(this.pageRef.state?.c__IsBackgroundInfo) {
            if(!movePageRef.state) movePageRef.state = {};
            movePageRef.state.backgroundContext = `/lightning/r/${movePageRef.attributes.apiName}/${movePageRef.attributes.recordId}/view`
        }


        this.navigateToCustom(movePageRef, true);
        this.disconnectedCallback();
    }
    
}