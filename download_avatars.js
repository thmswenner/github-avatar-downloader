var request = require('request');
var secrets = require('secrets');

console.log('Welcome to the Github Avatar Downloader!!')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      'User-Agent' : 'request',
      'Authorization' :
    }
  };

  request(url, function(err, res, body) {
    cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

//febcadf72f114a6bc58ff6ee343e0ebfad0a2468