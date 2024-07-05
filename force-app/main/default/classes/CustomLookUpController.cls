public with sharing class CustomLookUpController {

    public class NullSobjectException extends Exception {}

    @AuraEnabled(cacheable=true)
    public static string getIconInfoByObject(String sObjectApi){
        try {
            SchemaInfo objectSchema = new SchemaInfo(sObjectApi);
            return objectSchema.getIconName();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Object getInfoByObject(String sObjectApi){
        try {
            SchemaInfo objectSchema = new SchemaInfo(sObjectApi);
            return new Map<String,Object>{
                'iconInfo'  =>  objectSchema.getIconName()
                ,'objLabel'    =>  objectSchema.getLabel()
            };
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Object doInit(){
        try {
            return new Map<String,Object>{
                'params'=> JSON.serialize(new SearchParams())
            };
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Map<String,Object> getSearchData(Map<String,Object> params){
        try {
            Map<String,Object> result = new Map<String,Object>();
            result.put('params', params);

            SearchParams searchParams = (SearchParams)JSON.deserialize(JSON.serialize(params), SearchParams.class);
            result.put('searchParams', searchParams);

            CustomLookUp lookUpBulider = new CustomLookUp(searchParams);
            result.put('query', searchParams.getQuery());
            result.put('data', lookUpBulider.search());

            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static Map<String,Object> getSearchTable(Map<String,Object> params){
        try {
            System.debug('[1]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
            Map<String,Object> result = new Map<String,Object>();
            List<sObject> data = (List<sObject>)getSearchData(params).get('data');
            SearchParams searchParams = (SearchParams)getSearchData(params).get('searchParams');
            
            convertTableData convertBulider = new convertTableData(searchParams.sObjectApi);
            convertBulider.setHeaderList(searchParams.fields);
            result.put('headerList', convertBulider.getHeaderList());
            result.put('dataList', convertBulider.convertTableData(data));
            System.debug('[4]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class CustomLookUp {
        private SearchParams basicInfo;
        private String targetInfoKey;
        private String targetInfoField;
        private Boolean isCustomQuery;

        public CustomLookUp(SearchParams basicInfo) {
            this.setBasicInfo(basicInfo);
            if(String.isNotBlank(basicInfo.customQuery)) this.isCustomQuery = true;
        }

        public void setBasicInfo(SearchParams basicInfo) {
            this.basicInfo = basicInfo;
        }

        public void setIsCustomQuery(Boolean isCustomQuery) {
            this.isCustomQuery = isCustomQuery;
        }

        public List<sObject> search() {
            return database.query(basicInfo.getQuery());
        }
    }

    public class convertTableData {
        private String sObjectApi;
        private List<TableData> headerList;

        public convertTableData(String sObjectApi) {
            this.sObjectApi = sObjectApi;
            headerList = new List<TableData>();
        }

        public void setHeaderList(String fields) {
            // System.debug('[2]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
            if(String.isBlank(this.sObjectApi)) throw new NullSobjectException('Not Defined sObjectApi');

            SchemaInfo objSchema = new SchemaInfo(this.sObjectApi);
            for(String field : fields.split(',')) {
                Schema.DescribeFieldResult fieldInfoResult = objSchema.getFieldInfo(field);
                TableData data = new TableData(fieldInfoResult);
                headerList.add(data);
            }
            // System.debug('[3]'+ Limits.getHeapSize() + ' of '+ Limits.getLimitHeapSize());
        }

        public List<TableData> getHeaderList() {
            return this.headerList;
        }
        
        public List<List<TableData>> convertTableData(List<sObject> originDataList) {
            List<List<TableData>> dataList = new List<List<TableData>>();
            
            for(sObject originData : originDataList) {
                List<TableData> convertData = new List<TableData>();
                for(TableData header : headerList) {
                    TableData cloneData = header.clone();
                    cloneData.value = String.valueOf(originData.get(header.fieldName));
                    convertData.add(cloneData);
                }
                dataList.add(convertData);
            }

            return dataList;
        }
        
    }

    public class TableData {
        @AuraEnabled public String label;
        @AuraEnabled public String fieldName;
        @AuraEnabled public String fieldType;
        @AuraEnabled public String type;
        @AuraEnabled public String value;

        public TableData(){}
        public TableData(Schema.DescribeFieldResult fieldInfoResult){
            this.label     = fieldInfoResult.getLabel();
            this.fieldName = fieldInfoResult.getLocalName();
            //this.fieldType = fieldInfoResult.getType();
        }

    }

    public class SearchParams {
        @AuraEnabled public String searchText;
        @AuraEnabled public String searchField;
        @AuraEnabled public String sObjectApi;
        @AuraEnabled public String fields;
        @AuraEnabled public String orderByClause;
        @AuraEnabled public String whereLogicalOperator;
        @AuraEnabled public List<String> whereClauseList;
        @AuraEnabled public Integer limitNum;
        @AuraEnabled public String customQuery;

        public String getQuery() {
            if(String.isNotBlank(this.customQuery)) return getCustomQuery();
            else return getDefaultQuery();
        }

        public String getCustomQuery() {
            return this.customQuery;
        }
        
        public String getDefaultQuery() {
            String query = ' select ';

            if(String.isBlank(this.sObjectApi)) throw new NullSobjectException('Not Defined sObjectApi');
            if(String.isBlank(this.searchField)) this.searchField = 'Name';

            if(String.isNotBlank(this.fields)) query += this.fields;
            else {
                //this.sObjectApi
                SchemaInfo sObjectSchema = new SchemaInfo(this.sObjectApi);
                query += sObjectSchema.getAllFieldsForQuery();
            }
            query += ' from '+this.sObjectApi;

            String queryWhere = ' where id != null ';

            if(this.whereClauseList != null && !this.whereClauseList.isEmpty()) {
                if(String.isNotBlank(this.whereLogicalOperator)) {
                    //
                    queryWhere += ' and ('+ String.format(this.whereLogicalOperator, this.whereClauseList) + ')';
                }else {
                    for(String whereClause : whereClauseList) {
                        queryWhere += ' and '+ whereClause;
                    }
                }
            }

            if(String.isNotBlank(this.searchText)) queryWhere += ' and '+ this.searchField+' like \'%'+this.searchText+'%\'';
            query += queryWhere;

            if(String.isNotBlank(this.orderByClause)) query += this.orderByClause;
            if(this.limitNum > 0) query += ' limit '+ this.limitNum;

            return query;
        }
    }

    //customLookupCmp
    @AuraEnabled
    public static String initComponent(String objectName) {
        String label = '';
        if(objectName != null){
            List<Schema.DescribeSObjectResult> describeSobjectsResult = Schema.describeSObjects(new List<String>{objectName});
            label = describeSobjectsResult[0].getLabel();    
        }
        
        system.debug('label' + label);
        return label;
    }

    @AuraEnabled
    public static List<sObject> queryRecords(
		String searchKeyword,       // Search Text
		String objectName,          // Target Object API Name
        String searchFields,        // Search Target Fields (comma seperated)
        String additionalDisplay,   // Additional display fields (comma seperated)
        String additionalSelect,    // Additional select fields (comma seperated)
        String filterFields,        // Filter Fields (comma seperated)
		String filterValues,        // Filter Values (comma seperated)
        String filterConditions,    // Filter Conditions (comma seperated)
        String filterExpression,    // Complex filter condition (full statement)
		String recordTypeNames,     // Filter by Record Type Name (comma seperated)
        Boolean onlyOwned,          // Query only user owned records
        String orderBy,             // Order By specific field (comma seperated)
		String numLimit,            // Number of query records
        String resultField          // Result Field
        ) {          
        
        System.debug('searchFields : ' + searchFields);
        System.debug('additionalDisplay : ' + additionalDisplay);
        List<sObject> returnList = new List<sObject> ();  
        
        String sQuery = '';
        sQuery += 'SELECT Id';
        // sQuery += 'SELECT Id, Name ';

        String selectqueryStr = 'Name, ';
        selectqueryStr += ((additionalDisplay != null && additionalDisplay != '') ? additionalDisplay : '');
        selectqueryStr += (additionalSelect != null && additionalSelect != '') 
            ? ((String.isNotBlank(selectqueryStr)) ? ( ', ' + additionalSelect) : additionalSelect) 
            : '';
        selectqueryStr += (String.isNotBlank(resultField)) 
        ? ((String.isNotBlank(selectqueryStr)) ? ( ', ' + resultField ) : resultField )
        : '';
        System.debug('selectqueryStr:' + selectqueryStr);
        sQuery += makeQueryString(selectqueryStr);

        // sQuery += (additionalDisplay != null && additionalDisplay != '') ? makeQueryString(additionalDisplay) : '';
        // sQuery += (additionalSelect != null && additionalSelect != '') ? makeQueryString(additionalSelect) : '';
        // if(String.isNotBlank(resultField)) sQuery += ', ' + resultField;
        sQuery += ' FROM ' + objectName;

        if(String.isNotBlank(resultField)){
            if(String.isNotBlank(searchFields)) searchFields += ', ' + resultField;
            else searchFields = resultField;
        } 

        sQuery += makeSearchString(searchFields, (String.isNotBlank(searchKeyword) ? String.escapeSingleQuotes(searchKeyword) : ''));

        // Add filters
        System.debug(filterFields);
        sQuery += ((filterFields != null && filterFields != '') || filterExpression != '') ? makeFilterString(objectName, filterFields, filterValues, filterConditions, filterExpression) : '';

        // Add RecordType filter
        sQuery += (recordTypeNames != null && recordTypeNames != '') ? makeRecordTypeFilter(recordTypeNames) : '';

        // Query only owned records
        if(onlyOwned){
            sQuery += ' AND OwnerId =' + '\'' + userInfo.getUserId() +'\' ';
        }
        // Set order by string
        sQuery += makeOrderBy(orderBy);
        // Set number of records to query
        sQuery += ' LIMIT ' + numLimit;

        system.debug(sQuery);
        List<sObject> lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }

    @AuraEnabled
    public static sObject getCreatedRecord(String objectName) {
        DateTime dt = system.now().addSeconds(-5);
        String createdById = UserInfo.getUserId();
        String query = 'SELECT Id, Name FROM ' + objectName;
        query += ' WHERE CreatedById = :createdById ';
        query += ' AND CreatedDate > :dt ';
        query += ' ORDER BY CreatedDate DESC LIMIT 1';
        list<sObject> lobj = Database.query(query);
        if(lobj != null && lobj.size() > 0)
            return lobj[0];
        return null;
    }

    @TestVisible
    private static String makeQueryString(String s){
        String query = '';
        list<String> stringList = s.replaceAll(' ', '').split(',');

        Set<String> stringSet = new Set<String>(stringList);
        if(stringSet.size() > 0){
            for(String field : stringSet){
                if(String.isNotBlank((field))) query += ', ' + field;
            }
        }
        return query;
    }

    @TestVisible
    private static String makeSearchString(String searchFields, String searchKeyword){
        String query = '';
        if(searchFields != null && searchFields != ''){
            list<String> searchList = new list<String>();
            searchList = searchFields.replaceAll(' ', '').split(',');
            if(searchList.size() > 0){
                query += ' WHERE (Name LIKE \'%' + searchKeyword + '%\'';
                for(String field : searchList){
                    query += ' OR ' + field + ' LIKE \'%' + searchKeyword + '%\'';
                }
                query += ')';
            }
        } else {
            query += ' WHERE Name LIKE \'%' + searchKeyword + '%\'';
        }
        return query;
    }

    @TestVisible
    private static String makeFilterString(String objectName, String filterFields, String filterValues, String filterConditions, String filterExpression){
        String query = '';

        if(filterFields != null && filterFields != ''){
            list<String> fields = filterFields.replaceAll(' ', '').split(',');
            list<String> values = filterValues.replaceAll(' ', '').split(',');
            list<String> ops = filterConditions.replaceAll(' ', '').split(',');
            Integer cnt = fields.size();
    
            SObjectType objType = Schema.getGlobalDescribe().get(objectName);
            map<String, Schema.SObjectField> fieldMap = objType.getDescribe().fields.getMap();
    
            for(Integer i = 0; i < cnt; i++){
                Schema.SObjectField field = fieldMap.get(fields[i]);
                Schema.DescribeFieldResult fld = field.getDescribe();
                String fieldType = fld.getType().name();
                Boolean useNative = false;
                //if(values[i] == 'null' || values[i] == 'empty' || values[i] == 'true' || values[i] == 'false' /* || values[i].isNumeric() */ )
                if(values[i] == 'null' || values[i] == 'empty' || values[i] == 'true' || values[i] == 'false' 
                    || fieldType == 'INTEGER' || fieldType == 'CURRENCY' || fieldType == 'DOUBLE' 
                    || fieldType == 'DATE' || fieldType == 'DATETIME' || fieldType == 'BOOLEAN')
                    useNative = true;
                if(values[i] == 'empty') values[i] = '\'\'';
                query += ' AND ' + fields[i] + convertOperator(ops[i]) + (useNative ? values[i] : '\'' + values[i] + '\'');
            }
        }

        if(filterExpression != ''){
            query += ' AND (' + filterExpression + ') ';
        }

        return query;
    }

    @TestVisible
    private static String makeRecordTypeFilter(String recordTypeNames){
        String query = ' AND (';

        list<String> typeList = new list<String>();
        typeList = recordTypeNames.replaceAll(' ', '').split(',');
        if(typeList.size() > 0){
            Integer cnt = 0;
            for(String value : typeList){
                if(cnt > 0) query += ' OR ';
                query += ' RecordType.Name = \'' + value + '\' ';
                cnt++;
            }
        }

        query += ') ';

        return query;
    }

    @TestVisible
    private static String makeOrderBy(String orderBy){
        if(orderBy == null || orderBy == '') return ' ORDER BY Name ASC';
        String query = ' ORDER BY ';
        list<String> orderList = new list<String>();
        orderList = orderBy.split(',');
        if(orderList.size() > 0){
            for(String value : orderList){
                query += ' ' + value + ', ';
            }
        }

        query = query.substring(0, query.length() - 2);
        return query;
    }

    @TestVisible
    private static String convertOperator(String op){
        String operator = '';

        switch on op {
            when 'eq' {
                operator = ' = ';
            }
            when 'ne' {
                operator = ' != ';
            }
            when 'gt' {
                operator = ' > ';
            }
            when 'lt' {
                operator = ' < ';
            }
            when 'gte' {
                operator = ' >= ';
            }
            when 'lte' {
                operator = ' <= ';
            }
            when else {
                throw new CustomLookupException('specified filter confition is invalid!');
            }
        }

        return operator;
    }

    public class CustomLookupException extends Exception {}
}