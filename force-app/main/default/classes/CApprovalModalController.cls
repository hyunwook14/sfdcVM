public with sharing class CApprovalModalController {
    public CApprovalModalController() {

    }

    /* #MDMRequest Wrapper */
    public class MDMRequest {
        @AuraEnabled public String Id{get;set;}                           // ID               
        @AuraEnabled public String CurrencyIsoCode{get;set;}              // 통화 ISO 코드                               
        @AuraEnabled public String ExternalId{get;set;}                   // 외부 ID                       
        @AuraEnabled public String DisplayUrl{get;set;}                   // URL 표시                       
        @AuraEnabled public String Account{get;set;}                      // 고객                       
        @AuraEnabled public String Accounttype{get;set;}                  // 고객 타입                           
        @AuraEnabled public String Createdbyid{get;set;}                  // 작성자 ID                           
        @AuraEnabled public String Createdbyname{get;set;}                // 작성자 이름                           
        @AuraEnabled public String Createddate{get;set;}                  // 작성 일자                           
        @AuraEnabled public String Customersendfailreason{get;set;}       // 고객 전송 실패 이유                                   
        @AuraEnabled public String PV_CRMNO{get;set;}                     // Pv_crmno                       
        @AuraEnabled public String INSTANCEID{get;set;}                   // 인스턴스ID                       
        @AuraEnabled public Boolean ISSELF_PV_BIZPLCODE{get;set;}          // OnlyOneFoodNet사업장ID Self 여부                                   
        @AuraEnabled public Boolean ISSELF_PV_CHARGECUST{get;set;}         // 청구처 Self                                    
        @AuraEnabled public Boolean ISSELF_PV_DELICUST{get;set;}           // 배송 관리처 Self                                
        @AuraEnabled public Boolean ISSELF_PV_HKUNNR{get;set;}             // 본점 자동생성                                
        @AuraEnabled public Boolean ISSELF_PV_PAYCUST{get;set;}            // 지급처 Self                                
        @AuraEnabled public Boolean ISSELF_PV_SALESCUST{get;set;}          // 판매처 Self                                    
        @AuraEnabled public String Lastmodifiedbyid{get;set;}             // 최종 수정자                                
        @AuraEnabled public String Lastmodifiedbyname{get;set;}           // 최종 수정자                                
        @AuraEnabled public String Lastmodifieddate{get;set;}             // 최종 수정 일자                               
        @AuraEnabled public String Mdmregrequestbulkcustomer{get;set;}    // MDM 대량 고객 등록 및 수정 요청                                       
        @AuraEnabled public String Name{get;set;}                         // Name                   
        @AuraEnabled public String OPCODE{get;set;}                       // 업무코드MD002                   
        @AuraEnabled public String Opportunity{get;set;}                  // 영업활동                           
        @AuraEnabled public String PROCID{get;set;}                       // 프로세스ID                   
        @AuraEnabled public String PV_ADMINMA{get;set;}                   // 담당AMA 코드                       
        @AuraEnabled public String PV_ADMINMA_lu{get;set;}                // 담당AMA                           
        @AuraEnabled public String PV_ADRES_ADDR1{get;set;}               // 주소 - 기본주소                           
        @AuraEnabled public String PV_ADRES_ADDR2{get;set;}               // 주소 - 상세주소                           
        @AuraEnabled public String PV_ADRES_ROADADDR1{get;set;}           // 주소 - 도로명 기본주소                               
        @AuraEnabled public String PV_ADRES_ROADADDR2{get;set;}           // 주소 - 도로명 상세주소                               
        @AuraEnabled public String PV_ADRES_ZIPCODE{get;set;}             // 주소 - 우편번호                               
        @AuraEnabled public String PV_BIZPLCODE{get;set;}                 // OnlyOneFoodNet사업장ID 코드                           
        @AuraEnabled public String PV_BIZPLCODE_lu{get;set;}              // OnlyOneFoodNet사업장ID                               
        @AuraEnabled public Boolean PV_BLCKYN{get;set;}                    // 사용중지                       
        @AuraEnabled public String PV_CHARGECUST{get;set;}                // 청구처 코드                           
        @AuraEnabled public String PV_CHARGECUST_lu{get;set;}             // 청구처                               
        @AuraEnabled public String Mdmcreateddate{get;set;}               // Mdmcreateddate                           
        @AuraEnabled public String Mdmlastmodifieddate{get;set;}          // Mdmlastmodifieddate                                   
        @AuraEnabled public String PV_DELICUST{get;set;}                  // 배송 관리처 코드                           
        @AuraEnabled public String PV_DELICUST_lu{get;set;}               // 배송 관리처                           
        @AuraEnabled public String PV_FITYP{get;set;}                     // 과세유형 코드                       
        @AuraEnabled public String PV_FITYP_lu{get;set;}                  // 과세유형                           
        @AuraEnabled public String PV_GFORM{get;set;}                     // 법적상태 코드                       
        @AuraEnabled public String PV_GFORM_lu{get;set;}                  // 법적상태                           
        @AuraEnabled public Boolean PV_HDOFFICEYN{get;set;}               // 본점사용 유무                           
        @AuraEnabled public String PV_HKUNNR{get;set;}                    // 본점코드 코드                       
        @AuraEnabled public String PV_HKUNNR_lu{get;set;}                 // 본점코드                           
        @AuraEnabled public String PV_J_1KFREPRE{get;set;}                // 대표자이름                           
        @AuraEnabled public String PV_J_1KFTBUS{get;set;}                 // 업태                           
        @AuraEnabled public String PV_J_1KFTIND{get;set;}                 // 업종                           
        @AuraEnabled public String PV_KNVKTYPE{get;set;}                  // 주문유형 코드                           
        @AuraEnabled public String PV_KNVKTYPE_lu{get;set;}               // 주문유형                           
        @AuraEnabled public String Mdmregrequestcustomer{get;set;}        // Mdmregrequestcustomer                                   
        @AuraEnabled public String PV_KUNNR{get;set;}                     // 고객ID                       
        @AuraEnabled public String PV_LAND1{get;set;}                     // 국가키 코드                       
        @AuraEnabled public String PV_LAND1_lu{get;set;}                  // 국가키                           
        @AuraEnabled public String PV_LIFNR{get;set;}                     // 수수료지급처 코드                       
        @AuraEnabled public String PV_LIFNR_lu{get;set;}                  // 수수료지급처                           
        @AuraEnabled public String PV_LOGISCENTER{get;set;}               // FW 출고센터 코드                           
        @AuraEnabled public String PV_LOGISCENTER_lu{get;set;}            // FW 출고센터                               
        @AuraEnabled public String PV_NAME1{get;set;}                     // 고객명(영문명 포함)                       
        @AuraEnabled public String PV_NAME2{get;set;}                     // 고객약칭명(변경)                       
        @AuraEnabled public String PV_NAME_G{get;set;}                    // 고객명(G) / 자국명                       
        @AuraEnabled public String PV_OLDCD{get;set;}                     // 구코드(As-Is)                       
        @AuraEnabled public String PV_ORDERMA{get;set;}                   // 수주MA                       
        @AuraEnabled public String PV_PAYCUST{get;set;}                   // 지급처 코드                       
        @AuraEnabled public String PV_PAYCUST_lu{get;set;}                // 지급처                           
        @AuraEnabled public String PV_PERNR{get;set;}                     // 담당MA 코드                       
        @AuraEnabled public String PV_PERNR_lu{get;set;}                  // 담당MA                           
        @AuraEnabled public String PV_REGIO{get;set;}                     // 지역 코드                       
        @AuraEnabled public String PV_REGIO_lu{get;set;}                  // 지역                           
        @AuraEnabled public String PV_SALESCUST{get;set;}                 // 판매처 코드                           
        @AuraEnabled public String PV_SALESCUST_lu{get;set;}              // 판매처                               
        @AuraEnabled public String PV_STATUSTYPE{get;set;}                // 중단유형                           
        @AuraEnabled public String PV_STCD1{get;set;}                     // 대표자 생년월일                       
        @AuraEnabled public String PV_STCD2{get;set;}                     // 사업자등록번호                       
        @AuraEnabled public String PV_STCD3{get;set;}                     // 법인코드                       
        @AuraEnabled public String PV_STCD4{get;set;}                     // 종사업자번호                       
        @AuraEnabled public String PV_STCDT{get;set;}                     // 세금계산서발행유형 코드                       
        @AuraEnabled public String PV_STCDT_lu{get;set;}                  // 세금계산서발행유형                           
        @AuraEnabled public Boolean PV_SUBSIDIARYYN{get;set;}             // 관계사여부                               
        @AuraEnabled public String PV_TELF1{get;set;}                     // 전화번호                       
        @AuraEnabled public String PV_TELFX{get;set;}                     // 팩스번호                       
        @AuraEnabled public String PV_VBUND{get;set;}                     // 관계사 코드 코드                       
        @AuraEnabled public String PV_VBUND_lu{get;set;}                  // 관계사 코드                           
        @AuraEnabled public String PV_VKGRP{get;set;}                     // 영업그룹 코드                       
        @AuraEnabled public String PV_VKGRP_lu{get;set;}                  // 영업그룹                           
        @AuraEnabled public String PVN_LOGISCENTER{get;set;}              // FW 출고센터(유효일자 관리 필요) - 속성의 미래 값                               
        @AuraEnabled public String PVN_PERNR{get;set;}                    // 담당MA (유효일자) - 속성의 미래 값                       
        @AuraEnabled public String PVN_VKGRP{get;set;}                    // 영업그룹(유효기간 관리) - 속성의 미래 값                       
        @AuraEnabled public String REQACTORID{get;set;}                   // 요청자ID                       
        @AuraEnabled public String Validationfailreason{get;set;}         // 유효성검사 실패 이유                                   
        @AuraEnabled public String WF_DESCRIPTION{get;set;}               // 결재의견                           
        @AuraEnabled public String Approvalstatus{get;set;}               // 승인 상태                           
        @AuraEnabled public String Customersendstatus{get;set;}           // 고객 전송 상태                               
        @AuraEnabled public String PV_CUSTTYPE{get;set;}                  // 고객유형                           
        @AuraEnabled public String PV_KTOKD{get;set;}                     // 고객계정그룹                       
        @AuraEnabled public String Reqtype{get;set;}                      // 배치 여부                       
        @AuraEnabled public String Requesttype{get;set;}                  // 요청 타입                           
        @AuraEnabled public String Validationcheckstatus{get;set;}        // 유효성검사 상태                                   
        @AuraEnabled public String PVVF_LOGISCENTER{get;set;}             // FW 출고센터(유효일자 관리 필요) - 미래 속성의 VALID FROM                               
        @AuraEnabled public String PVVF_PERNR{get;set;}                   // 담당MA (유효일자) - 미래 속성의 VALID FROM                       
        @AuraEnabled public String PVVF_VKGRP{get;set;}                   // 영업그룹(유효기간 관리) - 미래 속성의 VALID FROM                       
        @AuraEnabled public Date PV_CLOSEDT{get;set;}                     // 휴폐업일자  

        /** External Object 회계정보 (Mdmregreqcustfinance__x) */
        @AuraEnabled public String Mdmregreqcust{set;get;}                // MDM 고객 생성 및 수정 요청                      
        @AuraEnabled public String PV_AKONT{set;get;}                     // 조정계정 코드                  
        @AuraEnabled public String PV_AKONT_LU{set;get;}                  // 조정계정                      
        @AuraEnabled public String PV_BUSAB{set;get;}                     // 매출형태 코드                  
        @AuraEnabled public String PV_BUSAB_LU{set;get;}                  // 매출형태                      
        @AuraEnabled public String PV_CESSION_KZ{set;get;}                // 고객상태 코드                      
        @AuraEnabled public String PV_CESSION_KZ_LU{set;get;}             // 고객상태                          
        @AuraEnabled public String PV_FDGRV{set;get;}                     // 현금관리그룹 코드                  
        @AuraEnabled public String PV_FDGRV_LU{set;get;}                  // 현금관리그룹                      
        @AuraEnabled public String PV_KATR5{set;get;}                     // 세금납부방법 코드                  
        @AuraEnabled public String PV_KATR5_LU{set;get;}                  // 세금납부방법                      
        @AuraEnabled public String PV_TAXKDD{set;get;}                    // 세금분류 코드                  
        @AuraEnabled public String PV_TAXKDD_LU{set;get;}                 // 세금분류                      
        @AuraEnabled public String PV_VRSDG{set;get;}                     // 입금여부(FS만 사용) 코드                  
        @AuraEnabled public String PV_VRSDG_LU{set;get;}                  // 입금여부(FS만 사용                      
        @AuraEnabled public String PV_ZUAWA{set;get;}                     // 정렬키 코드                  
        @AuraEnabled public String PV_ZUAWA_LU{set;get;}                  // 정렬키

        /** External Object 영업정보 (Mdmregreqcustsales__x) */
        @AuraEnabled public String PV_CUHR1{get;set;}                      // 고객그룹 코드         
        @AuraEnabled public String PV_CUHR1_lu{get;set;}                   // 고객그룹             
        @AuraEnabled public String PV_DELIGROUP{get;set;}                  // 배송그룹 코드             
        @AuraEnabled public String PV_DELIGROUP_lu{get;set;}               // 배송그룹                 
        @AuraEnabled public String PV_DSTRHISTREGYN{get;set;}              // 유통이력 신고대상 유형 코드                 
        @AuraEnabled public String PV_DSTRHISTREGYN_lu{get;set;}           // 유통이력 신고대상 유형                     
        @AuraEnabled public String PV_ENTERCOND1{get;set;}                 // 차량 진입조건-1 코드             
        @AuraEnabled public String PV_ENTERCOND1_lu{get;set;}              // 차량 진입조건-1                 
        @AuraEnabled public Boolean PV_EXAMYN{get;set;}                     // 대면검수여부         
        @AuraEnabled public String PV_FDCTINFO{get;set;}                   // 초도배송 담당자 연락처             
        @AuraEnabled public Boolean PV_FDINFO{get;set;}                     // 초도배송 정보공유         
        @AuraEnabled public String PV_FDNOTICE{get;set;}                   // 초도배송 시 전달사항             
        @AuraEnabled public String PV_FDREQT{get;set;}                     // 초도배송 요청시간         
        @AuraEnabled public Boolean PV_ISFDFTF{get;set;}                    // 초도배송 대면검수         
        @AuraEnabled public String PV_KATR10{get;set;}                     // 출하권역 코드         
        @AuraEnabled public String PV_KATR10_lu{get;set;}                  // 출하권역             
        @AuraEnabled public String PV_KDGRP{get;set;}                      // 여신관리(고객향) 코드         
        @AuraEnabled public String PV_KDGRP_lu{get;set;}                   // 여신관리(고객향             
        @AuraEnabled public String PV_KEYINFO{get;set;}                    // 업장key 정보         
        @AuraEnabled public Boolean PV_KEYYN{get;set;}                      // 업장key 여부         
        @AuraEnabled public String PV_KONDA{get;set;}                      // 가격그룹 코드         
        @AuraEnabled public String PV_KONDA_lu{get;set;}                   // 가격그룹             
        @AuraEnabled public String PV_KULTG{get;set;}                      // 약정회전일         
        @AuraEnabled public String PV_KVGR1{get;set;}                      // 단가그룹 코드         
        @AuraEnabled public String PV_KVGR1_lu{get;set;}                   // 단가그룹             
        @AuraEnabled public String PV_KVGR2{get;set;}                      // 장려금유형 코드         
        @AuraEnabled public String PV_KVGR2_lu{get;set;}                   // 장려금유형             
        @AuraEnabled public String PV_KVGR3{get;set;}                      // 납품서유형 코드         
        @AuraEnabled public String PV_KVGR3_BOT{get;set;}                  // 납품서 하단유형 코드             
        @AuraEnabled public String PV_KVGR3_BOT_lu{get;set;}               // 납품서 하단유형                 
        @AuraEnabled public String PV_KVGR3_lu{get;set;}                   // 납품서유형             
        @AuraEnabled public Boolean PV_KXOTD{get;set;}                      // KX OTD         
        @AuraEnabled public String PV_KXOTDTIME{get;set;}                  // KX OTD 요청시간             
        @AuraEnabled public String PV_ODCLOSEGB{get;set;}                  // 고객 주문마감 유형코드             
        @AuraEnabled public String PV_ODCLOSEGB_lu{get;set;}               // 고객 주문마감 유형                 
        @AuraEnabled public String PV_OLD_BIZPLACE_NEW{get;set;}           // 경로(사업부) 코드                     
        @AuraEnabled public String PV_OLD_BIZPLACE_NEW_lu{get;set;}        // 경로(사업부                     
        @AuraEnabled public String PV_STRACHANNEL{get;set;}                // 전략경로 코드                  
        @AuraEnabled public String PV_STRACHANNEL_lu{get;set;}             // 전략경로                     
        @AuraEnabled public String PV_PRODLOADCOND{get;set;}               // 상품적재조건                 
        @AuraEnabled public String PV_RETURNLOC{get;set;}                  // 반품회수 위치             
        @AuraEnabled public String PV_SHAPE{get;set;}                      // 외형(정원         
        @AuraEnabled public String PV_SHIPREQTIME{get;set;}                // OTD(배송요구시간             
        @AuraEnabled public String PV_SHIPTYPE{get;set;}                   // 배송유형 코드             
        @AuraEnabled public String PV_SHIPTYPE_lu{get;set;}                // 배송유형             
        @AuraEnabled public String PV_TEMPTARGET{get;set;}                 // 온도기록지 제출 대상 여부 코드             
        @AuraEnabled public String PV_TEMPTARGET_lu{get;set;}              // 온도기록지 제출 대상 여부                 
        @AuraEnabled public String PV_UNLOADCOND1{get;set;}                // 하역조건-1 코드             
        @AuraEnabled public String PV_UNLOADCOND1_lu{get;set;}             // 하역조건-1                 
        @AuraEnabled public String PV_UNLOADCOND2{get;set;}                // 하역조건-2 코드             
        @AuraEnabled public String PV_UNLOADCOND2_lu{get;set;}             // 하역조건-2                 
        @AuraEnabled public Boolean PV_VACCPRTEXCYN{get;set;}               // 가상계좌 출력 제외                 
        @AuraEnabled public String PV_WAERS{get;set;}                      // 통화 코드         
        @AuraEnabled public String PV_WAERS_lu{get;set;}                   // 통화             
        @AuraEnabled public String PV_ZTERM_VV{get;set;}                   // 지급조건 코드             
        @AuraEnabled public String PV_ZTERM_VV_lu{get;set;}                // 지급조건             
        @AuraEnabled public String PVN_CUHR1{get;set;}                     // 고객그룹 - 속성의 미래 값         
        @AuraEnabled public String PVN_KONDA{get;set;}                     // 가격그룹(유효일자 관리 필요) - 속성의 미래 값         
        @AuraEnabled public String PVN_KVGR1{get;set;}                     // 단가그룹(유효일자 관리 필요) - 속성의 미래 값         
        @AuraEnabled public String PVN_OLD_BIZPLACE_NEW{get;set;}          // 경로(사업부) - 속성의 미래 값                     
        @AuraEnabled public String PVVF_CUHR1{get;set;}                    // 고객그룹 - 미래 속성의 VALID FROM         
        @AuraEnabled public String PVVF_KONDA{get;set;}                    // 가격그룹(유효일자 관리 필요) - 미래 속성의 VALID FROM         
        @AuraEnabled public String PVVF_KVGR1{get;set;}                    // 단가그룹(유효일자 관리 필요) - 미래 속성의 VALID FROM         
        @AuraEnabled public String PVVF_OLD_BIZPLACE_NEW{get;set;}         // 경로(사업부) - 미래 속성의 VALID FROM                     
        @AuraEnabled public String PV_FDREQD{get;set;}                     // 초도배송 요청일자
        
        /** inputField  */
        @AuraEnabled public String inputpv_gform{get;set;}                 // 법적상태                                             
        @AuraEnabled public String inputpv_vkgrp{get;set;}                 // 영업그룹                                             
        @AuraEnabled public String inputpv_LOGISCENTER{get;set;}           // FW 출고센터                                            
        @AuraEnabled public String inputpv_bizplcode{get;set;}             // 온푸넷ID
        @AuraEnabled public String inputpv_stcdt{get;set;}                 // 세금계산서발행유형 (모달호출)                                           
        @AuraEnabled public String inputpv_fityp{get;set;}                 // 과세유형                           
        @AuraEnabled public String inputpv_vbund{get;set;}                 // 관계사 코드                           
        @AuraEnabled public String inputpv_land1{get;set;}                 // 국가키 (정해둔값이 있음.)                           
        @AuraEnabled public String inputpv_knvktype{get;set;}              // 주문유형                              
        @AuraEnabled public String inputpv_regio{get;set;}                 // 지역                          
        @AuraEnabled public String inputpv_KNVKGB{get;set;}                // 담당자 유형                           
        @AuraEnabled public String inputpv_busab{get;set;}                 // 매출형태                           
        @AuraEnabled public String inputpv_cession_kz{get;set;}            // 고객상태                               
        @AuraEnabled public String inputpv_zuawa{get;set;}                 // 정렬키                           
        @AuraEnabled public String inputpv_akont{get;set;}                 // 조정계정                          
        @AuraEnabled public String inputpv_fdgrv{get;set;}                 // 현금관리그룹                           
        @AuraEnabled public String inputpv_vrsdg{get;set;}                 // 입금여부                           
        @AuraEnabled public String inputpv_taxkdd{get;set;}                // 세금분류                           
        @AuraEnabled public String inputpv_katr5{get;set;}                 // 세금납부방법                           
        @AuraEnabled public String inputpv_cuhr1{get;set;}                 // 고객그룹                           
        @AuraEnabled public String inputpv_konda{get;set;}                 // 가격그룹                           
        @AuraEnabled public String inputpv_kvgr1{get;set;}                 // 단가그룹                           
        @AuraEnabled public String inputpv_waers{get;set;}                 // 통화                           
        @AuraEnabled public String inputpv_kvgr3{get;set;}                 // 납품서유형                           
        @AuraEnabled public String inputpv_kvgr2{get;set;}                 // 장려금유형  
        @AuraEnabled public String inputpv_kvgr3_bot{get;set;}             // 납품서 하단유형                                
        @AuraEnabled public String inputpv_odclosegb{get;set;}             // 고객 주문 마감 유형코드                              
        @AuraEnabled public String inputpv_zterm_vv{get;set;}              // 지급조건                              
        @AuraEnabled public String inputpv_dstrhistregyn{get;set;}         // 유통이력 신고대상 유형                                    
        @AuraEnabled public String inputpv_old_bizplace_new{get;set;}      // 경로(사업부)                                       
        @AuraEnabled public String inputpv_strachannel{get;set;}           // 전략경로                                       
        @AuraEnabled public String inputpv_entercond1{get;set;}            // 차량 진입조건-1                               
        @AuraEnabled public String inputpv_unloadcond1{get;set;}           // 하역조건-1                                
        @AuraEnabled public String inputpv_unloadcond2{get;set;}           // 하역조건-2                              
        @AuraEnabled public String inputpv_deligroup{get;set;}             // 배송그룹                               
        @AuraEnabled public String inputPV_KATR10{get;set;}                // 출하권역                           
        @AuraEnabled public String inputpv_shiptype{get;set;}              // 배송유형                               
        @AuraEnabled public String inputpv_temptarget{get;set;}            // 온도기록지 제출 대상 여부       
        @AuraEnabled public String inputpv_lifnr{get;set;}                 // 수수료지급처                           
        @AuraEnabled public String inputpv_kdgrp{get;set;}                 // 여신관리(고객향                
    }

    @AuraEnabled
    public static Object apexCallToServer(Map<String,Object> params){
        try {
            String methodName = (String)params.get('methodName');
            Output result = new Output(methodName, params, null);

            Callable actionBulider = 
                (Callable) Type.forName('CApprovalModalController.ActionBuilder').newInstance();
            
            result.setResponse(actionBulider.call(methodName, params));

            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public inherited sharing class ActionBuilder implements Callable {
        
        public Object getProgressingApproval(String targetId) {
            Map<String,Object> response = new Map<String,Object>();
            CustomApproval progressingApproval = new CustomApproval(targetId, null);
            response.put('progressingApproval', progressingApproval.getWorkItemInfo());
            return response;
        }

        public Object approval(String targetId, String comments, String nextApproverId) {
            CustomApproval approval = new CustomApproval(targetId, comments, nextApproverId, 'Approve');
            return approval.actionApprovalAndReject();
        }

        public Object call(String action, Map<String, Object> args) {
            switch on action {
                when 'getProgressingApproval' {
                    return this.getProgressingApproval((String)args.get('targetId'));
                }
                when 'approval' {
                    return this.approval((String)args.get('targetId'), (String)args.get('comments'), (String)args.get('nextApproverId'));
                }
                when else {
                    throw new CApprovalModalController.ExtensionMalformedCallException('Method not implemented');
                }
            }
        }
        
    }


    public class CustomApproval {

        private String targetObjectId;
        private String comments;
        private String nextApprovalUserId; //승인할 UserId
        private String actionType; //Approve, Reject, or Removed. Only system administrators can specify Removed.

        public CustomApproval() {}
        public CustomApproval(String targetObjectId, String comments) {
            this.targetObjectId = targetObjectId;
            this.comments = comments;
        }
        public CustomApproval(String targetObjectId, String comments, String nextApprovalUserId) {
            this(targetObjectId, comments);
            this.nextApprovalUserId = nextApprovalUserId;
        }
        public CustomApproval(String targetObjectId, String comments, String nextApprovalUserId, String actionType) {
            this(targetObjectId, comments, nextApprovalUserId);
            this.actionType = actionType;
        }

        public void setTargetObjectId(String targetObjectId) {
            this.targetObjectId = targetObjectId;
        }

        public String getTargetObjectId() {
            return this.targetObjectId;
        }

        public void setNextApprovalUserId(String nextApprovalUserId) {
            this.nextApprovalUserId = nextApprovalUserId;
        }

        public String setNextApprovalUserId() {
            return this.nextApprovalUserId;
        }

        public void setComments(String comments) {
            this.comments = comments;
        }

        public String getComments() {
            return this.comments;
        }

        public void setActionType(String actionType) {
            this.actionType = actionType;
        }

        public String getActionType() {
            return this.actionType;
        }

        public Object submit() {
            Approval.ProcessSubmitRequest req = new Approval.ProcessSubmitRequest();
            req.setComments(this.comments);
            req.setObjectId(this.targetObjectId);
            req.setNextApproverIds(new Id[]{this.nextApprovalUserId});
            // req.setSubmitterId(UserInfo.getUserId()); //Set 미설정시 현재 User 로
            // req.setProcessDefinitionNameOrId('Approval2_1'); //승인 프로세스명 혹은 Id 미설정시 현재 TargetObejct 기준으로 프로세스 진행
            // Skip the criteria evaluation for the specified process
            // req.setSkipEntryCriteria(true);
            Approval.ProcessResult result = Approval.process(req);
            System.debug(result.isSuccess());
            System.debug(result.getInstanceStatus());
            return result.isSuccess();
        }

        public Object actionApprovalAndReject() {
            if(String.isBlank(this.targetObjectId)) throw new CApprovalModalController.NoTargetObjectIdException('TargetObjectId is Required');
            String workItemId = this.getWorkItemInfo().Id;
            
            Approval.ProcessWorkitemRequest reqApproval = new Approval.ProcessWorkitemRequest();
            reqApproval.setComments(this.comments);
            reqApproval.setAction(this.actionType);
            reqApproval.setWorkItemId(workItemId);
            reqApproval.setNextApproverIds(new Id[]{UserInfo.getUserId()});
            Approval.ProcessResult result = Approval.process(reqApproval);
            System.debug(result.isSuccess());
            System.debug(result.getInstanceStatus());
            return result.isSuccess();
        }

        public ProcessInstanceWorkitem getWorkItemInfo() {
            if(String.isBlank(this.targetObjectId)) throw new CApprovalModalController.NoTargetObjectIdException('TargetObjectId is Required');
            
            ProcessInstanceWorkitem workItem;
            Set<String> approvalMasterId = new Set<String>();
            for(ProcessInstance approvalMaster :[
                select id, ProcessDefinition.Name, Status from ProcessInstance where TargetObjectId = :this.targetObjectId and LastActorId = null
            ]) {
                approvalMasterId.add(approvalMaster.id);
            }

            for(ProcessInstanceWorkitem searchWorkItem :[
                select id, OriginalActorId, OriginalActor.Name, ActorId, Actor.Name
                from ProcessInstanceWorkitem where ProcessInstanceId IN :approvalMasterId
            ]){
                workItem = searchWorkItem;
            }
            return workItem;
        }
    }

    //Exception
    public class ExtensionMalformedCallException extends Exception {}
    public class NoTargetObjectIdException extends Exception {}

    public class Output {
        @AuraEnabled public String methodName;
        @AuraEnabled public Object params;
        @AuraEnabled public Object response;

        public Output(){}
        public Output(String methodName, Object params, Object response){
            this.methodName = methodName;
            this.params = params;
            this.response = response;
        }

        public void setResponse(Object response) {
            this.response = response;
        }
    }
}