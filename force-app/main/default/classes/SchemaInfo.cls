/**
* sObject 정보
*
*@group 스키마
*@author 진현욱
*@since 2024-04-25  최초 작성
*/
public inherited sharing class SchemaInfo {
    private Schema.SObjectType type;

    /**
    * 생성자
    *
    */
    public SchemaInfo() {}
    public SchemaInfo(String sObjectType) {
        this.setSchema(sObjectType);
    }

    /**
    * 메타 Schema SObjectType 설정
    *
    *@param  sObjectType sObject API
    */
    public void setSchema(String sObjectType) {
        this.type = Schema.getGlobalDescribe().get(sObjectType);
    }

   /**
   * 메타 Schema sObjectType 가져오기
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
        return iconName;
    }

    /**
    * 메타 Schema DescribeSObjectResult 가져오기
    *
    *@return  Schema.DescribeSObjectResult
    */
    public Schema.DescribeSObjectResult getResult() {
        return this.type?.getDescribe();
    }

    /**
    * 메타 모든 Schema RecordTypeInfo 가져오기
    *
    *@return  Map<Id, Schema.RecordTypeInfo>
    */
    public Map<Id, Schema.RecordTypeInfo> getRecordTypeMapByIds() {
        return this.type?.getDescribe().getRecordTypeInfosById();
    }

    /**
    * 메타 모든 Schema RecordTypeInfo 가져오기
    *
    *@return  Map<String, Schema.RecordTypeInfo>
    */
    public Map<String, Schema.RecordTypeInfo> getRecordTypeMapByDeveloperNames() {
        return this.type?.getDescribe().getRecordTypeInfosByDeveloperName();
    }

    /**
    * 메타 모든 Schema RecordTypeInfo 가져오기
    *
    *@return  Map<String, Schema.RecordTypeInfo>
    */
    public Map<String, Schema.RecordTypeInfo> getRecordTypeMapByNames() {
        return this.type?.getDescribe().getRecordTypeInfosByName();
    }

    /**
    * 메타 모든 Schema RecordTypeInfo 라벨 가져오기
    *
    *@return  Set<String>
    */
    public Set<String> getRecordTypeMapByNamesKeySet() {
        return this.type?.getDescribe().getRecordTypeInfosByName().keySet();
    }

    /**
    * 메타 RecordType DeveloperName으로 Schema RecordTypeInfo 가져오기
    *
    *@return  Schema.RecordTypeInfo
    */
    public Schema.RecordTypeInfo getRecordTypeByDeveloperName(String name) {
        return this.type?.getDescribe().getRecordTypeInfosByDeveloperName().get(name);
    }

    /**
    * 메타 RecordType Id로 Schema RecordTypeInfo 가져오기
    *
    *@return  Schema.RecordTypeInfo
    */
    public Schema.RecordTypeInfo getRecordTypeById(String typeId) {
        return this.type?.getDescribe().getRecordTypeInfosById().get(typeId);
    }

    /**
    * 메타 모든 Schema SObjectField 가져오기
    *
    *@return  Map<String, Schema.SObjectField>
    */
    public Map<String, Schema.SObjectField> getFieldMap() {
        return this.type?.getDescribe().fields?.getMap();
    }

    /**
    * 메타 모든 Schema FieldSet 가져오기
    *
    *@return  Map<String, Schema.FieldSet>
    */
    public Map<String, Schema.FieldSet> getFieldSetMap() {
        return this.type?.getDescribe().fieldsets?.getMap();
    }

    /**
    * 메타 모든 Schema FieldSet 가져오기
    *
    *@return  Map<String, Schema.FieldSet>
    */
    public Schema.DescribeFieldResult getFieldInfo(String fieldName) {
        return this.getFieldMap().get(fieldName.toLowerCase())?.getDescribe();
    }

    /**
    * 메타 픽리스트 Field의 Schema PicklistEntry(픽리스트 값) 가져오기
    *
    *@return  Map<String, Schema.PicklistEntry>
    */
    public List<Schema.PicklistEntry> getPicklistEntrys(String picklistFieldName) {
        return this.getFieldInfo(picklistFieldName)?.getPicklistValues();
    }

    /**
    * Query에 사용할 모든 Fields 정보 가져오기
    *
    *@return  String
    */
    public String getAllFieldsForQuery() {
        String allFields = '';

        for(String fieldName : this.getFieldMap().keySet()) {
            if(String.isNotBlank(allFields)) allFields += ',';
            allFields += this.getFieldMap().get(fieldName.toLowerCase())?.getDescribe().getName();
        }

        return allFields;        
    }

}