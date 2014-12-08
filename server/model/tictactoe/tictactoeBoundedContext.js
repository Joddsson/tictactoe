module.exports = function(eventStore, commandHandler){
  return {
    handleCommand : function(cmd){
    	console.log(cmd.timeStamp);
      var eventStream 	= eventStore.loadEvents(cmd.id);
      console.log(eventStream);
      var events 		= commandHandler(eventStream).executeCommand(cmd);
    	console.log("in bounded context");
    	console.log(events);
      eventStore.storeEvents(cmd.id, events);
      return events;
    }
  }
}