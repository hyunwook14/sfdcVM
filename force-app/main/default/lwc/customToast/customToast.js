import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomToast extends LightningElement {

    /**
    * ShowToast 
    *
    *@param  title option       헤더내용
    *@param  message option     메세지
    *@param  variant option     (info:default, success, warning, error)
    *@param  mode option        (dismissible:default , pester ,sticky)
    *@param  messageData option message의 {0} ... {N} 의 값을 messageData index 값으로 치환
    *참조: https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-show-toast-event/documentation
    */
    @api showToast (title, message, variant, mode, messageData=[]) {
        const event = new ShowToastEvent({
            title: title,
            message:message,
            messageData:messageData,
            variant:variant,
            mode:mode
        });

        this.dispatchEvent(event);
    }
}