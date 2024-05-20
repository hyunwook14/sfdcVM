import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";

/** icon Info [s] */
const defaultIconUrl ='/_slds/icons/{0}-sprite/svg/symbols.svg#';

const doctype =     'doctype';
const standard =    'standard';
const utility =     'utility';
const custom  =     'custom';
const action =      'action';
/**
* svg icon url 정보
*
*@param  type       icon 유형
        'doctype'
        'standard'
        'utility'
        'custom'
        'action'
*@param  iconName   icon 명
*/
export const getIconURL = (type, iconName) => {
    if(!type) type = 'standard';
    return defaultIconUrl.replace(/(\{0\})/, type)+iconName;
};
/** icon Info [e] */

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