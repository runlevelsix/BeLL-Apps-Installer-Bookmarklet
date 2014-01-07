
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
