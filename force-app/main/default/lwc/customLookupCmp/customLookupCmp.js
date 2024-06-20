import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import initComponent from "@salesforce/apex/CustomLookUpController.initComponent";
import queryRecords from "@salesforce/apex/CustomLookUpController.queryRecords";
import getCreatedRecord from "@salesforce/apex/CustomLookUpController.getCreatedRecord";
// import getCodeList from "@salesforce/apex/NX_CertificationsNewModal.getCodeList";
import { isEmpty } from "c/commonUtils";

// Community Front Commoon Function
import { reduceErrors } from "c/ldsUtils";

//export default class CustomLookupCmp extends LightningElement {
export default class CustomLookupCmp extends NavigationMixin(LightningElement) {
  // required parameters
  @api objectName = ""; // Object API a
  @api iconName = ""; // Object Icon Name
  @api selectedRecord = {}; // Selected Record if enableMultiRecord is false
  @api selectedRecords = []; // Selected Records if enableMultiRecord is true

  // optional parameters
  @api label;
  @api required = false; // mark required
  @api minimum = 1; // minimum number of characters to query
  @api additionalDisplays = ""; // additional display fields, comma seperated, max 2
  @api additionalSelect = ""; // add Select Query Field (!must exclude additionalDisplay field, Id, Name)
  @api searchFields = ""; // additional search targets, comma seperated, max 3
  @api filterFields = "";
  @api filterValues = "";
  @api filterConditions = "";
  @api filterExpression = "";
  @api recordTypeNames = "";
  @api ownedOnly = false;
  @api orderBy = "";
  @api numOfQuery = "5";
  @api enableNewRecord = false;
  @api enableMultiObject = false;
  @api multiObjectList = [];
  @api enableMultiRecord = false;
  @api isIgnoredDuplicatedRule = false;
  @api set disabled(disabled) {
    this._disabled = disabled;
      const inputElements = this.template.querySelectorAll('.leftPaddingClass');
      inputElements.forEach(element => { element.disabled = disabled; });
  }
  get disabled() {
    return this._disabled;
  }
  //2022.08.22 lookup pill hide 추가
  @api hideLookupResult = false; //검색결과 선택 후 바로 lookup-search ui로 전환(enableMultiRecord = false 일 때)
  @api placeholder; //2022.09.28 placeholder @track-> @api로 변경

  @api resultField = ""; //2022.10.18 검색결과 Name필드 대신 다른 필드로 나오도록
  @api customQuery; //2022.11.11 윤영주, 정해진 기준과 다른 쿼리문 사용 시 분기점 및 이름으로 사용
  @api materialSample;
  
  //2023-12-05 한선웅 - search result list 기본 값 설정 [S]
  @api defaultResults = []; 
  @api setResults(results) {
    this.searchRecords = results;
  }
  // [E]

  get useResultField() {
    return isEmpty(this.resultField) ? false : true;
  }

  get resultFieldData() {
    let data = "";
    try {
      // console.log(JSON.stringify(this.record));
      data = this.record[this.resultField];
    } catch (error) {
      // console.log(error);
      data = this.record?.Name;
    }

    return data;
  }

  get selectedResultData() {
    let data = "";
    try {
      // console.log(JSON.stringify(this.record));
      data = this.selectedRecord[this.resultField];
    } catch (error) {
      // console.log(error);
      data = this.selectedRecord?.Name;
    }

    return data;
  }

  // internally used variables, need re-render component
  @track objectLabel = "";
  @track searchRecords = [];
  @track message = "";
  @track hasMeta = false;
  @track searchClass = "";
  @track lookupPillClass = "";
  @track lookupFieldClass1 = "";
  @track lookupFieldClass2 = "";
  @track hasSelectedRecords = false;

  createWin;

