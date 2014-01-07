if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too  
    scriptJQuery = document.createElement( 'script' );  
    scriptJQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';   
    scriptJQuery.onload=loadCouchJS;  
    document.body.appendChild(scriptJQuery);  
}   
else {  
    loadCouchJS;  
}  

function loadCouchJS() {
  scriptCouchJS = document.createElement( 'script' );  
  scriptCouchJS.src = '/_utils/script/jquery.couch.js';   
  scriptCouchJS.onload=installBellApps;  
  document.body.appendChild(scriptCouchJS);  
}
  
function installBellApps() {
  var source = 'http://bellappssource:installpass@bellappssource.cloudant.com'
  var target = window.location.host
  var i = 0
  // @todo Need the rest of the databases here
  var databases = ['apps', 'facilities', 'members', 'feedback']
  // A recursive function to replicate the databases one at a time
  var replicate = function() {
    var database = databases[i]
    $.couch.replicate(source + '/' + database, target + '/' + database, {
      create_target: true,
      success: function() {
        if (databases.length <= i) {
          i++
          replicate()
        }
        else {
          alert("Installation has completed")
          window.location = window.location.host + '/apps/_design/bell/lms/index.html'
        }
      },
      error: function(status) {
        console.log(status);
        alert('Something went wrong:' + status)
    	}
    })
  }
  // Start the recursion
  replicate()
} 
