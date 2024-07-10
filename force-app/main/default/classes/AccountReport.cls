public with sharing class AccountReport {

    public List<Account> accountList{get; set;}
    
    public List<ExcelBuilder.ExcelHeader> headers{get; set;}
    
    public AccountReport() {
        accountList = [select id, Name from Account];
        ExcelBuilder accTemplateBulider = new ExcelBuilder('a', 'Account');
        accTemplateBulider.initailize();
        headers = accTemplateBulider.getExcelHeaders();
    }

    //https://dkbmc-1ed-dev-ed.develop.lightning.force.com/apex/AccountReport
}