  /**
   * **********************************************
   * doInit of Aura Component (controller + helper)
   * **********************************************
   */
  connectedCallback() {
    this.template.querySelector
    console.log("connected callback ->", this.enableMultiRecord);
    this.required = this.required == "true" ? true : false;
    this.ownedOnly = this.ownedOnly == "true" ? true : false;
    this.enableNewRecord = this.enableNewRecord == "true" ? true : false;
    this.enableMultiObject = this.enableMultiObject == "true" ? true : false;
    // this.enableMultiRecord = this.enableMultiRecord == "true" ? true : false;
    if (this.enableMultiRecord != true)
      this.enableMultiRecord = this.enableMultiRecord == "true" ? true : false;
    if (this.isIgnoredDuplicatedRule != true)
      this.isIgnoredDuplicatedRule =
        this.isIgnoredDuplicatedRule == "true" ? true : false;
    // this.isIgnoredDuplicatedRule = this.isIgnoredDuplicatedRule == "true" ? true : false;
    this.disabled = this.disabled == "true" ? true : false;

    this.searchClass = "slds-is-close slds-form-element slds-lookup";
    this.lookupPillClass = "slds-form-element__control slds-hide";
    this.lookupFieldClass1 =
      "slds-show slds-input-has-icon slds-input-has-icon_right";
    this.lookupFieldClass2 =
      "slds-show slds-box_border slds-input-has-icon slds-input-has-icon_right";

    // doInit part of helper of Aura
    if (
      this.checkMultiObject() &&
      this.checkRequired() &&
      this.checkAdditionalFields() &&
      this.checkAdditionalDisplays() &&
      this.checkSearchFields() &&
      this.checkFilters() &&
      this.checkOrderBy()
    ) {
      initComponent({ objectName: this.objectName })
        .then((result) => {
          console.log("initComponent ->", result);
          this.objectLabel = result;
          this.placeholder = this.placeholder
            ? this.placeholder
            : "Search in " + this.objectLabel;

          // 2023-12-05 한선웅 - search result list 기본 값 설정
          if(this.defaultResults.length > 0) this.searchRecords = this.defaultResults;
        })
        .catch((errors) => {
          this.errorHandler(errors);
        });
    }

    // setCustomStyle(this.customStyle.style, this.customStyle.id);
  }

  disconnectedCallback() {
    // removeCustomStyle(this.customStyle.id);
  }

  // renderedCallback(){
  //   console.log('disabled',this.disabled);
  // }

  /**
   * **********************************************
   * Controller part of Aura Component
   * **********************************************
   */
  /* onFocus, becuase LWC do not allow start with 'on' */
  handleFocus(event) {
    console.log("focused");
    this.searchClass = "slds-is-open slds-form-element slds-lookup";
  }
  /* onBlur, becuase LWC do not allow start with 'on' */
  handleBlur(event) {
    console.log("leaved");
    this.listToggleHelper("off");
    event.currentTarget.value = event.currentTarget.value.trim();
  }
  /* onKeyup, becuase LWC do not allow start with 'on' */
  handleChange(event) {
    event.preventDefault();
    /** @type {string} */
    event.target.value = event.target.value.trimLeft();
    var searchText = event.target.value; //2023.11.22 이규빈, 트림 추가
    // console.log('searchText : ', searchText);
    const keyupEvent = new CustomEvent("searchtext", { detail: searchText });
    this.dispatchEvent(keyupEvent);

    // console.log('searchText.length : ', searchText.length);
    // console.log('this.minimum : ', this.minimum);
    if (searchText.length == 0) {
      this.searchRecords = this.defaultResults ? this.defaultResults : [];
    }

    if (searchText.length > this.minimum - 1) {
      this.searchClass = "slds-is-open slds-form-element slds-lookup";
      this.queryRecords(searchText);
    }
  }

  doScroll(event) {
    event.preventDefault();
    this.timeout = setTimeout(
      function (e) {
        this.searchClass = "slds-is-open slds-form-element slds-lookup";
        //this.template.querySelector('[data-search-input]').focus();
      }.bind(this),
      510
    );
  }

