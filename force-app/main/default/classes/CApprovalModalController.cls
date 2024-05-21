public with sharing class CApprovalModalController {
    public CApprovalModalController() {

    }

    @AuraEnabled
    public static Object apexCallToServer(Map<String,Object> params){
        try {
            String methodName = (String)params.get('methodName');
            Output result = new Output(methodName, params, null);

            Callable actionBulider = 
                (Callable) Type.forName('CApprovalModalController.ActionBuilder').newInstance();
            
            result.setResponse(actionBulider.call(methodName, params));

            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public inherited sharing class ActionBuilder implements Callable {
        
        public Object getProgressingApproval(String targetId) {
            Map<String,Object> response = new Map<String,Object>();
            CustomApproval progressingApproval = new CustomApproval(targetId, null);
            response.put('progressingApproval', progressingApproval.getWorkItemInfo());
            return response;
        }

        public Object approval(String targetId, String comments, String nextApproverId) {
            CustomApproval approval = new CustomApproval(targetId, comments, nextApproverId, 'Approve');
            return approval.actionApprovalAndReject();
        }

        public Object call(String action, Map<String, Object> args) {
            switch on action {
                when 'getProgressingApproval' {
                    return this.getProgressingApproval((String)args.get('targetId'));
                }
                when 'approval' {
                    return this.approval((String)args.get('targetId'), (String)args.get('comments'), (String)args.get('nextApproverId'));
                }
                when else {
                    throw new CApprovalModalController.ExtensionMalformedCallException('Method not implemented');
                }
            }
        }
        
    }


    public class CustomApproval {

        private String targetObjectId;
        private String comments;
        private String nextApprovalUserId; //승인할 UserId
        private String actionType; //Approve, Reject, or Removed. Only system administrators can specify Removed.

        public CustomApproval() {}
        public CustomApproval(String targetObjectId, String comments) {
            this.targetObjectId = targetObjectId;
            this.comments = comments;
        }
        public CustomApproval(String targetObjectId, String comments, String nextApprovalUserId) {
            this(targetObjectId, comments);
            this.nextApprovalUserId = nextApprovalUserId;
        }
        public CustomApproval(String targetObjectId, String comments, String nextApprovalUserId, String actionType) {
            this(targetObjectId, comments, nextApprovalUserId);
            this.actionType = actionType;
        }

        public void setTargetObjectId(String targetObjectId) {
            this.targetObjectId = targetObjectId;
        }

        public String getTargetObjectId() {
            return this.targetObjectId;
        }

        public void setNextApprovalUserId(String nextApprovalUserId) {
            this.nextApprovalUserId = nextApprovalUserId;
        }

        public String setNextApprovalUserId() {
            return this.nextApprovalUserId;
        }

        public void setComments(String comments) {
            this.comments = comments;
        }

        public String getComments() {
            return this.comments;
        }

        public void setActionType(String actionType) {
            this.actionType = actionType;
        }

        public String getActionType() {
            return this.actionType;
        }

        public Object submit() {
            Approval.ProcessSubmitRequest req = new Approval.ProcessSubmitRequest();
            req.setComments(this.comments);
            req.setObjectId(this.targetObjectId);
            req.setNextApproverIds(new Id[]{this.nextApprovalUserId});
            // req.setSubmitterId(UserInfo.getUserId()); //Set 미설정시 현재 User 로
            // req.setProcessDefinitionNameOrId('Approval2_1'); //승인 프로세스명 혹은 Id 미설정시 현재 TargetObejct 기준으로 프로세스 진행
            // Skip the criteria evaluation for the specified process
            // req.setSkipEntryCriteria(true);
            Approval.ProcessResult result = Approval.process(req);
            System.debug(result.isSuccess());
            System.debug(result.getInstanceStatus());
            return result.isSuccess();
        }

        public Object actionApprovalAndReject() {
            if(String.isBlank(this.targetObjectId)) throw new CApprovalModalController.NoTargetObjectIdException('TargetObjectId is Required');
            String workItemId = this.getWorkItemInfo().Id;
            
            Approval.ProcessWorkitemRequest reqApproval = new Approval.ProcessWorkitemRequest();
            reqApproval.setComments(this.comments);
            reqApproval.setAction(this.actionType);
            reqApproval.setWorkItemId(workItemId);
            reqApproval.setNextApproverIds(new Id[]{UserInfo.getUserId()});
            Approval.ProcessResult result = Approval.process(reqApproval);
            System.debug(result.isSuccess());
            System.debug(result.getInstanceStatus());
            return result.isSuccess();
        }

        public ProcessInstanceWorkitem getWorkItemInfo() {
            if(String.isBlank(this.targetObjectId)) throw new CApprovalModalController.NoTargetObjectIdException('TargetObjectId is Required');
            
            ProcessInstanceWorkitem workItem;
            Set<String> approvalMasterId = new Set<String>();
            for(ProcessInstance approvalMaster :[
                select id, ProcessDefinition.Name, Status from ProcessInstance where TargetObjectId = :this.targetObjectId and LastActorId = null
            ]) {
                approvalMasterId.add(approvalMaster.id);
            }

            for(ProcessInstanceWorkitem searchWorkItem :[
                select id, OriginalActorId, OriginalActor.Name, ActorId, Actor.Name
                from ProcessInstanceWorkitem where ProcessInstanceId IN :approvalMasterId
            ]){
                workItem = searchWorkItem;
            }
            return workItem;
        }
    }

    //Exception
    public class ExtensionMalformedCallException extends Exception {}
    public class NoTargetObjectIdException extends Exception {}

    public class Output {
        @AuraEnabled public String methodName;
        @AuraEnabled public Object params;
        @AuraEnabled public Object response;

        public Output(){}
        public Output(String methodName, Object params, Object response){
            this.methodName = methodName;
            this.params = params;
            this.response = response;
        }

        public void setResponse(Object response) {
            this.response = response;
        }
    }
}