import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";

/**
* ShowToast 
*
*@param  title option 헤더내용
*@param  message option 메세지
*@param  variant option (info:default, success, warning, error)
*@param  mode mode
*/
const utilShowToast = (title, message, variant, mode) => {
    const event = new ShowToastEvent({
        title: title,
        message:message,
        variant:variant,
        mode:mode
    });

    dispatchEvent(event);
}

/**
* sObject Screen Action Type 으로 Action 버튼 생성시 (LightningModal, LightningElement 둘다 사용가능)
* Quick Action Panel 닫기 
* 호출하는 곳에서 method call 혹은 bind 필수
*
*/
const closeScreenAction = function() {
    //debugger;
    
    this.dispatchEvent(new CloseActionScreenEvent());
}

export {closeScreenAction};