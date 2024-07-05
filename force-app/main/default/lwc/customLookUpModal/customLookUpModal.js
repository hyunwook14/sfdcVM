import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import { CustomBaseNav } from 'c/baseNav';

//apex
import getSearchData from '@salesforce/apex/CustomLookUpController.getSearchData';
import getSearchTable from '@salesforce/apex/CustomLookUpController.getSearchTable';

export default class CustomLookUpModal extends LightningModal {
    @api objLabel;
    @api searchParams = {searchText:''};
    @api displayName;
    @track headerList;
    @track dataList = [];
    originDataList = [];

    /* lwc lifeCycle Method [s] */
    connectedCallback() {
        console.log('CustomLookUpModal connectedCallback');
        let searchParams = {...this.searchParams};
        this.searchParams = searchParams;
    }

    errorCallback(error, stack) {
        console.error(error);
        console.error(stack);
    }
    /* lwc lifeCycle Method [e] */

    /* From js To Apex [s] */
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
        const result = await getSearchTable({params:params})
                            .then(result=>result)
                            .catch(error=>{
                                console.error(error);
                            }).finally(()=>{});

        return result;
    }

    /* From js To Apex [e] */

    async inputHandler(event) {
        console.log('inputHandler');
        this.searchParams.searchText = event.target.value;
        const result = await this._getSearchData(this.searchParams);
        console.log(JSON.parse(JSON.stringify(result)));
        // this.displayName;
        //this.originDataList = result.data;
    }
}