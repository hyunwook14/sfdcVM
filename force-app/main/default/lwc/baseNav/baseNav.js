import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

// 다중 상속 불가...
export const chainBases = (Bases) => {
    return chunk(Bases, Bases.pop());
}

const chunk = (Bases, chainBase) => {
    if(Bases.length > 0) {
        let tmpBase = Bases.pop();
        Object.setPrototypeOf(tmpBase.prototype, chainBase.prototype);
        
        chunk(Bases, tmpBase);
    }
    
    return chainBase;
}

export const CustomBaseNav = (Base) => {
    return class extends NavigationMixin(Base) {
        @wire(CurrentPageReference)
        pageRef;

        navigateToApp(targetApp, replace) {
            this[NavigationMixin.Navigate]({
                type: 'standard__app',
                attributes: {
                    appTarget: targetApp,
                }
            }, replace);
        }
    
        navigateToRecordInApp(targetApp, targetObject, targetId, replace) {
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
            }, replace);
        }
    
        navigateToLightningComponent(targetComponent, params, replace) {
            this[NavigationMixin.Navigate]({
                type: 'standard__component',
                attributes: {
                    componentName: targetComponent
                },
                state: params
            }, replace);
        }
    
        navigateToCustomTab(targetCustomTab, replace) {
            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: targetCustomTab
                }
            }, replace);
        }
    
        navigateToObjectHome(targetObject, replace) {    
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: targetObject,
                    actionName: 'home',
                },
            }, replace);
        }
    
        navigateToCustom(pageRef, replace) {
            this[NavigationMixin.Navigate](pageRef, replace);
        }

        async generateToCustom(pageRef) {
            return this[NavigationMixin.GenerateUrl](pageRef).then((url)=>url);
        }
    };
};