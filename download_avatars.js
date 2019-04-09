var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');


console.log('Welcome to the Github Avatar Downloader!!')

function getRepoContributors(repoOwner, repoName, cb) {
if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log('Danger, Will Robinson: You must input arguments')
  } else {
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


getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);