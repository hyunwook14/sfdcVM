public virtual with sharing class ExcelBuilder {
    
    private String templateName;
    private String sObjectType;
    private List<ExcelHeader> excelHeaders;
    
    public ExcelBuilder() {}
    public ExcelBuilder(String templateName, String sObjectType) {
        this.setTemplateName(templateName);
        this.setSObjectType(sObjectType);
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }
    
    //sObjectType setter
    public void setSObjectType(String sObjectType) {
        this.sObjectType = sObjectType;
    }

    public void initailize() {
        excelHeaders = new List<ExcelHeader>();
        
        for(ExcelHeader__mdt excelHeaderMdt : [select 
                                            Field__r.QualifiedApiName, Field__r.ValueTypeId, Type__c 
                                            from ExcelHeader__mdt 
                                                where Tempate__c = :templateName 
                                                and SObjectType__c = :sObjectType]) {
            excelHeaders.add(new ExcelHeader(excelHeaderMdt));
        }
    }
        
    public List<ExcelHeader> getExcelHeaders() {
        return this.excelHeaders;
    }

    public class ExcelHeader {
        private String label;
        private String type;
        public String fieldName{ get ; set;}
        private String fieldType;
        private String defualtValue;
        public ExcelHeader(){}
        public ExcelHeader(ExcelHeader__mdt excelHeaderMdt) {
            this.initHeader(excelHeaderMdt);
        }

        public void initHeader(ExcelHeader__mdt excelHeaderMdt) {
            // if() excelHeaderMdt.getPopulatedFieldsAsMap().keySets().contains()
            this.fieldName = excelHeaderMdt.Field__r.QualifiedApiName;
            this.fieldType = excelHeaderMdt.Field__r.ValueTypeId;
            this.type = excelHeaderMdt.Type__c;
            
        }
    }
}