({
    onPageReferenceChange : function(component, event, helper) {
        console.log('onPageReferenceChange ::')
        let pageReference = component.get("v.pageReference");
        let navService = component.find("navService");

        if(pageReference.state) {
            let movePageRef = pageReference.state.c__pageRef;
            console.log(
                movePageRef
            );
            if(movePageRef) movePageRef = JSON.parse(movePageRef);

            // let recordId = movePageRef.attributes.recordId;
            // var editRecordEvent = $A.get("e.force:editRecord");
            //     editRecordEvent.setParams({
            //         "recordId": recordId
            // });
            // editRecordEvent.fire();
            // console.log('e.force:editRecord');
            //호출

    
            if(pageReference.state.c__IsBackgroundInfo) {
                if(!movePageRef.state) movePageRef.state = {};
                movePageRef.state.backgroundContext = `/lightning/r/${movePageRef.attributes.apiName}/${movePageRef.attributes.recordId}/view`
                // movePageRef.state.count=1;

            }


            navService.navigate(movePageRef, true);
            // setTimeout(()=> navService.navigate(movePageRef, true), 1000);
            // setTimeout(()=> navService.navigate(movePageRef, true), 3000);   
        }
    }
})