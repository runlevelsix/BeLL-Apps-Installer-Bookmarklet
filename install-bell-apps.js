
// Set some variables
var databases = ["bell-apps-stable/actions","bell-apps-stable/apps","bell-apps-stable/assignmentpaper","bell-apps-stable/assignments","bell-apps-stable/calendar","bell-apps-stable/collectionlist","bell-apps-stable/community","bell-apps-stable/community_code","bell-apps-stable/communityreports","bell-apps-stable/configurations","bell-apps-stable/courseschedule","bell-apps-stable/coursestep","bell-apps-stable/facilities","bell-apps-stable/feedback","bell-apps-stable/groups","bell-apps-stable/install","bell-apps-stable/invitations","bell-apps-stable/mail","bell-apps-stable/meetups","bell-apps-stable/membercourseprogress","bell-apps-stable/members","bell-apps-stable/nationreports","bell-apps-stable/report","bell-apps-stable/requests","bell-apps-stable/resourcefrequency","bell-apps-stable/shelf","bell-apps-stable/stepresults","bell-apps-stable/sync","bell-apps-stable/usermeetups", "bell-apps-stable/resources"]
var source = prompt('Which source server are you installing from?', 'http://bell-apps-stable:oleoleole@bell-apps-stable.cloudant.com')
var user = prompt('What is the username of the admin account for this CouchDB? If you have not created your first admin account, click "ok" and create that first account now using the link in the bottom right.', '') 
var settings = [
  ['httpd', 'bind_address', '0.0.0.0']
]

// A recursive function to replicate the databases one at a time
var replicate = function() {
  if (i == 0) {
    alert('We will now begin installing BeLL Apps on your CouchDB. This may take a long time depending on the size of what you are downloading from your source server and your Internet connection.  Do not close this window or esle your installation will be canceled.')
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

var changeSettings = function() {
  alert('Updating your CouchDB settings now')
  settings.forEach(function(setting) {
    $.couch.config({}, setting[0], setting[1], setting[2]);
  })
}

// Get going with replication but login first if we must
var i = 0
if (user.length > 0) {
  var password = prompt('What is the password for user "' + user + '"?', '')
  $.couch.login({
    name: user,
    password: password,
    success: function(data) {
      changeSettings()
      replicate()
    },
    error: function(status) {
      alert('We had trouble logging into your CouchDB. Run this script again and try different credentials.')
    }
  });
}