  @api
  clear(event) {
    var detail;

    if (this.enableMultiRecord) {
      var recordId = event.currentTarget.getAttribute("data-item-id"),
        records = this.selectedRecords,
        removeIdx;

      for (var i = 0; i < records.length; i++) {
        if (recordId == records[i].Id) removeIdx = i;
      }

      records.splice(removeIdx, 1);
      this.template.querySelector("[data-search-input]").value = "";
      this.selectedRecords = records;
      this.searchRecords = [];
      detail = this.selectedRecords;

      if (records.length == 0) {
        this.hasSelectedRecords = false;
        this.lookupPillClass = "slds-form-element__control slds-hide";
        this.lookupFieldClass2 =
          "slds-show slds-box--border slds-input-has-icon slds-input-has-icon_right";
      }
    } else {
      this.lookupPillClass = "slds-form-element__control slds-hide";
      this.lookupFieldClass1 =
        "slds-show slds-input-has-icon slds-input-has-icon_right";

      this.template.querySelector("[data-search-input]").value = "";
      this.selectedRecord = {};
      this.searchRecords = [];
      detail = this.selectedRecord;
    }

    // Creates the event with parameter
    // const selectedEvent = new CustomEvent('recordSelectedEvent', { recordByEvent : this.record });
    const changedEvent = new CustomEvent("change", { detail: detail });
    const clearEvent = new CustomEvent("clear", { detail: detail });

    // Dispatches the event.
    this.dispatchEvent(changedEvent);
    this.dispatchEvent(clearEvent);
  }

  recordSelectedEventHandler(event) {
    console.log("recordSelectedEventHandler");
    console.log(event.detail);
    console.log(event.detail.Id);

    // get the selected record from the COMPONETN event
    var recordFromEvent = event.detail;
    console.log("recordFromEvent", JSON.stringify(recordFromEvent));
    this.recordSelected(recordFromEvent);
  }

  // Using NavigationMixin
  createNewRecord(event) {
    this.dispatchEvent(new CustomEvent("newrecord", {}));
    // let evt = {
    // 	type: 'standard__objectPage',
    // 	attributes: {
    // 		objectApiName: 'Account',
    // 		actionName: 'new'
    // 	},
    // 	state: {
    // 		nooverride: '1'
    // 	}
    // };
    // //this[NavigationMixin.Navigate](evt);
    // this[NavigationMixin.GenerateUrl](evt)
    // 	.then(url => {
    // 		console.log('url ->', url);
    // 		this.createWin = window.open(url, "_blank");
    // 		// This callback does not work!!!
    // 		this.createWin.onbeforeunload = function(){
    // 			console.log('onbeforeunload');
    // 			this.getCreatedRecord();
    // 		}
    // 	});
  }

  objectSelect(event) {
    event.preventDefault();
    let selectedObject = event.detail.value;
    this.multiObjectList.forEach((item) => {
      if (item.value == selectedObject) {
        this.objectName = item.value;
        this.objectLabel = item.label;
        this.iconName = item.iconName;
        this.placeholder = "Search in " + this.objectLabel;
      }
    });
  }

  // on-render handler of Aura Component
  renderedCallback() {
    // console.log('rendered callback ->');
    //this.template.querySelector('[data-custom-lookup]').classList.add('slds-is-close');

    if (this.selectedRecord.Name != undefined) {
      this.lookupPillClass = "slds-form-element__control slds-show";
      this.lookupFieldClass1 =
        "slds-hide slds-input-has-icon slds-input-has-icon_right";
    }
    if (
      Array.isArray(this.selectedRecords) &&
      this.selectedRecords.length > 0
    ) {
      this.hasSelectedRecords = true;
      this.lookupFieldClass2 =
        "slds-hide slds-box--border slds-input-has-icon slds-input-has-icon_right";
    }
  }

