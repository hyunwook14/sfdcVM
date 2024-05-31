import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import { closeScreenAction, refreshEventFire, getIconURL } from 'c/utils';
import { CustomBaseNav } from 'c/baseNav';

import apexCallToServer from '@salesforce/apex/CApprovalModalController.apexCallToServer';

export default class CApprovalRequestModal extends CustomBaseNav(LightningModal) {
    _recordId;
    @api objectApiName;
    @track isSpinner = false;

    approvalTypeOptions = [];
    approvalValue = '';
    params = {methodName:''};

    upIconUrl = getIconURL('utility', 'up');
    downIconUrl = getIconURL('utility', 'down');

    searchObj = { id:'' ,name:'' ,employeeNumber:'' ,email:'' ,phone:''};

    //속성 Depth가 1 경우
    selectedObj = Object.assign({}, this.searchObj, {approveType:'', approveTypeLabel:''});

    @track searchList = [];
    @track selectedList = [];

    @api 
    get recordId() {
        return this._recordId
    }
    set recordId(value) {
        this._recordId = value;
    }

    get isNotEmptySearchList() { return this.searchList.length>0; }
    get isNotEmptySelectedList() { return this.selectedList.length>0;}

    /* lwc lifeCycle Method [s] */
    constructor() {
        console.log('CApprovalRequestModal 생성자 시작');
        super();
        super.size = 'large';
        console.log('CApprovalRequestModal 생성자 끝');
    }

    connectedCallback() {
        console.log('CApprovalRequestModal');
        this.showSpinner();
        this.doInit();
    }
    /* lwc lifeCycle Method [e] */

    /* js Method [s] */

    deepClone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    getParams() {
        // 단순 속성 할당, 얕은 복사로 참조 값을 복사함
        return Object.assign({}, this.params);
    }

    doInit() {
        let params = this.getParams();
        params.methodName = 'getRequestInitInfo';
        
        this._apexCallToServer(params).then(result=>{
            this.approvalTypeOptions = result.response.approvalTypeOptions;
            this.approvalValue = this.approvalTypeOptions[0].value;
        });

        //TEST
        for(let i=0; i<10; i++) {
            let cloneObj = this.deepClone(this.searchObj);
            cloneObj.id = String(i);
            cloneObj.name = 'test'+i;
            this.searchList.push(cloneObj);
        }

        (async()=>{
            let targetId = 
            this.pageRef.type === 'standard__quickAction' ?
                this.pageRef.state.recordId : this.recordId;
            
            // let result = await this._apexCallToServer({
            //      methodName:'getProgressingApproval'
            //     ,targetId: targetId
            // });
            
            // if(result)  {
            //     this.approverName = result.response.progressingApproval.Actor.Name;
            //     this.approverId = result.response.progressingApproval.ActorId;
            // }

            this.stopSpinner();
        })();
        
    }

    addApprover() {
        let chekedSearchList = [...this.template.querySelectorAll('.checkSearchUser')]
                            .filter(selectCheck => selectCheck.checked)
                            .map((currVal)=> currVal.dataset.id);

        let optionList = this.approvalTypeOptions.filter(approvalTypeOption=> approvalTypeOption.value === this.approvalValue);

        for(let startIdx = this.searchList.length-1; startIdx >= 0; startIdx--) {
            if(chekedSearchList.lastIndexOf(this.searchList[startIdx].id) !== -1 ) {
                let selectedObj = this.searchList.splice(startIdx,1)[0];
                selectedObj.approveType        = optionList[0].value;
                selectedObj.approveTypeLabel   = optionList[0].label;
                this.selectedList.push(selectedObj);
            }
        }
        this.selectedList.reverse();
        console.log(JSON.stringify(this.selectedList));
    }

    removeApprover() {

    }

