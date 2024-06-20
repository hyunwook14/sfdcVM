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

    @AuraEnabled
    public static Map<String,Object> getSearchData(Map<String,Object> params){
        try {
            Map<String,Object> result = new Map<String,Object>();
            result.put('params', params);

            String searchText = (params.get('searchText') != null) ? String.valueOf(params.get('searchText')) : '';
            String searchField = (params.get('searchField') != null) ? String.valueOf(params.get('searchField')) : '';
            String sObjectApi = (params.get('sObjectApi') != null) ? String.valueOf(params.get('sObjectApi')) : '';
            String fields     = (params.get('fields') != null) ? String.valueOf(params.get('fields')) : '';
            String orderByClause = (params.get('orderByClause') != null) ? String.valueOf(params.get('orderByClause')) : '';
            List<String> whereClauseList = 
            (params.get('whereClauseList') != null) ? 
            (List<String>) JSON.deserialize(JSON.serialize(params.get('whereClauseList')), List<String>.class) 
            : new List<String>();
            
            String whereLogicalOperator = (params.get('whereLogicalOperator') != null) ? String.valueOf(params.get('whereLogicalOperator')) : '';
            Integer limitNum = (params.get('limitNum') != null) ? Integer.valueOf(params.get('limitNum')) : 100;
            String query = '';
            String querySelect = 'select ' +fields;
            if(String.isBlank(sObjectApi)) throw new NullSobjectException('Not Defined sObjectApi');
            String queryFrom = ' from '+sObjectApi;
            String queryWhere = ' where id != null ';
            
            if(!whereClauseList.isEmpty()) {
                if(String.isNotBlank(whereLogicalOperator)) {
                    //
                    queryWhere += ' and ('+ String.format(whereLogicalOperator, whereClauseList) + ')';
                }else {
                    for(String whereClause : whereClauseList) {
                        queryWhere += ' and '+ whereClause;
                    }
                }
            }

            if(String.isNotBlank(searchText)) queryWhere += ' and Name like \'%'+searchText+'%\'';

            query += querySelect + queryFrom + queryWhere;
            if(String.isNotBlank(orderByClause)) query += orderByClause;
            if(limitNum > 0) query += ' limit '+limitNum;
        
            result.put('query', query);
            result.put('data', database.query(query));

            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class SearchParams {
        @AuraEnabled public String searchText;
        @AuraEnabled public String searchField;
        @AuraEnabled public String sObjectApi;
        @AuraEnabled public String fields;
        @AuraEnabled public String orderByClause;
        @AuraEnabled public String whereLogicalOperator;
        //@AuraEnabled public List<String> whereClauseList;
        @AuraEnabled public Integer limitNum;
           
    }

    
}