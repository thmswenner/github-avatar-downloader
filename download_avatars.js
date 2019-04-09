var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');


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
      for (var element in parsed) {
        var currentUrl = parsed[element].avatar_url;
        var name = './avatars/' + parsed[element].login + '.jpg';
        cb(currentUrl, name);
      }
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })

    .on('response', function(response){
      console.log('response message:' + response.statusCode)
    })

    .on('data', function() {
      console.log('Started downloading images')
    })

    .on('end', function () {
      console.log('Completed downloading images')
    })

    .pipe(fs.createWriteStream(filePath));
}


// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", downloadImageByURL);