    upApprover() {
        let checkSelectedList = [...this.template.querySelectorAll('.checkSelectedUser')]
                            .filter(selectCheck => selectCheck.checked)
                            .map((currVal)=> currVal.dataset.id);
        let beforeSelectedMoveIdx;
        let moveIdx;
        checkSelectedList.forEach((checkedId)=>{
            moveIdx = this.selectedList.findIndex(selectedUser=> selectedUser.id === checkedId);

            if((moveIdx-1) > -1 && (moveIdx-1) !== beforeSelectedMoveIdx) {
                let tmpSelectedUser = this.selectedList[moveIdx-1];
                this.selectedList[moveIdx-1] = this.selectedList[moveIdx];
                this.selectedList[moveIdx] = tmpSelectedUser;
            }

            if((moveIdx-1) === -1) beforeSelectedMoveIdx = moveIdx;
        });

        //For문 돌리는 기준 화면 노출 배열
        // this.selectedList.forEach((selectedUser, idx)=>{
        //     //
        //     if(checkSelectedList[0] === selectedUser.id) {
        //         moveId = checkSelectedList.shift();

        //         if(selectedUser.id === moveId && (idx-1) !== -1  && beforeSelectedMoveIdx !== (idx-1)) {
        //             let tmpUser = this.selectedList[idx-1];
        //             this.selectedList[idx-1] = selectedUser;
        //             this.selectedList[idx] = tmpUser;
        //         }
                
        //         beforeSelectedMoveIdx = this.selectedList.findIndex(selectedUser=> selectedUser.id === moveId);
        //     }
            
            
        //     // 2중 for문 버전
        //     // checkSelectedList.forEach((moveUserId, moveIdx)=>{
        //     //     let beforeSelectedMoveIdx;
        //     //     if(moveIdx-1 !== -1) {
        //     //         beforeSelectedMoveIdx =this.selectedList.findIndex(selectedUser=> selectedUser.id ===checkSelectedList[moveIdx-1]);
        //     //     }

        //     //     if(selectedUser.id === moveUserId && (idx-1) !== -1  && beforeSelectedMoveIdx !== (idx-1)) {
        //     //         let tmpUser = this.selectedList[idx-1];
        //     //         this.selectedList[idx-1] = selectedUser;
        //     //         this.selectedList[idx] = tmpUser;
        //     //     }
        //     // });
        // });

    }

    downApprover() {
        let checkSelectedList = [...this.template.querySelectorAll('.checkSelectedUser')]
                            .filter(selectCheck => selectCheck.checked)
                            .map((currVal)=> currVal.dataset.id);
        let afterSelectedMoveIdx;
        let moveIdx;
        //
        checkSelectedList.reverse()
                          .forEach((checkSelectedId)=>{
            moveIdx = this.selectedList.findIndex(selectedUser=> selectedUser.id === checkSelectedId);

            if(moveIdx > -1 && (moveIdx+1) < this.selectedList.length && (moveIdx+1) !== afterSelectedMoveIdx) {
                let tmpSelected = this.selectedList[moveIdx+1];
                this.selectedList[moveIdx+1] = this.selectedList[moveIdx];
                this.selectedList[moveIdx] = tmpSelected;

                afterSelectedMoveIdx = moveIdx+1;
            }
            
            // 이동할 Idx 값이 배열 Length 와 같으면 현재 Idx로
            if((moveIdx+1) == this.selectedList.length) afterSelectedMoveIdx = moveIdx;
        });

    }

    /* js Method [e] */

    /* from JS to HTML  Method [s] */
    showSpinner() {
        this.isSpinner = true;
    }

    stopSpinner(turnOffMs) {
        setTimeout(()=> this.isSpinner=false, turnOffMs ? turnOffMs : 0);
    }
    /* from JS to HTML Method [e] */

    /* from Html to JS Event [s] */
    handleCloseApprovalRequest() {
        closeScreenAction.call(this);
    }

    handleRequest() {

    }

    handleApprovalTypeChange(event) {
        this.approvalValue = event.detail.value;
    }

    /* from Html to JS Event [e] */


    /* From js To Apex [s] */
    async _apexCallToServer(params) {
        return await apexCallToServer({params:params})
                        .then(result=>{return result;})
                        .catch(errors=>{console.info(errors)});
    }
    /* From js To Apex [e] */
}