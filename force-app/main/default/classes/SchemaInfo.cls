/**
* sObject 정보
*
*@group 스키마
*@author 진현욱
*@since 2024-04-25  최초 작성
*/
public inherited sharing class SchemaInfo {
    private Schema.SObjectType type;
    private Schema.DescribeSObjectResult result;

    public SchemaInfo() {}
    public SchemaInfo(String sObjectType) {
        this.setSchema(sObjectType);
    }

    public void setSchema(String sObjectType) {
        this.type = Schema.getGlobalDescribe().get(sObjectType);
        this.result = this.type.getDescribe();
    }

    public Schema.SObjectType getType() {
        return this.type;
    }

    public String getTypeToString() {
        return String.valueOf(this.type);
    }

    public String getLabel() {
        return this.type?.getDescribe().getLabel();
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