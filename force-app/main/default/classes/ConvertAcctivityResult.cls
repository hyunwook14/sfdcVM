public with sharing class ConvertAcctivityResult {
    public ConvertAcctivityResult() {

    }

    @AuraEnabled
    public static Map<String,Object> updateRecord(String recordId){
        try {
            Map<String,Object> result;

            update new 	AcctivityReport__c(Id=recordId, Result__c='결과');

            return result = new Map<String,Object>{
                'status'=> 's'
            };
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}