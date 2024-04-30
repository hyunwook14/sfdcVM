/**
* sObject 정보
*
*@group 스키마
*@author 진현욱
*@since 2024-04-25  최초 작성
*/
public inherited sharing class SchemaInfo {
    private Schema.SObjectType type;

    public SchemaInfo() {}
    public SchemaInfo(String sObjectType) {
        this.setSchema(sObjectType);
    }

    /**
    * Schema SObjectType 설정
    *
    *@param  sObjectType sObject API
    */
    public void setSchema(String sObjectType) {
        this.type = Schema.getGlobalDescribe().get(sObjectType);
    }

   /**
   * Schema sObjectType 가져오기
   *
   *@return  Schema.SObjectType`
   */
    public Schema.SObjectType getType() {
        return this.type;
    }

    /**
    * sObject API 명 가져오기
    *
    *@return  ${sObjectAPI} : Account...
    */
    public String getTypeToString() {
        return String.valueOf(this.type);
    }

    /**
    * sObject Label 명 가져오기
    *
    *@return (번역에 따라 Label 명 달라짐) Account ...
    */
    public String getLabel() {
        return this.type?.getDescribe().getLabel();
    }

    /**
    * sObject Tab 의 Icon 명 가져오기
    *
    *@return  standard:account or custom: custom8 ...
    */
    public String getIconName() {
        System.debug('[1]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
        // System.debug('[1]'+ Limits.getCpuTime() + ' of '+ Limits.getLimitCpuTime());
        String iconName = '';
        Boolean isSkip = false;

        for(Schema.DescribeTabSetResult tabDescribe : Schema.describeTabs()) {
            List<Schema.DescribeIconResult> iconDescribes = new List<Schema.DescribeIconResult>();
            for(Schema.DescribeTabResult tabInfo : tabDescribe.getTabs()) {
                if(isSkip) break;
                if(tabInfo.getSobjectName().equals(this.getTypeToString())){
                    if(tabInfo.isCustom())
                        iconDescribes.addAll(tabInfo.getIcons());
                    else 
                        iconName = 'standard:'+this.getTypeToString().toLowerCase();

                    isSkip = true;
                    break;
                }
            }

            for(Schema.DescribeIconResult iconInfo: iconDescribes) {
                if('image/svg+xml'.equals(iconInfo.getContentType())) {
                    iconName = 'custom:'+iconInfo.getUrl().substringBetween('custom/', '.svg').substringBefore('_');
                    break;
                }

            }
            
            if(isSkip) break;
        }
        System.debug('[2]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
        // System.debug('[2]'+ Limits.getCpuTime() + ' of '+ Limits.getLimitCpuTime());
        return iconName;
    }

    public Schema.DescribeSObjectResult getResult() {
        return this.type?.getDescribe();
    }

    public Map<Id, Schema.RecordTypeInfo> getRecordTypeMapByIds() {
        return this.type?.getDescribe().getRecordTypeInfosById();
    }

    public Map<String, Schema.RecordTypeInfo> getRecordTypeMapByDeveloperNames() {
        return this.type?.getDescribe().getRecordTypeInfosByDeveloperName();
    }

    public Map<String, Schema.RecordTypeInfo> getRecordTypeMapByNames() {
        return this.type?.getDescribe().getRecordTypeInfosByName();
    }

    public Set<String> getRecordTypeMapByNamesKeySet() {
        return this.type?.getDescribe().getRecordTypeInfosByName().keySet();
    }

    public Schema.RecordTypeInfo getRecordTypeByDeveloperName(String name) {
        return this.type?.getDescribe().getRecordTypeInfosByDeveloperName().get(name);
    }

    public Schema.RecordTypeInfo getRecordTypeById(String typeId) {
        return this.type?.getDescribe().getRecordTypeInfosById().get(typeId);
    }

    public Map<String, Schema.SObjectField> getFieldMap() {
        return this.type?.getDescribe().fields?.getMap();
    }

    public Map<String, Schema.FieldSet> getFieldSetMap() {
        return this.type?.getDescribe().fieldsets?.getMap();
    }

    public Schema.DescribeFieldResult getFieldInfo(String fieldName) {
        return this.getFieldMap().get(fieldName.toLowerCase())?.getDescribe();
    }

    public List<Schema.PicklistEntry> getPicklistEntrys(String picklistFieldName) {
        return this.getFieldInfo(picklistFieldName)?.getPicklistValues();
    }

}