if (!($ = window.jQuery)) { // typeof jQuery=='undefined' works too  
    scriptJQuery = document.createElement( 'script' );  
    scriptJQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';   
    scriptJQuery.onload=loadPouchDB;  
    document.body.appendChild(scriptJQuery);  
}   
else {  
    loadPouchDB;  
}  

function loadPouchDB() {
  scriptPouchDB = document.createElement( 'script' );  
  scriptPouchDB.src = 'http://download.pouchdb.com/pouchdb-nightly.min.js';   
  scriptPouchDB.onload=installBellApps;  
  document.body.appendChild(scriptPouchDB);  
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
    PouchDB.replicate(source + '/' + database, target + '/' + database, {
      create_target: true,
      complete: function() {
        if (databases.length <= i) {
          i++
          replicate()
        }
        else {
          alert("Installation has completed")
          window.location = window.location.host + '/apps/_design/bell/lms/index.html'
        }
      }
    })
  }
  // Start the recursion
  replicate()
} 
