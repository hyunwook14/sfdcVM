trigger AcctivityReport on AcctivityReport__c (before update) {

    if(Trigger.isBefore && Trigger.isUpdate) {

        Id planResultRecordTypeId = new SchemaInfo('AcctivityReport__c').getRecordTypeByDeveloperName('PlanResult').getRecordTypeId();
        system.debug(planResultRecordTypeId);

        for(AcctivityReport__c acctivityReport : Trigger.new) {
            if(acctivityReport.Result__c == '결과') {
                AcctivityReport.RecordTypeId = planResultRecordTypeId;
            }
        }

    }
}