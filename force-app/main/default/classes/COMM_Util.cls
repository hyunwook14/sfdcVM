/**
* 공통 메소드
*
*@group 공통
*@author 
*@since 2024-04-25  최초 작성
*/
public with sharing class COMM_Util {

    /**
     * 상태값 정의 enum
     * 
     */
    public enum StatusCode {
        SUCCESS, ERROR
    }

    /**
     * 암호화 타입 열거형 클래스
     */
    public enum Encryption {MD5, SHA1, SHA3_256, SHA3_384, SHA3_512, SHA_256, SHA_512}

    /**
     * 문자 암호화
     * 
     * @param text 암호화 대상 문자
     * @param type 암호화 타입
     * @return  `Blob`
     */
    public static Blob doEncryption(String text, Encryption type) {
        if(String.isBlank(text)) return null;
        if(type == null) return null;

        Blob hash = Crypto.generateDigest(type.name().replace('_', '-'), Blob.valueOf(text));
        return hash;
    }

    
    /**
     * AES128 방식 암호화
     * 
     * @param targetData 암호화할 데이터
     * @return  `EncryptionResult`
     */
    public static EncryptionResult processEncryption(string targetData){
        Blob cryptoKey = Crypto.generateAesKey(128); 
        String strkey = EncodingUtil.base64Encode(cryptoKey);
        Blob data = Blob.valueOf(targetData); 
        Blob encryptedData = Crypto.encryptWithManagedIV('AES128', cryptoKey, data ); 
        string b64Data = EncodingUtil.base64Encode(encryptedData);  

        return new EncryptionResult(strkey, b64Data);
    }
    public class EncryptionResult {
        public String key {get;set;}
        public String encrypteValue {get;set;}
        public EncryptionResult(String key, String encrypteValue) {
            this.key = key;
            this.encrypteValue = encrypteValue;
        }
    }

    /**
     * AES128 방식 복호화
     * 
     * @param encrypteValue 복호화할 데이터
     * @param key 복호화 Key
     * @return  `DecryptionResult`
     */
    public static DecryptionResult processDecryption(string encrypteValue, String key){
        DecryptionResult result = new DecryptionResult();
        Blob data = EncodingUtil.base64Decode(encrypteValue);
        Blob privateKey = EncodingUtil.base64Decode(key);

        try{ 
            Blob dataToDecrypt = Crypto.decryptWithManagedIV('AES128', privateKey, data);
            result.decryptedData = dataToDecrypt.toString();
            result.isSuccess = true;
        } catch(Exception e){
            result.errorMessage = e.getMessage();
            result.isSuccess = false;
        }

        return result;
    }

    public class DecryptionResult {
        public Boolean isSuccess {get;set;}
        public String decryptedData {get;set;}
        public String errorMessage {get;set;}
    }

    /**
     * 운영 및 Sandbox 유형 조회
     * orgarniztion type: PRODUCTION/FULL/PARTIAL/DEVELOPER_PRO/DEVELOPER
     * 
     * @return  `String`
     */
    public static String getOrganizationType() {
        String organiztionType = '';
        Boolean isSandbox;
        try{
            isSandbox = [SELECT IsSandbox, OrganizationType FROM Organization WHERE Id = :System.UserInfo.getOrganizationId()]?.IsSandbox;
            if(isSandbox) {
                Integer storageLimit = OrgLimits.getMap().get('DataStorageMB').getLimit();
                switch on storageLimit{
                    when 200 {
                        organiztionType = 'DEVELOPER';
                    }
                    when 1024 {
                        organiztionType = 'DEVELOPER_PRO';
                    }
                    when 5120 {
                        organiztionType = 'PARTIAL';
                    }
                    when else {
                        organiztionType = 'FULL';
                    }
                }
            } else {
                organiztionType = 'PRODUCTION';
            }

        } catch(Exception e) {

        }  
        
        return organiztionType;
    }
}