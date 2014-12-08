module.exports = function(){
  var store = {};
  console.log("in eventstore");
  return {
    loadEvents : function(id){
    	console.log("in load events");
    	console.log(store[id]);
      return store[id] || [];
    },
    storeEvents: function(id, events){
      store[id] = (store[id] || []).concat(events);
    }
  }
}