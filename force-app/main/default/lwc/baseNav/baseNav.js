import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

const extendsBase = (Base) => {
    return class extends Base {
    }
}

export const CustomBaseNav = (Base) => {
    return class extends NavigationMixin(extendsBase(Base)) {
        @wire(CurrentPageReference)
        pageRef;

        navigateToApp(targetApp) {
            this[NavigationMixin.Navigate]({
                type: 'standard__app',
                attributes: {
                    appTarget: targetApp,
                }
            });
        }
    
        navigateToRecordInApp(targetApp, targetObject, targetId) {
            this[NavigationMixin.Navigate]({
                type: 'standard__app',
                attributes: {
                    appTarget: targetApp,
                    pageRef: {
                        type: 'standard__recordPage',
                        attributes: {
                            objectApiName: targetObject,
                            recordId: targetId,
                            actionName: 'view'
                        }
                    }
                }
            });
        }
    
        navigateToLightningComponent(targetComponent, params) {
            this[NavigationMixin.Navigate]({
                type: 'standard__component',
                attributes: {
                    componentName: targetComponent
                },
                state: params
            });
        }
    
        navigateToCustomTab(targetCustomTab) {
            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: targetCustomTab
                }
            });
        }
    
        navigateToObjectHome(targetObject) {    
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: targetObject,
                    actionName: 'home',
                },
            });
        }
    
        navigateToCustom(pageRef) {
            this[NavigationMixin.Navigate](pageRef);
        }

        async generateToCustom(pageRef) {
            return this[NavigationMixin.GenerateUrl](pageRef).then((url)=>url);
        }
    };
};


// export const CustomBaseNav2 = (Base) =>{
//     return class extends CustomBaseNav(extendsBase(Base)) {
//         testSuccess=true
//     };
// };