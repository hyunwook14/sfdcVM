trigger ApprovalStepChangeEventTrigger on ProcessInstanceStepChangeEvent (after insert) {
    
    ApporvalDocuments documentConnector = new ApporvalDocuments();

    for(ProcessInstanceStepChangeEvent e : Trigger.new) {
        documentConnector.setActionByStandardApprovalDocument(e);
    }
    
    for(ProcessInstance approvalMaster : [select Id, TargetObjectId from ProcessInstance where Id IN :documentConnector.getStatusMapOfStandardDoc().keySet()]) {
        documentConnector.linkDocBetweendCustomAndStandard(approvalMaster);
    }
    
    if(documentConnector.checkChangingDocLine()) documentConnector.updateDocLineStatus();

    public class ApporvalDocuments {

        Map<String,String> statusMapOfStandardDoc;
        Map<String,String> customAndStandardDocMapping;
        List<CApproval_Line__c> changeStatusLienList;

        public ApporvalDocuments() {
            statusMapOfStandardDoc = new Map<String,String>();
            customAndStandardDocMapping = new Map<String,String>(); 
        }

        public void setActionByStandardApprovalDocument(ProcessInstanceStepChangeEvent e) {
            switch on e.StepStatus {
                when 'Approved', 'Rejected' {		
                    statusMapOfStandardDoc.put(e.ProcessInstanceId, e.StepStatus);
                }	
            }
        }

        public void linkDocBetweendCustomAndStandard(ProcessInstance approvalMaster) {
            customAndStandardDocMapping.put(approvalMaster.TargetObjectId, approvalMaster.Id);
        }

        public Map<String,String> getCustomAndStandardDocMapping() {
            return customAndStandardDocMapping;
        } 

        public Map<String,String> getStatusMapOfStandardDoc() {
            return statusMapOfStandardDoc;
        }

        public Boolean checkChangingDocLine() {
            changeStatusLienList = new List<CApproval_Line__c>();

            for(CApproval__c customApproval : [ select Id, Approval_Status__c, FM_Step__c, Total_Approver_Count__c, Approved_Count__c,  ( select Id, User__c, Approval_Status__c , Type__c  from CApproval_Line__r order by Order__c ) from CApproval__c where Id IN :CustomAndStandardDocMapping.keySet()]) {
                Integer lineIdx = 0;
                for(CApproval_Line__c line : customApproval.CApproval_Line__r) {
                    if(customApproval.Approved_Count__c != lineIdx++) continue;

                    line.Approval_Status__c = statusMapOfStandardDoc.get(customAndStandardDocMapping.get(customApproval.Id));
                    
                    changeStatusLienList.add(line);
                }
            }

            return !changeStatusLienList.isEmpty();
        }

        public void updateDocLineStatus() {
            if(changeStatusLienList != null && !changeStatusLienList.isEmpty()) update changeStatusLienList;
        }

    }

}