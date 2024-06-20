/**
 * @description       : 
 * @author            : Jake Cho
 * @group             : 
 * @last modified on  : 12-04-2023
 * @last modified by  : Jake Cho
**/
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/**
 * 
 * @param {*} cmp 
 * @param {*} variant success, error, warning, info
 * @param {*} title title
 * @param {*} message message
 */
export function showToast(cmp, variant, title, message){
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    })

    cmp.dispatchEvent(event);
}

/**
 * data empty check
 * @param {*} data 
 * @returns 
 */
export function isEmpty(data){
    // console.log('test01-> ' + isEmpty(null)); // true
    // console.log('test02-> ' + isEmpty('')); // true
    // console.log('test03-> ' + isEmpty('  ')); // true
    // console.log('test04-> ' + isEmpty(undefined)); // true
    // console.log('test05-> ' + isEmpty({})); // true
    // console.log('test06-> ' + isEmpty({arr:[], test:{}})); // false
    // console.log('test07-> ' + isEmpty([])); // true
    // console.log('test08-> ' + isEmpty(['te'])); // false
    // console.log('test09-> ' + isEmpty(0)); // false
    // console.log('test10-> ' + isEmpty('Hey')); // false
    if(typeof(data) === 'object'){
        if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
            return true;
        }else if(!data){
            return true;
        }
        return false;
    }else if(typeof(data) === 'string'){
        if(!data.trim()){
            return true;
        }
        return false;
    }else if(typeof(data) === 'undefined'){
        return true;
    }
        return false;
    
}

export function getTimezoneOffset(d, tz) {
    const a = d.toLocaleString("ja", {timeZone: tz}).split(/[/\s:]/);
    a[1]--;
    const t1 = Date.UTC.apply(null, a);
    const t2 = new Date(d).setMilliseconds(0);

    let result = (t2 - t1) / 60 / 1000 / 60 * 100;

    result = result === 0 ? result : -result;

    if (result.toString().length === 1) {
        result = "+000" + result.toString();
    } else if (result.toString().length === 3) {
        result = "+0" + result.toString();
    } else {
        if (result.toString().length === 4 && result.toString()[0] === '-') {
            result  = "-0" + result.toString().substring(1)
        } else if (result.toString().length === 4) {
            result = "+" + result.toString()
        } else {
            result = result.toString()
        }
    }
    
    return result.toString();
}