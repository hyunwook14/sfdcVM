public with sharing class AccountReport {

    public List<Account> accountList{get; set;}
    
    public AccountReport() {
        accountList = [select id, Name from Account];
    }
}