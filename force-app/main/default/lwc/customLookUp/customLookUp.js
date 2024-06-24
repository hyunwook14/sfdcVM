import { LightningElement, api, track, wire } from 'lwc';
import { getIconURL } from 'c/utils';

//apex
import getSearchData from '@salesforce/apex/CustomLookUpController.getSearchData';
import getIconInfoByObject from '@salesforce/apex/CustomLookUpController.getIconInfoByObject'; 
import doInit from '@salesforce/apex/CustomLookUpController.doInit';

export default class CustomLookUp extends LightningElement {
    //TBD help Text 추가 , Disabled
    @api isRequired            = false;
    @api isDisabled            = false;
    @api label                 = '';
    @api sObjectApi            = ''; //test 용
    @api searchField           = 'Name';
    @api fields                = 'Id,Name';
    @api orderByClause         = ' order by CreatedDate ';
    @api whereLogicalOperator  = '';
    @api limitNum              = 100;
    @api isMore                = false;
    _iconInfoList              = ['account'];
    _whereClauseList           = [];
    selectedDisplayInfo        ='';

    isOptionShowListByOne      = true;
    @track isSelected          = false;
    isSearchLoading            = false;
    selectedData;
    _displayName = 'Name';
    dataList       = [];
    closeIconURL   = getIconURL('utility', 'close');
    _searchIconURL = getIconURL('utility', 'search');
    _targetIconURL;
    

    @api get whereClauseStr() {
        return this._whereClauseList;
    }
    set whereClauseStr(value) {
        this._whereClauseList = JSON.parse(JSON.stringify(value));
    }

    get isNotOptionDataList() {
        return (this.dataList.length == 0);
    }

    @api
    get displayName() {
        if(this._displayName.split(',').length > 1) this.isOptionShowListByOne = false;
        else this.isOptionShowListByOne = true;

        return this._displayName;
    }

    set displayName(value) {
        this._displayName = value;
        this.displayName;
    }

    @api
    get searchIconURL() {
        return this._searchIconURL;
    }

    set searchIconURL(value) {
        this._searchIconURL = getIconURL('utility')+value;
    }

    @api
    get targetIconUrl() {
        return this._targetIconURL;
    }

    set targetIconUrl(value) {
        let iconInfoList = value.split(',');
        this._iconInfoList = iconInfoList;

        if(iconInfoList.length > 1) {
            this._targetIconURL = getIconURL(iconInfoList[0], iconInfoList[1]);
        }
        else {
            this._targetIconURL = getIconURL('standard',value);
        }

    }

    /* lwc lifeCycle Method [s] */
    connectedCallback() {
        this.doInit();
        this._customClick = this.customClick.bind(this);
        document.addEventListener('click', this._customClick); // option : true 캡쳐링단계 false 버블링단계
    }

    disconnectedCallback() {
        console.log('cusotm Lookup disconnectdCallback')
        document.removeEventListener('click', this._customClick);
    }

    renderedCallback() {
        // if(this.isSelected) {
            this.setOptionListIcon();
        // }
    }

    errorCallback(error, stack) {
        console.error(error);
        console.error(stack);
    }

    /* lwc lifeCycle Method [e] */

    /* from Html to JS Event [s] */
    inputHandler(event) {
        let searchText = event.currentTarget.value;
        if(searchText) this.params.searchText = searchText;
        else delete this.params.searchText;

        this._getSearchData(this.params);
    }

    
    clickHandler(event) {
        this.focusHandler();
    }

    removeHandler(event) {
        this.isSelected = false;
    }

    selectHandler(event) {
        delete this.params.searchText;
        let idx = event.currentTarget.dataset.idx;
        this.selectedData = this.dataList.slice()[idx];
        let displayNameList = this._displayName.split(',');
        
        for(let field in this.selectedData) {
            if(field.toLowerCase() === displayNameList[0].toLowerCase())
                this.selectedDisplayInfo = this.selectedData[field];
            else 
            this.selectedDisplayInfo = this.selectedData['Name'];
        }
        this.blurHandler();
    
        const selectedEvent = new CustomEvent('selected', { detail: this.selectedData});
        this.dispatchEvent(selectedEvent);
    
        this.isSelected = true;
        
    }

    focusInHandler(event) {
        this._IsFocus = true;
    }

    focusOutHandler(event) {
        this._IsFocus = false;
    }

    customClick(event) {
        // console.log('cusotm Click!!');
        //event.stopPropagation(); 버블링을 막음 사용 x
        if(!this._IsFocus) {
            this.blurHandler();
        }
    }
    /* from Html to JS Event [e] */   
    
    /* From js To Apex [s] */
    @wire(getIconInfoByObject, { sObjectApi: '$sObjectApi' })
    getIconInfoByObjectMethod({ error, data }) {
        if (data) {
            // console.log(data.split(':'));
            this._targetIconURL = getIconURL(data.split(':')[0], data.split(':')[1]);
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }

    async _getSearchData(params) {

        this.isSearchLoading = true;
        const result = await getSearchData({params:params}).then(result=>{
            this.dataList = result.data;
            return result;
        }).catch(error=>{
            console.error(error);
        }).finally(()=>{
            this.isSearchLoading = false;
        });

        return result;
    }

    /* From js To Apex [e] */

    /* js Method [s] */
    /**
    * {@autor} 진현욱
    * {@since} 2023. 05. 02
    * {@description} 
    */
    async focusHandler() {
        this.template.querySelector('.customLookupInput').classList.add('slds-has-focus');
        this.template.querySelector('.slds-dropdown-trigger_click').classList.add('slds-is-open');
        
        await this._getSearchData(this.params);
    }

    blurHandler() {
        if(this.template.querySelector('.customLookupInput')) this.template.querySelector('.customLookupInput').classList.remove('slds-has-focus');
        if(this.template.querySelector('.slds-dropdown-trigger_click'))  this.template.querySelector('.slds-dropdown-trigger_click').classList.remove('slds-is-open');
    }
    
    setOptionListIcon() {
            let targetIconContainers = this.template.querySelectorAll('.target-icon_container')

            if(this._iconInfoList && this._iconInfoList.length > 1 ) {
                for(let targetIconContainer of targetIconContainers) {   
                    targetIconContainer.classList.add('slds-icon-'+this._iconInfoList[0]+'-'+this._iconInfoList[1])
                }
            }else {
                for(let targetIconContainer of targetIconContainers) {   
                    targetIconContainer.classList.add('slds-icon-standard-'+this._iconInfoList[0])
                }
            }
    }

    doInit() {
        doInit({}).then(result=>{
            console.log('doInit ::');
            console.log(result);
            this.setParams(JSON.parse(result.params));
        }).catch(error=>{
            console.error(`doInit error :: `);
            console.error(error);
        })
    }


    setParams(params) {
        if(this.sObjectApi) params.sObjectApi = this.sObjectApi;
        if(this.fields) params.fields = this.fields.toLowerCase();
        if(this.orderByClause) params.orderByClause = this.orderByClause;
        if(this._whereClauseList && this._whereClauseList.lenght > 0) params.whereClauseList = this._whereClauseList;
        if(this.limitNum) params.limitNum = this.limitNum;
        this.params = params;
    }

    /* js Method [e] */
    }