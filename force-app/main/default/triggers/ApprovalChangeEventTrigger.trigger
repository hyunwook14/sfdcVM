trigger ApprovalChangeEventTrigger on ProcessInstanceChangeEvent (after insert) {
	
    System.debug(Trigger.new.size());
    System.debug(JSON.serialize(Trigger.new));
}