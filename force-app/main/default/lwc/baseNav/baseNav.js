import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference  } from 'lightning/navigation';

// const CustomNavigate = Symbol('CustomNavigate');

export const CBaseNav = (Base) => {
    return class extends Base {
        testVal = '1';
        CustomNavigate() {console.log('CustomNavigate');}
        @wire(CurrentPageReference)
        tmpPageRef;

        // navigateToObjectHome(targetObject) {    
        //     this[NavigationMixin.Navigate]({
        //         type: 'standard__objectPage',
        //         attributes: {
        //             objectApiName: targetObject,
        //             actionName: 'home',
        //         },
        //     });
        // }
    };
};

CBaseNav.CustomNavigate = CustomNavigate;