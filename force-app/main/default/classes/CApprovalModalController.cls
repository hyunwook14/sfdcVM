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
        
        public Object call(String action, Map<String, Object> args) {
            switch on action {
                when '' {
                    return null;
                }
                when else {
                    throw new CApprovalModalController.ExtensionMalformedCallException('Method not implemented');
                }
            }
        }

        
    }

    public class ExtensionMalformedCallException extends Exception {}

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