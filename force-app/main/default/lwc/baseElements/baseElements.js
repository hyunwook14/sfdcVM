import { LightningElement, api, wire } from 'lwc';
// import { NavigationMixin, CurrentPageReference  } from 'lightning/navigation';
import {CustomBaseNav} from 'c/baseNav';

export default class BaseElements extends CustomBaseNav(LightningElement) {

    // @wire(CurrentPageReference)
    // pageRef;

    connectedCallback() {
        console.log('Base connectedCallback()');
        console.log(this.pageRef);
    }


    
}