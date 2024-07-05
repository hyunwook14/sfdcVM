import { LightningElement, api, track, wire } from 'lwc';
import { getIconURL } from 'c/utils';
import customLookUpModal from 'c/customLookUpModal';

//apex
import getSearchData from '@salesforce/apex/CustomLookUpController.getSearchData';
import getInfoByObject from '@salesforce/apex/CustomLookUpController.getInfoByObject'; 
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
        if(this._displayName?.split(',').length > 1) this.isOptionShowListByOne = false;
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
        // console.log('cusotm Lookup disconnectdCallback')
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
    
    /**
    * 검색창 입력 이벤트
    *
    */
    inputHandler(event) {
        let searchText = event.currentTarget.value;
        if(searchText) this.params.searchText = searchText;
        else delete this.params.searchText;

        this._getSearchData(this.params);
    }

    /**
    * 검색창 클릭 이벤트
    *
    */
    clickHandler(event) {
        this.focusHandler();
    }

    /**
    * 선택 옵션 제거 이벤트
    *
    */
    removeHandler(event) {
        this.isSelected = false;
    }

    /**
    * 선택 옵션 선택 이벤트
    *
    */
    selectHandler(event) {
        let idx = event.currentTarget.dataset.idx;
        this.selectedData = this.dataList.slice()[idx];
        this.setSelectedData(this.selectedData);
    }

    /**
    * 마우스가 검색창 안으로 이동시 이벤트
    *
    */
    focusInHandler(event) {
        this._IsFocus = true;
    }

    /**
    * 마우스가 검색창 밖으로 이동시 이벤트
    *
    */
    focusOutHandler(event) {
        this._IsFocus = false;
    }

    /**
    * 마우스가 검색창 밖에 있을때 검색 옵션 제거
    *
    */
    customClick(event) {
        // console.log('cusotm Click!!');
        //event.stopPropagation(); 버블링을 막음 사용 x
        if(!this._IsFocus) {
            this.blurHandler();
        }
    }

    /**
    *  더 많은 항목 조회 Modal 생성
    *
    */
    async clickMoreModalHandler() {
        await customLookUpModal.open({
            objLabel:this.label
            ,searchParams:this.params
        });
        //TODO: 선택된 항목 Set
    }
    /* from Html to JS Event [e] */   
    
    /* From js To Apex [s] */

    /**
    * sObjectAPI 의 Schema 정보 가져오기
    *
    *@param  sObjectApi obj Developer API
    *@return  {Object}  {
    *@member  iconInfo : icon 정보
    *@member  objLabel : sObject Label 
    *}
    */
    @wire(getInfoByObject,  { sObjectApi: '$sObjectApi' })
    getInfoByObjectMethod({ error, data}) {
        if(data) {
            this._targetIconURL = getIconURL(data.iconInfo.split(':')[0], data.iconInfo.split(':')[1]);
            if(!this.label) this.label = data.objLabel;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.error('getInfoByObjectMethod error');
        }
    }

    /**
    * sObject 조회
    *
    *@param  params setParams 메소드 참조
    *@return  {Object} {
    *@member  params : input params
    *@member  query  : 조회용 query
    *@member  data   : 조회된 data
    *}
    */
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
    * 검색창 focus 시 선택 옵션 생성
    *
    */
    async focusHandler() {
        this.template.querySelector('.customLookupInput').classList.add('slds-has-focus');
        this.template.querySelector('.slds-dropdown-trigger_click').classList.add('slds-is-open');
        
        await this._getSearchData(this.params);
    }

    /**
    * 검색창 선택 옵션 제거
    *
    */
    blurHandler() {
        if(this.template.querySelector('.customLookupInput')) this.template.querySelector('.customLookupInput').classList.remove('slds-has-focus');
        if(this.template.querySelector('.slds-dropdown-trigger_click'))  this.template.querySelector('.slds-dropdown-trigger_click').classList.remove('slds-is-open');
    }
    
    /**
    * icon url 생성
    *
    */
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

    /**
    * 초기화
    *
    */
    doInit() {
        doInit({}).then(result=>{
            // console.log('doInit ::');
            this.setParams(JSON.parse(result.params));
        }).catch(error=>{
            console.error(`doInit error :: `);
            console.error(error);
        })
    }

    /**
    * 최초 params 세팅 
    *
    *@param  params CustomLookUpController.SearchParams Apex 참조
    */
    setParams(params) {
        //_displayName 이랑 fields 랑 머지
        if(!this.isOptionShowListByOne) {
            this.fields = [...new Set(
                this.fields.toLowerCase().split(',').concat(this._displayName.toLowerCase().split(','))
            )].join(',');
        }

        if(this.sObjectApi) params.sObjectApi = this.sObjectApi;
        if(this.fields) params.fields = this.fields.toLowerCase();
        if(this.orderByClause) params.orderByClause = this.orderByClause;
        if(this._whereClauseList && this._whereClauseList.lenght > 0) params.whereClauseList = this._whereClauseList;
        if(this.limitNum) params.limitNum = this.limitNum;
        this.params = params;
    }

    /**
    * 선택된 데이터시 초기화 및 부모로 이벤트 전달
    *
    *@param selectedData 선택된 데이터
    */
    setSelectedData(selectedData) {
        delete this.params.searchText;
        let displayNameList = this._displayName.split(',');
        
        for(let field in selectedData) {
            if(field.toLowerCase() === displayNameList[0].toLowerCase())
                this.selectedDisplayInfo = selectedData[field];
            // else //디폴트 세팅
            //     this.selectedDisplayInfo = this.selectedData['Name'];
        }
        this.blurHandler();
    
        const selectedEvent = new CustomEvent('selected', { detail: selectedData});
        this.dispatchEvent(selectedEvent);
    
        this.isSelected = true;
    }
    
    /* js Method [e] */
    }