  /**
   * **********************************************
   * Helper part of Aura Component
   * **********************************************
   */
  checkMultiObject() {
    if (this.enableMultiObject) {
      if (this.multiObjectList == null || this.multiObjectList.length < 1) {
        this.showMyToast(
          "error",
          "CustomLookup Error",
          "Need to set multiObjectList for using Multiple Object. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
      if (this.searchFields != "") {
        this.showMyToast(
          "warning",
          "CustomLookup Alert",
          "Can not use searchFields with multiObject. searchFields cleared!!"
        );
        this.searchFields = "";
      }
      if (this.additionalSelect != "") {
        this.showMyToast(
          "warning",
          "CustomLookup Alert",
          "Can not use additionalSelect with multiObject. additionalSelect cleared!!"
        );
        this.additionalSelect = "";
      }
      if (this.additionalDisplays != "") {
        this.showMyToast(
          "warning",
          "CustomLookup Alert",
          "Can not use additionalDisplay with multiObject. additionalDisplay cleared!!"
        );
        this.additionalDisplays = "";
      }
      if (this.filterFields != "" || this.filterExpression != "") {
        this.showMyToast(
          "warning",
          "CustomLookup Alert",
          "Can not use Filter with multiObject. Filter cleared!!"
        );
        this.filterFields = "";
        this.filterValues = "";
        this.filterConditions = "";
        this.filterExpression = "";
      }
      if (this.recordTypeNames != "") {
        this.showMyToast(
          "warning",
          "CustomLookup Alert",
          "Can not use recordTypeNames with multiObject. recordTypeNames cleared!!"
        );
        this.recordTypeNames = "";
      }

      this.objectName = this.multiObjectList[0].value;
      this.objectLabel = this.multiObjectList[0].label;
      this.iconName = this.multiObjectList[0].iconName;
    }
    return true;
  }

  checkRequired() {
    if (this.objectName == "" || this.iconName == "") {
      this.showMyToast(
        "error",
        "CustomLookup Error",
        "objectName, iconName are required. Lookup disabled!!"
      );
      this.disabled = true;
      return false;
    }
    return true;
  }

  checkAdditionalFields() {
    if (this.additionalSelect != "") {
      var listField = this.additionalSelect.split(",");
      if (listField.length > 3) {
        this.showMyToast(
          "error",
          "CustomLookup Error",
          "The additionalField only accept maximum 2 fields. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
      this.hasMeta = true;
    }
    return true;
  }

  checkAdditionalDisplays() {
    if (this.additionalDisplays != "") {
      var listField = this.additionalDisplays.split(",");
      if (listField.length > 3) {
        this.showMyToast(
          "error",
          "CustomLookup Error",
          "The additionalDisplays only accept maximum 2 fields. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
      this.hasMeta = true;
    }
    return true;
  }

  checkSearchFields() {
    if (this.searchFields != "") {
      var listField = this.searchFields.split(",");
      if (listField.length > 6) {
        this.showMyToast(
          "error",
          "CustomLookup Error",
          "The searchField only accept maximum 4 fields. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
    }
    return true;
  }

  checkFilters() {
    window.console.log("this.filterFields : ", this.filterFields);
    window.console.log("this.filterValues : ", this.filterValues);
    window.console.log("this.filterConditions : ", this.filterConditions);
    if (this.filterFields != "") {
      var listField = this.filterFields.split(","),
        listValue = this.filterValues.split(","),
        listCondition = this.filterConditions.split(",");
      if (
        listField.length != listValue.length ||
        listField.length != listCondition.length
      ) {
        this.showMyToast(
          "error",
          "CustomLookup Error",
          "The number of filter fields, values and conditions must match. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
    }
    return true;
  }

  checkOrderBy() {
    if (this.orderBy != "") {
      var listField = this.orderBy.split(",");
      if (listField.length > 2) {
        this.showToast(
          "error",
          "CustomLookup Error",
          "Additional order by fields accept maximum 3. Lookup disabled!!"
        );
        this.disabled = true;
        return false;
      }
    }
    return true;
  }

  queryRecords(searchText) {
    this.spinnerToggle();
    if(this.customQuery) {
    //   if(this.customQuery == 'Certifiaction__c') {
    //     getCodeList({'searchKeyword' : searchText})
    //     .then(result => {
    //       console.log('queryRecord result check : ', result);
    //       if(result.length == 0) {
    //         this.message = 'No Result Found...';
    //       } else {
    //         this.message = '';
    //       }
    //       this.searchRecords = result;
    //     })
    //   }
    } else {
      queryRecords({
        searchKeyword: searchText,
        objectName: this.objectName,
        searchFields: this.searchFields,
        additionalDisplay: this.additionalDisplays,
        additionalSelect: this.additionalSelect,
        filterFields: this.filterFields,
        filterValues: this.filterValues,
        filterConditions: this.filterConditions,
        filterExpression: this.filterExpression,
        recordTypeNames: this.recordTypeNames,
        onlyOwned: this.ownedOnly,
        orderBy: this.orderBy,
        numLimit: this.numOfQuery,
        resultField: this.resultField
      })
        .then((result) => {
          // console.log('queryRecords ->', result);
          if (result.length == 0) {
            this.message = "No Result Found...";
          } else {
            this.message = "";
          }
          this.searchRecords = result;
          this.spinnerToggle();
        })
        .catch((errors) => {
          this.errorHandler(errors);
          this.spinnerToggle();
        });
    }
  }

  getCreatedRecord() {
    console.log("callback executed....");
    getCreatedRecord({ objectName: this.objectName })
      .then((result) => {
        console.log("getCreatedRecord ->", result);
        if (result != null) this.selectedRecord = result;
      })
      .catch((errors) => {
        this.errorHandler(errors);
      });
  }

  recordSelected(record) {
    var detail;
    if (this.enableMultiRecord) {
      if (Array.isArray(this.selectedRecords)) {
        this.selectedRecords.push(record);
      } else {
        this.selectedRecords = new Array();
        this.selectedRecords.push(record);
      }
      if (this.selectedRecords.length > 0) this.hasSelectedRecords = true;
      detail = this.selectedRecords;
    } else {
      console.log("hideLookupPill:" + this.hideLookupResult);
      if (this.hideLookupResult) {
        this.lookupPillClass = "slds-form-element__control slds-hide";
        this.lookupFieldClass1 =
          "slds-show slds-input-has-icon slds-input-has-icon_right";
        this.searchClass = "slds-is-open slds-form-element slds-lookup";
      } else {
        this.lookupPillClass = "slds-form-element__control slds-show";
        this.lookupFieldClass1 =
          "slds-hide slds-box--border slds-input-has-icon slds-input-has-icon_right";
        this.searchClass = "slds-is-close slds-form-element slds-lookup";
      }
      this.selectedRecord = record;
      detail = this.selectedRecord;
    }

    this.template.querySelector("[data-search-input]").value = "";
    this.searchRecords = [];

    if (this.hideLookupResult) {
      this.selectedRecord = {};
    }

    // Creates the event with parameter
    //const selectedEvent = new CustomEvent('recordSelectedEvent', { recordByEvent : this.record });
    const changedEvent = new CustomEvent("change", { detail: detail });

    // Dispatches the event.
    this.dispatchEvent(changedEvent);

    //2023.03.24 선택된 레코드만 전달
    const selectedRowEvent = new CustomEvent("selectedrow", { detail: record });
    this.dispatchEvent(selectedRowEvent);
  }

  //2023.03.24 selectedRecord 설정
  @api
  setRecordSelected(record) {
    if (this.enableMultiRecord) {
      // console.log('enableMultiRecord');
      this.selectedRecords = record;
    } else {
      // console.log('enableMultiRecord false');
      this.selectedRecord = record;
    }
  }

  listToggleHelper(mode) {
    this.timeout = setTimeout(
      function (e) {
        if (mode == "on") {
          // resultList open
          this.searchClass = "slds-is-open slds-form-element slds-lookup";
        } else {
          // resultList close
          this.searchClass = "slds-is-close slds-form-element slds-lookup";
        }
      }.bind(this),
      500
    );
  }

  // Spinner toggle
  spinnerToggle() {
    this.template
      .querySelector("[data-result-spinner]")
      .classList.toggle("slds-hide");
  }

  errorHandler(errors) {
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        this.showMyToast("error", "Error", error.message, "sticky");
      });
    } else {
      console.log(errors);
      try {
        let errorMsg = errors ? reduceErrors(errors).toString() : errors;
        this.showMyToast("error", "Error", errorMsg, "sticky");
      } catch (error) {
        this.showMyToast("error", "Error", errors, "sticky");
      }
      // this.showMyToast('error', 'Error', 'Unknown error in javascript controller/helper.', 'sticky');
    }
  }

  showMyToast(variant, title, msg, mode) {
    let dismissible = mode != undefined ? mode : "dismissible";
    const event = new ShowToastEvent({
      variant: variant,
      title: title,
      message: msg,
      mode: dismissible
    });
    this.dispatchEvent(event);
  }

  customStyle = {
    style: `
            .content section .slds-modal__container {
                width: 100%;
                padding: 0 10%;
            }
        `,
    id: "childModalStyle"
  };
}