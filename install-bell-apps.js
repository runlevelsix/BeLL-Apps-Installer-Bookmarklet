
// A recursive function to replicate the databases one at a time
var replicate = function() {
  if (i == 0) {
    alert('We will now begin installing BeLL Apps on your CouchDB. This may take a long time depending on the size of what you are downloading from your source server and your Internet connection.  Do not close this window or your installation will be canceled.')
  }
  var database = databases[i]
  $.couch.replicate(source + '/' + database, database, {
    success: function() {
      if (databases.length-1 > i) {
        i++
        replicate()
      }
      else {
        alert("Installation has completed")
        window.location = 'http://' + window.location.host + '/apps/_design/bell/lms/index.html'
      }
    },
    error: function(status) {
      console.log(status);
      alert('Something went wrong:' + status)
    }
  },
  {
    create_target: true
  })
}

// Set some variables
var databases = ["actions","apps","assignments","calendar","community","communityreports","courseschedule","coursestep","facilities","feedback","groups","install","invitations","mail","membercourseprogress","members","report","resources","shelf","stepresults","sync"]
var source = prompt('Which source server are you installing from?', 'http://bellappssource:installpass@bellappssource.cloudant.com')
var user = prompt('What is the username of the admin account for this CouchDB? Leave blank if you have none.', '') 

// Get going with replication but login first if we must
var i = 0
if (user.length > 0) {
  var password = prompt('What is the password for user "' + user + '"?', '')
  $.couch.login({
    name: user,
    password: password,
    success: function(data) {
      replicate()
    },
    error: function(status) {
      alert('We had trouble logging into your CouchDB. Run this script again and try different credentials.')
    }
  });
}
else {
  replicate()
}


