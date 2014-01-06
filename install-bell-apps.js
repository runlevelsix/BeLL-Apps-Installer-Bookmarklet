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
  var source = 'http://bellsource:install@bellsource.cloudant.com'
  var db = new PouchDB(source + '/replicator');
  // Get all of the Docs in the `replicator` database, they describe how each replication should be run
  db.allDocs({include_docs: true}, function(err, response) { 
    var replicationEntries = response.docs
    var i = 0
    // A recursive function
    var replicate = function() {
      var replicatorEntry = replicationEntries[i]
      PouchDB.replicate(replicatorEntry.source, replicatorEntry.target, {
        create_target: true,
        complete: function() {
          if (replicationEntries.length <= i) {
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
  }); 
} 