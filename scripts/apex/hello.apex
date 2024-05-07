// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

//Heap size 사라지는 시간대는?
//변수일 경우 사용후 사라진다. ? > null 로 초기화 해야 사라짐 결론: 최대한 변수에 안 넣고 사용하는것이 Heapsize 를 방지할 수 있음
//local 변수라도 메모리 조금씩 올라감 
//Heapsize: 컴파일할떄 측정되는걸로 추측됨
System.debug('[START]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
SchemaInfO info = new SchemaInfO('Account');
System.debug('[Account]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
Map<String, Schema.RecordTypeInfo> recordTypeMap = info.getRecordTypeMapByDeveloperNames();
System.debug(recordTypeMap.keySet());
System.debug('[Account getRecordTypeMapByDeveloperNames] 1'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[TEST]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
recordTypeMap = info.getRecordTypeMapByDeveloperNames();
System.debug('2/ '+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[TEST]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[END]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
recordTypeMap = null;
info = null;
System.debug('[END2]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
///

System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize()); //첫번째줄 1041
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize()); //두번째 줄까지 실행 1043

System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
SchemaInfO info = new SchemaInfO('Account');
info.getRecordTypeMapByNamesKeySet(); 
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize()); //
for(String key : info.getRecordTypeMapByNamesKeySet()) {

}
for(String key : info.getRecordTypeMapByNamesKeySet()) {

}
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize()); //


SchemaInfO info = new SchemaInfO('Account');
System.debug(info.getTypeToString());

System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
// info.getRecordTypeMapByDeveloperNames();
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
// info = null;
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());



// info.setSchema('Lead');
// System.debug('[Lead]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
// info.setSchema('Account');
// System.debug('[Account]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
String tmp = 'Test';
System.debug('[START]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
for(Integer i = 0; i < 19; i++) {
    tmp += tmp;
    System.debug('[FOR TEST]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
}
System.debug('[FOR END]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[TEST]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
for(Integer i = 0; i < 19; i++) {
System.debug('');
}
System.debug('[FOR END]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug('[END]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug(Limits.getCpuTime());

1728279
6000000

System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
for(Schema.DescribeTabSetResult tabDescribe : Schema.describeTabs()) {
    List<Schema.DescribeIconResult> iconDescribes = new List<Schema.DescribeIconResult>();
    // System.debug(tabDescribe.getDescription());
    // System.debug(tabDescribe.getLabel());
    // System.debug(tabDescribe.getLogoUrl());
    // System.debug(tabDescribe.getNamespace());
    // System.debug(tabDescribe.isSelected());
    // System.debug(tabDescribe.getTabs());
    for(Schema.DescribeTabResult dtr : tabDescribe.getTabs()) {
        // System.debug(dtr.getColors());
        // System.debug(dtr.getIconUrl());
        // System.debug();
        // if(dtr.getSobjectName().equals('AttendanceManagement__c')) {//AttendanceManagement__c
            iconDescribes.addAll(dtr.getIcons());
            // System.debug('App Label : ' +tabDescribe.getLabel());
            // System.debug(tabDescribe.getNamespace());
        // }
        // System.debug(dtr.getLabel());
        // System.debug(dtr.getMiniIconUrl());
        // System.debug(dtr.getSobjectName());
        // System.debug(dtr.getUrl());
        // System.debug(dtr.isCustom());
    }

    for(Schema.DescribeIconResult iconDescribe: iconDescribes) {
        // System.debug(iconDescribe.getContentType());
        // System.debug(iconDescribe.getHeight());
        // System.debug(iconDescribe.getTheme());
        System.debug(iconDescribe.getUrl());
        // System.debug(iconDescribe.getWidth());
    }
}
System.debug('[]'+ Limits.getCpuTime() + ' of '+ Limits.getLimitCpuTime());
System.debug('[]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());

System.debug('[0]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
System.debug(new SchemaInfo('AttendanceManagement__c').getIconName());
// System.debug('[3]'+ Limits.getCpuTime() + ' of '+ Limits.getLimitCpuTime());
System.debug('[3]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());

