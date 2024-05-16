import { api } from 'lwc';
import baseElements from 'c/baseElements';

export default class ExtendsExample extends baseElements {
    pageRef = this.pageRef;

    connectedCallback() {
        console.log('ExtendsExample connectedCallback()');
        console.log(this.pageRef);
    }

    moveToHome(event) {
        this.navigateToObjectHome('Account');
    }

    newTask(event) {
        this.navigateToCustom({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Task',
                actionName: 'new',
            },
        });
    }
}