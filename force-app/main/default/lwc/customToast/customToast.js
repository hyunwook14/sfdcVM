import { LightningElement, api, track } from 'lwc';
import { getIconURL } from 'c/utils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
export const showToast = function(title, message, variant, mode, messageData=[]) {
    const event = new ShowToastEvent({
        title: title,
        message:message,
        messageData:messageData,
        variant:variant,
        mode:mode
    });

    this.dispatchEvent(event);
};

export default class CustomToast extends LightningElement {
    @track isShowCustomToast = false;
    @api iconType = 'utility';
    @api variant = 'info';
    @api turnOffMs = 0;
    @api title = 'Title';
    @api message = 'Message';

    get inputElement() {
        this._inputElement = this.template.querySelector('.message');
        return this._inputElement;
    }

    get variantIcon() {
        return getIconURL(this.iconType, this.variant);
    }


    renderedCallback() {
        if(this.isShowCustomToast) {
            this.refs.statusThema?.classList.add('slds-theme_'+this.variant);
            this.refs.iconContainer?.classList.add('slds-icon-utility-'+this.variant);

            this.renderHtml();
        }
    }

    renderHtml() {
        if(this.inputElement)
            this.inputElement.value = this.message;
    }

    @api customShowToast() {
        this.isShowCustomToast = true;
        
    }

    @api showToast = showToast.bind(this);

    @api handleClose() {
        setTimeout(()=> this.isShowCustomToast=false, this.turnOffMs);
    }
}