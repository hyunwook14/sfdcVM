trigger ApprovalStepChangeEventTrigger on ProcessInstanceStepChangeEvent (after insert) {
	//단건이냐? 다건이냐?
    System.debug('Step size: '+Trigger.new.size());
    System.debug(JSON.serialize(Trigger.new));
    Set<String> processInstanceIdSet = new Set<String>();
    Set<String> orginActorIdSet = new Set<String>();
    Set<String> targetIdSet = new Set<String>();
    Map<String, CApproval_Line__c> lineMap = new Map<String,CApproval_Line__c>();
    for(ProcessInstanceStepChangeEvent e : Trigger.new) {
     	processInstanceIdSet.add(e.ProcessInstanceId);
        orginActorIdSet.add(e.OriginalActorId);
    }
    
    Map<Id,ProcessInstance> processMap = new Map<Id,ProcessInstance>([select Id, TargetObjectId from ProcessInstance where Id IN :processInstanceIdSet]);
    
    for(Id Key : processMap.keySet()) {
        targetIdSet.add(processMap.get(Key).TargetObjectId);
    }
    
    for(CApproval_Line__c line : [select Id, User__c, Approval_Status__c from CApproval_Line__c where Type__c = '결재자' and Approval_Status__c != 'Approval' and CApproval__c IN :targetIdSet]) {
        
    }
        
    for(ProcessInstanceStepChangeEvent e : Trigger.new) {
          switch on e.StepStatus {
    		when 'Approved' {		
        		// code block 1
    		}	
    		when 'Rejected' {		// when block 2
        		// code block 2
    		}
          }
    }
}