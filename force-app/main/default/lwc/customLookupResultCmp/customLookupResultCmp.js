import { LightningElement, api, track } from 'lwc';
import { isEmpty } from 'c/commonUtils';

export default class CustomLookupResultCmp extends LightningElement {
	@api	record = {};
	@api	iconName = "";
	@api	additionalFields = "";
	@api 	resultField = '';
	get useResultField(){
		return (isEmpty(this.resultField) ? false : true);
	}

	@track	hasMeta = false;
	@track	metaCss = "slds-media slds-listbox__option slds-listbox__option_entity";
	get resultFieldData(){
		try {
			// console.log(JSON.stringify(this.record));
			return this.record[this.resultField];			
		} catch (error) {
			// console.log(error);
			return this.record.Name;
		}
	}
	//20221121 윤영주, 마지막 글자 입력 시 렌더링 되지 않는 오류 대응하여 get()으로 대체
	//기존 내용은 제일 하단 주석 확인
	get additionalData(){
		var result ='';
		if(this.additionalFields != ""){
			var listField = this.additionalFields.replace(" ","").split(",");

			for(var i = 0; i < listField.length; i++){
				var key = listField[i];
				if(i != 0) result +=','									//2022.12.03 seonju.jin additional display 2개이상인 경우 comma 처리가 되지않아 수정
				result += (isEmpty(this.record[key]) ? '' : this.record[key]);
				// if(i > 0 && i != listField.length) result += ', ';	//2022.12.03 seonju.jin additional display 2개이상인 경우 comma 처리가 되지않아 수정
			}
		}
		// 2023-12-14 한선웅 - 빈 값인 경우 , 제거
		const add = [];
		result.split(',').forEach((e) => {
			if(e != '' || e.trim() != '') add.push(e);
		});
		return add.join(',');
		// return result;
	}

	connectedCallback(){
		console.log('this.additionalFields', this.additionalFields);
		if(this.additionalFields != ""){
			this.hasMeta = true;
			this.metaCss = this.metaCss + ' slds-listbox__option_has-meta';
		}
	}

	selectRecord(event){
		// Prevents the anchor element from navigating to a URL.
		event.preventDefault();

		// Creates the event with parameter
		//const selectedEvent = new CustomEvent('recordSelectedEvent', { recordByEvent : this.record });
		const selectedEvent = new CustomEvent('select', { detail : this.record });

		// Dispatches the event.
		this.dispatchEvent(selectedEvent);
	}
	/*
	@track	additionalData = "";
	connectedCallback(){
		console.log('this.additionalFields', this.additionalFields);
		// console.log('this.resultField',this.resultField);
		// console.log('this.useResultField',this.useResultField);
		if(this.additionalFields != ""){
			this.hasMeta = true;
			this.metaCss = this.metaCss + ' slds-listbox__option_has-meta';

			var listField = this.additionalFields.replace(" ","").split(",");
			for(var i = 0; i < listField.length; i++){
				var key = listField[i];
				this.additionalData += (isEmpty(this.record[key]) ? '' : this.record[key]);
				if(i > 0 && i != listField.length) this.additionalData += ', ';
			}
		}
	}
	*/
}