var request = require('request');
var secrets = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!!')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' +secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
      var parsed = JSON.parse(body);
      for (var element of parsed) {
        cb(err, element.avatar_url);
      }
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Result:", result);
});